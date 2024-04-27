import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { DecksService } from 'src/decks/decks.service';
import { Decks, Trip } from '@prisma/client';
import getUrgencyInt from 'src/utils/check-urgency.utils';

@Injectable()
export class TripsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly decksService: DecksService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const ship = await this.databaseService.ships.findUnique({
      where: {
        name: createTripDto.shipName,
      },
    });
    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    let trip: Trip;
    if (createTripDto.deckName) {
      const deck = await this.databaseService.decks.findUnique({
        where: {
          name: createTripDto.deckName,
        },
      });
      if (!deck) {
        throw new NotFoundException('Deck not found');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { shipName, ...createTripDtoWithoutDeck } = createTripDto;
      trip = await this.databaseService.trip.create({
        data: {
          ...createTripDtoWithoutDeck,
          shipId: ship.id,
          deckId: deck.id,
        },
        include: {
          ship: true,
          deck: true,
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { shipName, deckName, ...createTripDtoWithoutDeck } = createTripDto;
      trip = await this.databaseService.trip.create({
        data: {
          ...createTripDtoWithoutDeck,
          shipId: ship.id,
        },
        include: {
          ship: true,
          deck: true,
        },
      });
    }
    const decks = await this.decksService.findAll();
    await this.findDeckingPlace(decks, trip);
    return await this.findOne(trip.id);
  }

  async findAll() {
    return await this.databaseService.trip.findMany({
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.trip.findUnique({
      where: { id },
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const ship = await this.databaseService.ships.findUnique({
      where: { name: updateTripDto.shipName },
    });
    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    const deck = await this.databaseService.decks.findUnique({
      where: { name: updateTripDto.deckName },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return await this.databaseService.trip.update({
      where: { id },
      data: updateTripDto,
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async remove(id: string) {
    return (
      (await this.databaseService.trip.delete({
        where: { id },
      })) !== null
    );
  }

  async kickShip(occupiedDeck: Decks) {
    const decks = await this.decksService.findAll();
    const newdecks = decks.filter((d) => d.id !== occupiedDeck.id);
    const trips = await this.findAll();
    const trip = trips.find((trip: Trip) => trip.deckId === occupiedDeck?.id);

    this.findDeckingPlace(newdecks, trip!);
    await this.decksService.unparkShipFromDeck(occupiedDeck.id, trip!.id);
  }

  async findDeckingPlace(decks: Decks[], trip: Trip): Promise<Decks | null> {
    console.log('hello world');
    let bestplace: Decks | null = null;
    for (const deck of decks) {
      console.log('Im in the boucle');
      const shipFromDatabase = await this.decksService.findOne(deck.id);
      const deckFromDatabase = await this.decksService.findOne(deck.id);
      const deckMeetsRequirements =
        await this.decksService.deckMeetsRequirements(
          deck.id,
          shipFromDatabase!.width,
        );

      if (!deckMeetsRequirements) continue;

      const isFree = await this.decksService.deckIsFree(deck.id);
      if (isFree) {
        console.log(`Deck ${deck.name} is free. Parking ship in deck.`);
        return await this.decksService.parkShipInDeck(deck.id, trip.id);
      } else if (
        getUrgencyInt(deckFromDatabase!.trip!.urgency) >
          getUrgencyInt(trip.urgency) &&
        (await this.decksService.deckMeetsRequirements(
          deck.id,
          shipFromDatabase!.width,
        ))
      ) {
        if (bestplace !== null) {
          const bestPlaceFromDatabase = await this.decksService.findOne(
            bestplace.id,
          );
          if (
            getUrgencyInt(deckFromDatabase!.trip!.urgency) >
            getUrgencyInt(bestPlaceFromDatabase!.trip!.urgency)
          ) {
            bestplace = deck;
            continue;
          }
        }
        continue;
      }
    }
    if (bestplace !== null) {
      console.log(
        `Deck ${bestplace.name} has higher urgency. Kicking ship and parking in deck.`,
      );
      this.kickShip(bestplace);
      await this.decksService.parkShipInDeck(bestplace.id, trip.id);
      return bestplace;
    }
    return null;
  }
}

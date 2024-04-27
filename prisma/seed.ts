import { CargoType, PrismaClient, Role, Urgency } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();
async function seedUser({
  name,
  age,
  email,
  role,
  password,
}: {
  name: string;
  age: number;
  email: string;
  role: Role;
  password: string;
}) {
  return await prisma.users.upsert({
    where: { email },
    update: {},
    create: {
      name,
      age,
      email,
      role,
      password,
    },
  });
}

async function seedShips({
  ships,
}: {
  ships: {
    id: string;
    name: string;
    height: number;
    width: number;
  }[];
}) {
  return await Promise.all(
    ships.map(
      ({
        id,
        name,
        height,
        width,
      }: {
        id: string;
        name: string;
        height: number;
        width: number;
      }) =>
        prisma.ships.upsert({
          where: { id },
          update: {},
          create: {
            id,
            name,
            height,
            width,
          },
        }),
    ),
  );
}

async function seedDecks({
  decks,
}: {
  decks: {
    id: string;
    name: string;
    height: number;
    width: number;
  }[];
}) {
  return await Promise.all(
    decks.map(
      ({
        id,
        name,
        height,
        width,
      }: {
        id: string;
        name: string;
        height: number;
        width: number;
      }) =>
        prisma.decks.upsert({
          where: { id },
          update: {},
          create: {
            id,
            name,
            height,
            width,
          },
        }),
    ),
  );
}

async function seedTrips(
  trips: {
    id: string;
    shipId: string;
    deckId: string;
    departureTime: Date;
    arrivalTime: Date;
    parkingTime: number;
    cargoType: CargoType;
    urgency: Urgency;
  }[],
) {
  return await Promise.all(
    trips.map(
      ({
        id,
        shipId,
        deckId,
        departureTime,
        arrivalTime,
        parkingTime,
        cargoType,
        urgency,
      }: {
        id: string;
        shipId: string;
        deckId: string;
        departureTime: Date;
        arrivalTime: Date;
        parkingTime: number;
        cargoType: CargoType;
        urgency: Urgency;
      }) =>
        prisma.trip.upsert({
          where: { id },
          update: {},
          create: {
            id,
            ship: { connect: { id: shipId } },
            deck: { connect: { id: deckId } },
            departureTime,
            arrivalTime,
            parkingTime,
            cargoType,
            urgency,
          },
        }),
    ),
  );
}

async function main() {
  const admin = {
    name: 'admin',
    age: 21,
    email: 'admin@email.com',
    role: Role.ADMIN,
    password: '$2b$10$2zUN7q9T/F7BjoN4XqFZ6elWgT5/SS27GQtnyYLJg/FQF3ttSWwmW', // @Bcd123456
  };
  const user = {
    name: 'user',
    age: 21,
    email: 'user@email.com',
    role: Role.USER,
    password: '$2b$10$2zUN7q9T/F7BjoN4XqFZ6elWgT5/SS27GQtnyYLJg/FQF3ttSWwmW', // @Bcd123456
  };
  const ships = [
    {
      id: uuidv4(),
      name: 'ship1',
      height: 6,
      width: 3,
    },
    {
      id: uuidv4(),
      name: 'ship2',
      height: 6,
      width: 3,
    },
    {
      id: uuidv4(),
      name: 'ship3',
      height: 6,
      width: 3,
    },
    {
      id: uuidv4(),
      name: 'ship4',
      height: 6,
      width: 3,
    },
  ];
  const decks = [
    {
      id: uuidv4(),
      name: 'deck1',
      height: 10,
      width: 5,
    },
    {
      id: uuidv4(),
      name: 'deck2',
      height: 8,
      width: 4,
    },
    {
      id: uuidv4(),
      name: 'deck3',
      height: 12,
      width: 6,
    },
    {
      id: uuidv4(),
      name: 'B12',
      height: 6,
      width: 3,
    },
  ];
  const trips = [
    {
      id: uuidv4(),
      shipId: ships[0].id,
      deckId: decks[0].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
      cargoType: CargoType.CARGO,
      urgency: Urgency.MEDIUM,
    },
    {
      id: uuidv4(),
      shipId: ships[1].id,
      deckId: decks[1].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
      cargoType: CargoType.PASSENGER,
      urgency: Urgency.HIGH,
    },
    {
      id: uuidv4(),
      shipId: ships[2].id,
      deckId: decks[2].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
      cargoType: CargoType.CARGO,
      urgency: Urgency.LOW,
    },
  ];
  // const parking = [
  // {
  //   id: uuidv4(),
  // },
  // ];
  await seedUser(admin);
  await seedUser(user);
  await seedShips({ ships });
  await seedDecks({ decks });
  await seedTrips(trips);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

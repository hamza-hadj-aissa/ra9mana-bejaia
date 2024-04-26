import { CargoType, SpecialCondition, Urgency } from '@prisma/client';

export class CreateTripDto {
  departureTime: Date;
  arrivalTime: Date;
  parkingTime: number;
  shipName: string;
  deckName: string;
  cargoType: CargoType;
  urgency: Urgency;
  specialCondition?: SpecialCondition;
}

export class CreateTripDto {
  departureTime: Date;
  arrivalTime: Date;
  parkingTime: number;
  shipId: string;
  cargoId: string;
  urgencyId: string;
  specialConditionId?: string;
  deckId: string;
}

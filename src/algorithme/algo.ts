// import {
//   $Enums,
//   CargoType,
//   Decks,
//   SpecialCondition,
//   Trip,
//   Urgency,
// } from '@prisma/client';

// const TRIPS: TripClass[] = [];

// function kickShip(dock: DeckClass, decks: DeckClass[]): void {
//   const newdecks = decks.filter((d) => d !== dock);
//   const trip = TRIPS.find((element) => element === dock.trip);
//   findDockingPlace(newdecks, trip!);
//   dock.trip = undefined;
//   dock.isFree = true;
// }

// export class DeckClass implements Decks {
//   // Your other properties here...

//   isFree: boolean;
//   width: number;
//   place: string;
//   trip?: TripClass;
//   timer?: NodeJS.Timeout;
//   constructor(width: number, place: string, trip?: TripClass) {
//     this.width = width;
//     this.place = place;
//     this.trip = trip;
//     this.isFree = this.trip == null;
//   }
//   id: string;
//   name: string;
//   height: number;
//   createdAt: Date;
//   updatedAt: Date;

//   meetsRequirements(trip: TripClass): boolean {
//     // Implement this method based on your requirements
//     if (trip.ship.width > this.width) {
//       return false;
//     }
//     return true;
//   }
//   replaceTrip(_trip: TripClass): void {
//     this.trip = _trip;
//     this.isFree = false;
//     this.timer = setTimeout(() => {
//       this.removeShipFromDeck(_trip);
//     }, 20000); // 20 seconds
//   }
//   removeShipFromDeck(trip: TripClass, decks: DeckClass[]): void {
//     const dock =
//       decks.find((dock) => dock.trip === trip) || new DeckClass(0, 'null');
//     if (dock.place === 'null') {
//       return;
//     }
//     dock.isFree = true;
//     dock.trip = undefined;
//     if (Parking.trips.length > 0) {
//       const newTrip = Parking.trips[0];
//       Parking.trips.splice(0, 1);

//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const newDock = findDockingPlace(decks, newTrip);
//     }
//   }
// }

// export class TripClass implements Trip {
//   // Your properties here...
//   static MAX_PRIORITY = 100; // replace with your actual value
//   name: string;
//   origin: string;
//   destination: string;
//   travelDuration: number; // Duration is not a standard type in TypeScript, you might want to use number (milliseconds) or a custom type
//   cargoType: CargoType;
//   specialConditions: SpecialCondition[];
//   urgency: Urgency; // Replace with your actual type
//   ship: Ship;
//   priority: number;
//   constructor(
//     name: string,
//     origin: string,
//     destination: string,
//     travelDuration: number,
//     priority: number,
//     cargoType: CargoType,
//     ship: Ship,
//     specialConditions: SpecialCondition[] = [],
//     urgency: Urgency,
//   ) {
//     this.name = name;
//     this.origin = origin;
//     this.destination = destination;
//     this.travelDuration = travelDuration;
//     this.cargoType = cargoType;
//     this.ship = ship;
//     this.specialConditions = specialConditions;
//     this.urgency = urgency;
//     this.priority = this.calculatePriority(
//       urgency,
//       specialConditions,
//       cargoType,
//       ship.timeAtPort,
//     );
//   }
//   id: string;
//   departureTime: Date;
//   arrivalTime: Date;
//   parkingTime: number;
//   shipId: string;
//   specialCondition: $Enums.SpecialCondition | null;
//   deckId: string | null;
//   specialConditionId: string | null;
//   createdAt: Date;
//   updatedAt: Date;

//   calculatePriority(
//     urgency: Urgency,
//     specialConditions: SpecialCondition[],
//     cargoType: CargoType,
//     timeAtPort: number,
//   ): number {
//     const w1 = 3; // weight for urgency
//     const w2 = 0.05; // weight for time at port
//     const w3 = 2; // weight for type of ship/cargo
//     const w4 = 5; // weight for special conditions
//     let priority = 0;

//     priority += w1 * Urgency[urgency];
//     priority -= Math.floor(w2 * timeAtPort); // Use timeAtPort to get time in minutes
//     priority += w3 * cargoType.priority;
//     const specialConditionValue = specialConditions.reduce(
//       (prev, element) => prev + element.priority,
//       0,
//     );
//     priority += w4 * specialConditionValue;
//     return Math.floor(MAX_PRIORITY / (priority + 1)); // Add 1 to avoid division by zero
//   }
// }

// export class Parking {
//   static trips: TripClass[] = [];

//   constructor() {}

//   static lowerPriority(): void {
//     Parking.trips.forEach((e) => (e.priority -= 1));
//   }

//   static parkTrip(trip: TripClass): void {
//     Parking.trips.push(trip);
//     Parking.trips.sort((a, b) => a.priority - b.priority);
//     // logAlldecks(); // assuming logAlldecks is defined elsewhere
//   }
// }
// export function findDockingPlace(
//   decks: DeckClass[],
//   trip: TripClass,
// ): DeckClass | null {
//   let bestplace: DeckClass | null = null;
//   for (const dock of decks) {
//     if (!dock.meetsRequirements(trip)) continue;
//     if (dock.isFree) {
//       dock.replaceTrip(trip);
//       //   logAlldecks();
//       return dock;
//     } else if (
//       dock.trip!.priority > trip.priority &&
//       dock.meetsRequirements(trip)
//     ) {
//       if (bestplace == null || dock.trip!.priority > bestplace.trip!.priority) {
//         bestplace = dock;
//         continue;
//       }
//       continue;
//     }
//   }
//   if (bestplace != null) {
//     //TODO kick the currrent ship and na9as ml w9t t3ou
//     kickShip(bestplace, decks);
//     // bestplace.timer?.pause();
//     bestplace.trip = trip;
//     bestplace.isFree = false; // Assume this dock is now occupied
//     // logAlldecks();
//     return bestplace;
//   }

//   Parking.parkTrip(trip);
//   return null;
// }

// import { CargoType, SpecialCondition } from '@prisma/client';
// declare module '@prisma/client' {
//   interface Decks {
//     isFree: boolean;
//     width: number;
//     place: string;
//     trip?: Trip;
//   }
//   interface Trip {
//     name: string;
//     origin: string;
//     destination: string;
//     travelDuration: number; // Duration is not a standard type in TypeScript, you might want to use number (milliseconds) or a custom type
//     cargoType: CargoType;
//     specialConditions: SpecialCondition[];
//     urgency: Urgency; // Replace with your actual type
//     ship: Ship;
//     priority: number;
//   }
//   interface Ship {
//     width: number;
//     timeAtPort: number;
//   }
// }

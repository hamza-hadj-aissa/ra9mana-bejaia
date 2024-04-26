import { PrismaClient, Role } from '@prisma/client';
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

async function seedCargoTypes({
  cargoTypes,
}: {
  cargoTypes: { name: string; weight: number }[];
}) {
  return await Promise.all(
    cargoTypes.map(
      ({ id, name, weight }: { id: string; name: string; weight: number }) =>
        prisma.cargoType.upsert({
          where: { name },
          update: {},
          create: { id, name, weight },
        }),
    ),
  );
}

async function seedSpecialConditions({
  specialConditions,
}: {
  specialConditions: { id: string; name: string; weight: number }[];
}) {
  return await Promise.all(
    specialConditions.map(
      ({ id, name, weight }: { id: string; name: string; weight: number }) =>
        prisma.specialCondition.upsert({
          where: { name },
          update: {},
          create: { id, name, weight },
        }),
    ),
  );
}

async function seedUrgencies({
  urgencies,
}: {
  urgencies: { id: string; name: string; weight: number }[];
}) {
  return await Promise.all(
    urgencies.map(
      ({ id, name, weight }: { id: string; name: string; weight: number }) =>
        prisma.urgency.upsert({
          where: { name },
          update: {},
          create: { id, name, weight },
        }),
    ),
  );
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
    cargoId: string;
    specialConditionId: string;
    urgencyId: string;
    departureTime: Date;
    arrivalTime: Date;
  }[],
) {
  return await Promise.all(
    trips.map(
      ({
        id,
        shipId,
        deckId,
        cargoId,
        specialConditionId,
        urgencyId,
        departureTime,
        arrivalTime,
        parkingTime,
      }: {
        id: string;
        shipId: string;
        deckId: string;
        cargoId: string;
        specialConditionId: string;
        urgencyId: string;
        departureTime: Date;
        arrivalTime: Date;
        parkingTime: number;
      }) =>
        prisma.trip.upsert({
          where: { id },
          update: {},
          create: {
            id,
            shipId,
            deckId,
            cargoId,
            specialConditionId,
            urgencyId,
            departureTime,
            arrivalTime,
            parkingTime,
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
  const cargoTypes = [
    { id: uuidv4(), name: 'DANGEROUS_GOODS', weight: 10 },
    { id: uuidv4(), name: 'PASSENGER', weight: 5 },
    { id: uuidv4(), name: 'CARGO', weight: 8 },
    { id: uuidv4(), name: 'MILITARY', weight: 12 },
    { id: uuidv4(), name: 'FISHING', weight: 6 },
    { id: uuidv4(), name: 'RECREATIONAL', weight: 4 },
    { id: uuidv4(), name: 'OTHER', weight: 3 },
  ];
  const specialConditions = [
    { id: uuidv4(), name: 'EMERGENCY', weight: 10 },
    { id: uuidv4(), name: 'FIRE', weight: 8 },
    { id: uuidv4(), name: 'MEDICAL_EMERGENCY', weight: 6 },
    { id: uuidv4(), name: 'MALFUNCTION', weight: 4 },
    { id: uuidv4(), name: 'OTHER', weight: 2 },
  ];
  const urgencies = [
    { id: uuidv4(), name: 'LOW', weight: 1 },
    { id: uuidv4(), name: 'MEDIUM', weight: 2 },
    { id: uuidv4(), name: 'HIGH', weight: 3 },
  ];
  const ships = [
    {
      id: uuidv4(),
      name: 'ship1',
      height: 10,
      width: 5,
    },
    {
      id: uuidv4(),
      name: 'ship2',
      height: 8,
      width: 4,
    },
    {
      id: uuidv4(),
      name: 'ship3',
      height: 12,
      width: 6,
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
      cargoId: cargoTypes[0].id,
      specialConditionId: specialConditions[0].id,
      urgencyId: urgencies[0].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
    },
    {
      id: uuidv4(),
      shipId: ships[1].id,
      deckId: decks[1].id,
      cargoId: cargoTypes[1].id,
      specialConditionId: specialConditions[1].id,
      urgencyId: urgencies[1].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
    },
    {
      id: uuidv4(),
      shipId: ships[2].id,
      deckId: decks[2].id,
      cargoId: cargoTypes[2].id,
      specialConditionId: specialConditions[2].id,
      urgencyId: urgencies[2].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
    },
    {
      id: uuidv4(),
      shipId: ships[0].id,
      deckId: decks[0].id,
      cargoId: cargoTypes[0].id,
      specialConditionId: specialConditions[3].id,
      urgencyId: urgencies[0].id,
      departureTime: new Date(),
      arrivalTime: new Date(),
      parkingTime: 10,
    },
  ];
  await seedUser(admin);
  await seedUser(user);
  await seedCargoTypes({ cargoTypes });
  await seedSpecialConditions({ specialConditions });
  await seedUrgencies({ urgencies });
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

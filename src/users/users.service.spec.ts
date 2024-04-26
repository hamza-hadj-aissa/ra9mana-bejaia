import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from './users.service';

// const fakeUser: Prisma.userCreateInput = {
//   name: 'John Doe',
//   email: 'johnDoe@gmail.com',
//   password: 'password',
//   age: 30,
//   role: 'ADMIN',
// };

// const fakeuser = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'johnDoe@gmail.com',
//     password: 'password',
//     age: 30,
//     role: Role.ADMIN,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     email: 'janeDoe@gmail.com',
//     password: 'password',
//     age: 30,
//     role: Role.USER,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 3,
//     name: 'Alice Smith',
//     email: 'aliceSmith@gmail.com',
//     password: 'password',
//     age: 25,
//     role: Role.USER,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 4,
//     name: 'Bob Johnson',
//     email: 'bobJohnson@gmail.com',
//     password: 'password',
//     age: 35,
//     role: Role.USER,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// let user: Prisma.userCreateInput[] = [];

describe('usersService', () => {
  let service: UsersService;
  let databaseServiceMock: DeepMockProxy<DatabaseService>;
  beforeEach(async () => {
    databaseServiceMock = mockDeep<DatabaseService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: databaseServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // user = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a user', async () => {
  //   databaseServiceMock.user.create = jest.fn().mockResolvedValue({
  //     data: (user: Prisma.userCreateInput) => {
  //       user.push(user);
  //       return {
  //         id: user.length,
  //         ...user,
  //       };
  //     },
  //     select: jest.fn(),
  //   });

  //   expect(service.create(fakeUser)).toEqual({
  //     id: 0,
  //     ...fakeUser,
  //   });
  // });

  // it('should find all user', async () => {
  //   databaseServiceMock.user.findMany.mockResolvedValue(fakeuser);
  //   expect(service.findAll()).toEqual(fakeuser);
  // });

  // it('should find a user by id', async () => {
  //   const user: Prisma.userCreateInput = {
  //     name: 'John Doe',
  //     email: 'johnDoe@gmail.com',
  //     password: 'password',
  //     age: 30,
  //     role: 'ADMIN',
  //   };

  //   const { id } = await service.create(user);
  //   expect(service.findOne(id)).toEqual({
  //     id: id,
  //     ...user,
  //   });
  // });

  // it('should find a user by role', async () => {
  //   const user: Prisma.userCreateInput = {
  //     name: 'John Doe',
  //     email: 'johnDoe@gmail.com',
  //     password: 'password',
  //     age: 30,
  //     role: 'ADMIN',
  //   };

  //   const createdUser = await service.create(user);
  //   expect(service.findAll('ADMIN')).toEqual([createdUser]);
  // });

  // it('should update a user', async () => {
  //   const user: Prisma.userCreateInput = {
  //     name: 'John Doe',
  //     email: 'johnDoe@gmail.com',
  //     password: 'password',
  //     age: 30,
  //     role: 'ADMIN',
  //   };

  //   const { id } = await service.create(user);

  //   const updatedUser = {
  //     name: 'Jane Doe',
  //     ...user,
  //   };

  //   service.update(id, updatedUser);
  //   expect(service.findOne(id)).toEqual({
  //     id: id,
  //     ...updatedUser,
  //   });
  // });

  // it('should remove a user', async () => {
  //   const user: Prisma.userCreateInput = {
  //     name: 'John Doe',
  //     email: 'johnDoe@gmail.com',
  //     password: 'password',
  //     age: 30,
  //     role: 'ADMIN',
  //   };

  //   const { id } = await service.create(user);
  //   service.remove(id);
  //   expect(service.findOne(id)).toBeUndefined();
  // });
});

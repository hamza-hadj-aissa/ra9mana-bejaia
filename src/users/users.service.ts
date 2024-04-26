import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  user = [];
  static id = 0;

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return await this.databaseService.users.create({
      data: createUserDto,
    });
  }

  async findAll(role?: Role): Promise<User[]> {
    return await this.databaseService.users.findMany({
      where: {
        role,
      },
    });
  }

  async findOne(
    id: number,
    options?: {
      include?: ['jwt'];
    },
  ): Promise<User | null> {
    return await this.databaseService.users.findUnique({
      where: {
        id,
      },
      include: {
        jwt: options?.include?.includes('jwt'),
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.databaseService.users.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.users.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    return await this.databaseService.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async remove(id: number) {
    return await this.databaseService.users.delete({
      where: {
        id,
      },
    });
  }
}

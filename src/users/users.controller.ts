import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    createUserDto: CreateUserDto,
  ): Promise<User | null> {
    createUserDto.password = await this.hashingService.hashPassword(
      createUserDto.password,
    );
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  @Get()
  async findAll(@Query('role') role?: Role): Promise<User[]> {
    return await this.usersService.findAll(role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | NotFoundException> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUserInfo(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }

  @Get('profile/:id')
  async getProfile(
    @Param('id') id: string,
    @Request() req,
  ): Promise<User | null> {
    if (Number(id) !== Number(req.user.sub)) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

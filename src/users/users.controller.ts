import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Roles(Role.ADMIN)
export class UsersController {
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

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | NotFoundException> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new NotFoundException('User not found');
    }
    return user;
  }

  @Roles(Role.ADMIN, Role.USER)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
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
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.remove(+id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('profile/:id')
  async getProfile(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<User | null> {
    if (Number(id) !== Number(req.user.sub)) {
      throw new ConflictException('User contradiction');
    }
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

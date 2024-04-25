import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SkipJwtAuth } from '../common/decorators/skip-jwt-auth.decorator';
import { JwtRefreshAuthGuard, LocalAuthGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return await this.authService.register(createUserDto);
  }

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Patch('change-password')
  async changePassword(
    @Request() req,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    changePasswordDto: ChangePasswordDto,
  ) {
    const user = await this.authService.validateUser(
      req.user.email,
      changePasswordDto.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid password');
    }
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return await this.authService.changePassword(
      user.id,
      changePasswordDto.newPassword,
    );
  }

  @SkipJwtAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh-token')
  async refreshToken(@Request() req) {
    if (!req.user) {
      throw new BadRequestException();
    }
    return await this.authService.refreshToken(req.user.sub);
  }

  @Get('logout')
  async logout(@Request() req) {
    if (!req.user) {
      throw new BadRequestException();
    }
    try {
      return await this.authService.logout(req.user.sub);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException('Token not found');
      }
      throw new BadRequestException();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { HashingService } from './hashing.interface';
@Injectable()
export class BcryptService implements HashingService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}

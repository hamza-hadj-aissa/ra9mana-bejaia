import { Exclude, Expose } from 'class-transformer';
import { RefreshToken } from './refresh-token.entity';

export class User {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  age: number;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  role: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  refreshToken?: RefreshToken | null;
}

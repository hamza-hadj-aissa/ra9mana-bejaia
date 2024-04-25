import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { SKIP_JWT_AUTH } from '../decorators/skip-jwt-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const SkipJwtAuth = this.reflector.getAllAndOverride<boolean>(
      SKIP_JWT_AUTH,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic || SkipJwtAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}

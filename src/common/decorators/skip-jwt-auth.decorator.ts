import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_AUTH = 'SkipJwtAuth';
export const SkipJwtAuth = () => SetMetadata(SKIP_JWT_AUTH, true);

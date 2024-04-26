import { PartialType } from '@nestjs/mapped-types';
import { CreateUrgencyDto } from './create-urgency.dto';

export class UpdateUrgencyDto extends PartialType(CreateUrgencyDto) {}

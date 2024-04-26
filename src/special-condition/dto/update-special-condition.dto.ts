import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialConditionDto } from './create-special-condition.dto';

export class UpdateSpecialConditionDto extends PartialType(CreateSpecialConditionDto) {}

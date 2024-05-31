import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformManagerDto } from './create-platform-manager.dto';

export class UpdatePlatformManagerDto extends PartialType(
  CreatePlatformManagerDto,
) {}

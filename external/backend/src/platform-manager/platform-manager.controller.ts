import { Controller } from '@nestjs/common';
import { PlatformManagerService } from './platform-manager.service';

@Controller('platform-manager')
export class PlatformManagerController {
  constructor(
    private readonly platformManagerService: PlatformManagerService,
  ) {}
}

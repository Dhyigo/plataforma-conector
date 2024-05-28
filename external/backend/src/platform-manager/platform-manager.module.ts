import { Module } from '@nestjs/common';
import { PlatformManagerService } from './platform-manager.service';
import { PlatformManagerController } from './platform-manager.controller';

@Module({
  controllers: [PlatformManagerController],
  providers: [PlatformManagerService],
})
export class PlatformManagerModule {}

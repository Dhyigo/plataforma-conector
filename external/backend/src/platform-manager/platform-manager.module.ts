import { Module } from '@nestjs/common';
import { PlatformManagerController } from './http/controllers/platform-manager.controller';
import { CreatePlatformManagerService } from './services/create-platform-manager.service';
import { PasswordServices } from 'rules';
import { BcryptPasswordService } from '../shared/services/password/bcryptPassword.service';
import { DatabaseModule } from './database/database.module';
import { UpdateIdentificationDataPlatformManagerService } from './services/update-identification-data-platform-manager.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlatformManagerController],
  providers: [
    CreatePlatformManagerService,
    UpdateIdentificationDataPlatformManagerService,
    {
      provide: PasswordServices,
      useClass: BcryptPasswordService,
    },
  ],
})
export class PlatformManagerModule {}

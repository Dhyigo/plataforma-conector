import { Module } from '@nestjs/common';
import { PlatformManagerController } from './http/controllers/platform-manager.controller';
import { CreatePlatformManagerService } from './services/platform.service';
import { PasswordServices } from 'rules';
import { BcryptPasswordService } from 'src/shared/services/password/bcryptPassword.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlatformManagerController],
  providers: [
    CreatePlatformManagerService,
    {
      provide: PasswordServices,
      useClass: BcryptPasswordService,
    },
  ],
})
export class PlatformManagerModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PlatformManagerModule } from './platform-manager/platform-manager.module';

@Module({
  providers: [AppService],
  imports: [PlatformManagerModule],
})
export class AppModule {}

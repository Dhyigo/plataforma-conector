import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformManager, PlatformManagerRepository } from 'rules';
import { MongoPlatformManagerRepository } from './mongodb/mongo-platform-manager.repository';
import { PlatformManagerSchema } from './mongodb/platform-manager.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlatformManager.name, schema: PlatformManagerSchema },
    ]),
  ],
  providers: [
    {
      provide: PlatformManagerRepository,
      useClass: MongoPlatformManagerRepository,
    },
  ],
  exports: [PlatformManagerRepository],
})
export class DatabaseModule {}

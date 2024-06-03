import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformManagerModule } from './platform-manager/platform-manager.module';
import { DatabaseModule } from './platform-manager/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get<string>('DATABASE_URL') };
      },
    }),
    PlatformManagerModule,
    DatabaseModule,
  ],
})
export class AppModule {}

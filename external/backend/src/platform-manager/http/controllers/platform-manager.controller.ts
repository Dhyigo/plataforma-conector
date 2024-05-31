import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlatformManagerDto } from '../dto/create-platform-manager.dto';
import { CreatePlatformManagerService } from 'src/platform-manager/services/platform.service';
import { PlatformManagerViewModel } from 'src/platform-manager/view-models/platform-manager.view-model';

@Controller('platform-manager')
export class PlatformManagerController {
  constructor(
    private readonly createPlatformManager: CreatePlatformManagerService,
  ) {}

  @Post()
  async create(@Body() createPlatformManagerDto: CreatePlatformManagerDto) {
    const { platformManager } = await this.createPlatformManager.execute({
      name: createPlatformManagerDto.name,
      email: createPlatformManagerDto.email,
      password: createPlatformManagerDto.name,
    });

    return {
      platformManager: PlatformManagerViewModel.toHttp(platformManager),
    };
  }
}

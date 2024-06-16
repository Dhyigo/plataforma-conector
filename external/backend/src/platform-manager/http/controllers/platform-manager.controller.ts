import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CreatePlatformManagerDto } from '../dto/create-platform-manager.dto';
import { CreatePlatformManagerService } from '../../services/create-platform-manager.service';
import { PlatformManagerViewModel } from '../../view-models/platform-manager.view-model';
import { UpdateIdentificationDataPlatformManagerService } from '../../services/update-identification-data-platform-manager.service';
import { UpdateIdentificationDataDto } from '../dto/update-identification-data.dto';

@Controller('platform-manager')
export class PlatformManagerController {
  constructor(
    private readonly createPlatformManagerService: CreatePlatformManagerService,
    private readonly updateIdentificationDataService: UpdateIdentificationDataPlatformManagerService,
  ) {}

  @Post()
  async create(@Body() createPlatformManagerDto: CreatePlatformManagerDto) {
    const { platformManager } = await this.createPlatformManagerService.execute(
      {
        name: createPlatformManagerDto.name,
        email: createPlatformManagerDto.email,
        password: createPlatformManagerDto.name,
      },
    );

    return {
      platformManager: PlatformManagerViewModel.toHttp(platformManager),
    };
  }

  @Patch('/dados-de-identificacao/:id')
  async updateIdentificationData(
    @Body() updateIdentificationDataDto: UpdateIdentificationDataDto,
    @Param('id') platformManagerId: string,
  ) {
    const { name, email } = updateIdentificationDataDto;

    const { platformManager } =
      await this.updateIdentificationDataService.execute({
        platformManagerId,
        newName: name,
        newEmail: email,
      });

    return {
      platformManager: PlatformManagerViewModel.toHttp(platformManager),
    };
  }
}

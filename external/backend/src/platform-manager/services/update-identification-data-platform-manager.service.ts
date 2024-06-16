import { Inject, Injectable } from '@nestjs/common';
import {
  PlatformManagerRepository,
  UpdateIdentificationDataPlatformManager,
} from 'rules';

@Injectable()
export class UpdateIdentificationDataPlatformManagerService extends UpdateIdentificationDataPlatformManager {
  constructor(
    @Inject(PlatformManagerRepository) repository: PlatformManagerRepository,
  ) {
    super(repository);
  }
}

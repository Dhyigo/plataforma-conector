import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePlatformManager,
  PasswordServices,
  PlatformManagerRepository,
} from 'rules';

@Injectable()
export class CreatePlatformManagerService extends CreatePlatformManager {
  constructor(
    @Inject(PlatformManagerRepository)
    readonly repos: PlatformManagerRepository,
    @Inject(PasswordServices) readonly passwordServices: PasswordServices,
  ) {
    super(repos, passwordServices);
  }
}

import { PlatformManager } from 'rules';

export class PlatformManagerViewModel {
  static toHttp(plataformaManager: PlatformManager) {
    return {
      id: plataformaManager.id,
      name: plataformaManager.name,
      email: plataformaManager.email,
    };
  }
}

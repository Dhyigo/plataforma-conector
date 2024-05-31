import { PlatformManager } from 'rules';

export class MongoPlatformManagerMapper {
  static toMongo(platformManager: PlatformManager) {
    return {
      id: platformManager.id,
      name: platformManager.name,
      email: platformManager.email,
      type: platformManager.type,
      password: platformManager.password,
    };
  }
}

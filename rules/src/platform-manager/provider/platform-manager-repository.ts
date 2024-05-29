import { PlatformManager } from '../model/platform-manager.entities'

export abstract class PlatformManagerRepository {
  abstract create(platformManager: PlatformManager): Promise<void>
  abstract findById(platformManagerId: string): Promise<PlatformManager | null>
  abstract save(platformManager: PlatformManager): Promise<void>
}

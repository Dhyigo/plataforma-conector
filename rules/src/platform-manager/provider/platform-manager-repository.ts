import { PlatformManager } from '../model/platform-manager.entities'

export interface PlatformManagerRepository {
  create(platformManager: PlatformManager): Promise<void>
  findById(platformManagerId: string): Promise<PlatformManager | null>
  update(platformManager: PlatformManager): Promise<void>
}

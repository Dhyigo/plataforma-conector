import { PlatformManager } from '../model/platform-manager.entities'

export interface PlatformManagerRepository {
  create(platformManager: PlatformManager): Promise<void>
  findById(platformManagerId: string): Promise<PlatformManager | null>
  save(platformManager: PlatformManager): Promise<void>
}

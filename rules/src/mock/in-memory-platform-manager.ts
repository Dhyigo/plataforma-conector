import { PlatformManager } from '../platform-manager/model/platform-manager.entities'
import { PlatformManagerRepository } from '../platform-manager/provider/platform-manager-repository'

export class InMemoryPlatformManagerRepository
  implements PlatformManagerRepository
{
  readonly platformManagers: PlatformManager[] = []

  async create(platformManager: PlatformManager): Promise<void> {
    this.platformManagers.push(platformManager)
  }

  async findById(platformManagerId: string): Promise<PlatformManager | null> {
    const user = this.platformManagers.find((manager) => {
      return manager.id === platformManagerId
    })
    return user ?? null
  }

  async update(platformManager: PlatformManager): Promise<void> {
    const index = this.platformManagers.findIndex(
      ({ id }) => id === platformManager.id
    )

    if (index === -1) {
      throw new Error('PlatformManager not found')
    }

    this.platformManagers.splice(index, 1, platformManager)
  }
}

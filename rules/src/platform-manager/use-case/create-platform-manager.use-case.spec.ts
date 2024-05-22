import { describe, expect, it } from 'vitest'
import { CreatePlatformManager } from './create-platform-manager.use-case'
import { InMemoryPlatformManagerRepository } from '../../utils/repository/in-memory-platform-manager'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { PlatformManager } from '../model/platform-manager.entities'

describe('Use case - Create platform manager', () => {
  it('should be able to create a Platform manager', async () => {
    const inMemoryRepository = new InMemoryPlatformManagerRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createPlatformManager = new CreatePlatformManager(
      inMemoryRepository,
      bcryptPassword
    )

    await createPlatformManager.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
    })

    expect(inMemoryRepository.platformManagers[0]).instanceOf(PlatformManager)
  })
})

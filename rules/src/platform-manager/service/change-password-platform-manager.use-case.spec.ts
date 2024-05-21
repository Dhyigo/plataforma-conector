/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { CreatePlatformManager } from './create-platform-manager.use-case'
import { InMemoryPlatformManagerRepository } from '../../utils/repository/in-memory-platform-manager'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { ChangePasswordPlatformManager } from './change-password-platform-manager.use-case'
import { AppError } from '../../shared/error/app-error'
import { makePlatformManager } from '../../utils/factories/make-platform-manager'

describe('Use case - Change password platform manager', () => {
  it('should be able to create a Platform manager', async () => {
    const inMemoryRepository = new InMemoryPlatformManagerRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createPlatformManager = new CreatePlatformManager(
      inMemoryRepository,
      bcryptPassword
    )

    const { platformManager } = await createPlatformManager.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
    })

    const changePasswordPlatformManager = new ChangePasswordPlatformManager(
      inMemoryRepository,
      bcryptPassword
    )

    const newPassword = 'abcde'

    await changePasswordPlatformManager.execute({
      newPassword,
      platformManagerId: platformManager.id,
    })

    const passwordHash = inMemoryRepository.platformManagers[0].password

    const match = await bcryptPassword.compareHash(newPassword, passwordHash)
    expect(match).toBeTruthy()
  })

  it('should not be able to update password for a manager that does not exist', async () => {
    const inMemoryRepository = new InMemoryPlatformManagerRepository()
    const bcryptPassword = new BcryptPasswordService()

    const platformManager = makePlatformManager()

    const changePasswordPlatformManager = new ChangePasswordPlatformManager(
      inMemoryRepository,
      bcryptPassword
    )

    const newPassword = 'abcde'

    expect(async () => {
      await changePasswordPlatformManager.execute({
        newPassword,
        platformManagerId: platformManager.id,
      })
    }).rejects.toThrowError(AppError)
  })
})

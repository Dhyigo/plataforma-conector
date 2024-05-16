import { describe, expect, it } from 'vitest'
import { CreatePlatformManager } from './create-platform-manager.use-case'
import { InMemoryPlatformManagerRepository } from '../../mock/in-memory-platform-manager'
import { BcryptPasswordService } from '../../mock/bcrypt-password-service'
import { ChangePasswordPlatformManager } from './change-password-platform-manager.use-case'

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
    const { platformManager: platformManagerWithNewPassword } =
      await changePasswordPlatformManager.execute({
        newPassword: 'abcde',
        platformManagerId: platformManager.id,
      })

    const match = await bcryptPassword.compareHash(
      newPassword,
      platformManagerWithNewPassword.props.password
    )
    expect(match).toBeTruthy()
  })
})

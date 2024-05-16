/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { CreatePlatformManager } from './create-platform-manager.use-case'
import { InMemoryPlatformManagerRepository } from '../../utils/repository/in-memory-platform-manager'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { UpdateIdentificationDataPlatformManager } from './update-identification-data-platform-manager.use-case'
import { AppError } from '../../shared/error/app-error'
import { makePlatformManager } from '../../utils/factorie/make-platform-manager'

describe('Use case - update identification data platform manager', () => {
  it('should be able to update a identification data', async () => {
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

    const updateIdentification = new UpdateIdentificationDataPlatformManager(
      inMemoryRepository
    )

    const newEmail = 'newemail@email.test'
    const newName = 'new name'

    await updateIdentification.execute({
      platformManagerId: platformManager.id,
      newEmail,
      newName,
    })

    expect(inMemoryRepository.platformManagers[0].name).toEqual(newName)
    expect(inMemoryRepository.platformManagers[0].email).toEqual(newEmail)
  })

  it('should not be able to update identification data for a manager that does not exist', async () => {
    const inMemoryRepository = new InMemoryPlatformManagerRepository()

    const platformManager = makePlatformManager()

    const updateIdentification = new UpdateIdentificationDataPlatformManager(
      inMemoryRepository
    )

    const newEmail = 'newemail@email.test'
    const newName = 'new name'

    expect(async () => {
      return await updateIdentification.execute({
        platformManagerId: platformManager.id,
        newEmail,
        newName,
      })
    }).rejects.toThrowError(AppError)
  })
})

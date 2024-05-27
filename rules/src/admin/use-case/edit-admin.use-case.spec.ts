/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { EditAdmin } from './edit-admin.use-case'
import { makeAdmin } from '../../utils/factories/make-admin'
import { AppError } from '../../shared/error/app-error'

describe('Use case - Edit admin', () => {
  it('should edit an admin', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPasswordService = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(
      inMemoryRepository,
      bcryptPasswordService
    )
    const editAdmin = new EditAdmin(inMemoryRepository)

    const { admin } = await createAdmin.execute({
      companyId: 'exemple-company-id',
      email: 'test@test.test',
      password: 'password123',
      name: 'Test Admin',
    })

    await editAdmin.execute({
      adminId: admin.id,
      email: 'new@test.test',
      name: 'new name test',
    })

    expect(inMemoryRepository.admins[0]).toMatchObject({
      email: 'new@test.test',
      name: 'new name test',
    })
  })

  it('should not edit an admin that does not exist', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()

    const editAdmin = new EditAdmin(inMemoryRepository)
    const admin = makeAdmin()

    expect(
      async () =>
        await editAdmin.execute({
          adminId: admin.id,
          email: 'new@test.test',
          name: 'new name test',
        })
    ).rejects.toThrowError(AppError)
  })
})

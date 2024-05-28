/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { AppError } from '../../shared/error/app-error'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { ChangePasswordAdmin } from './change-password.use-case'
import { makeAdmin } from '../../utils/factories/make-admin'

describe('Use case - Change password Admin', () => {
  it('should be able to update an admin password', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(inMemoryRepository, bcryptPassword)
    const changePasswordAdmin = new ChangePasswordAdmin(
      inMemoryRepository,
      bcryptPassword
    )

    const { admin } = await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      companyId: 'exemple-company-id',
      password: '12345',
    })

    const newPassword = 'abcde'

    await changePasswordAdmin.execute({
      newPassword,
      adminId: admin.id,
    })

    const passwordHash = inMemoryRepository.admins[0].password

    const match = await bcryptPassword.compareHash(newPassword, passwordHash)
    expect(match).toBeTruthy()
  })

  it('should not be able to update password for a admin that does not exist', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const admin = makeAdmin()

    const changePasswordAdmin = new ChangePasswordAdmin(
      inMemoryRepository,
      bcryptPassword
    )

    const newPassword = 'abcde'

    expect(async () => {
      await changePasswordAdmin.execute({
        newPassword,
        adminId: admin.id,
      })
    }).rejects.toThrowError(AppError)
  })
})

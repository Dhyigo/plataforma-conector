import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { Admin } from '../model/admin.entities'

describe('Use case - Create admin', () => {
  it('should be able to create a admin', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(inMemoryRepository, bcryptPassword)
    await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id',
    })

    expect(inMemoryRepository.admins[0]).instanceOf(Admin)
  })
})

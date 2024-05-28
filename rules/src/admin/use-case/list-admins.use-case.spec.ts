import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { ListAdmins } from './list-admins.use-case'

describe('Use case - List admins', () => {
  it('should be able must list the admin', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(inMemoryRepository, bcryptPassword)
    const listAdmins = new ListAdmins(inMemoryRepository)

    await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id',
    })
    await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id',
    })
    await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id-2',
    })

    const { admins } = await listAdmins.execute({
      companyId: 'exemple-company-id',
    })

    expect(admins).toHaveLength(2)
  })
})

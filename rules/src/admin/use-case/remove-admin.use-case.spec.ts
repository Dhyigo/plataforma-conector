import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { RemoveAdmin } from './remove-admin.use-case'

describe('Use case - Remove admin', () => {
  it('should be able to remove a Admin', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(inMemoryRepository, bcryptPassword)
    const removeAdmin = new RemoveAdmin(inMemoryRepository)

    const { admin } = await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id',
    })

    await removeAdmin.execute({ adminId: admin.id })

    expect(inMemoryRepository.admins).toHaveLength(0)
  })
})

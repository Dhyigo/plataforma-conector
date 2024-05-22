import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryAdminRepository } from '../../utils/repository/in-memory-admin'
import { CreateAdmin } from './create-admin.use-case'
import { Admin } from '../model/admin.entities'
import { CPF } from '../../utils/validator/CPF'

describe('Use case - Create platform manager', () => {
  it('should be able to create a Platform manager', async () => {
    const inMemoryRepository = new InMemoryAdminRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createAdmin = new CreateAdmin(inMemoryRepository, bcryptPassword)
    const cpf = CPF.generate()
    await createAdmin.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      companyId: 'exemple-company-id',
      cpf,
    })

    expect(inMemoryRepository.admins[0]).instanceOf(Admin)
  })
})

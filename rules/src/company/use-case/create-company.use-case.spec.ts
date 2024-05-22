import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryCompanyRepository } from '../../utils/repository/in-memory-company'
import { CNPJ } from '../../utils/validator/CNPJ'
import { Company } from '../model/company.entities'
import { CreateCompany } from './create-company.use-case'

describe('Use case - Create Company', () => {
  it('should be able to create a Company', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createCompany = new CreateCompany(inMemoryRepository, bcryptPassword)

    await createCompany.execute({
      name: 'name example',
      email: 'test@test.test',
      org: 'heads',
      password: '12345',
      cnpj: CNPJ.generate(),
    })

    expect(inMemoryRepository.companys[0]).instanceOf(Company)
  })
})

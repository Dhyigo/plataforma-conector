/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { ChangePasswordCompany } from './change-password-company.use-case'
import { InMemoryCompanyRepository } from '../../utils/repository/in-memory-company'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { AppError } from '../../shared/error/app-error'
import { CNPJ } from '../../utils/validator/CNPJ'
import { makeCompany } from '../../utils/factories/make-company'
import { CreateCompany } from './create-company.use-case'

describe('Use case - Change password Company', () => {
  it('should be able to create a company', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createCompany = new CreateCompany(inMemoryRepository, bcryptPassword)
    const changePasswordCompany = new ChangePasswordCompany(
      inMemoryRepository,
      bcryptPassword
    )

    const { company } = await createCompany.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      cnpj: CNPJ.generate(),
    })

    const newPassword = 'abcde'

    await changePasswordCompany.execute({
      newPassword,
      companyId: company.id,
    })

    const passwordHash = inMemoryRepository.companys[0].password

    const match = await bcryptPassword.compareHash(newPassword, passwordHash)
    expect(match).toBeTruthy()
  })

  it('should not be able to update password for a company that does not exist', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const company = makeCompany()

    const changePasswordCompany = new ChangePasswordCompany(
      inMemoryRepository,
      bcryptPassword
    )

    const newPassword = 'abcde'

    expect(async () => {
      await changePasswordCompany.execute({
        newPassword,
        companyId: company.id,
      })
    }).rejects.toThrowError(AppError)
  })
})

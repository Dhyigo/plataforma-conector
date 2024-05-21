/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryCompanyRepository } from '../../utils/repository/in-memory-company'
import { CNPJ } from '../../utils/validator/CNPJ'
import { CreateCompany } from './create-company.use-case'
import { AddPaymentDataCompany } from './add-payment-data.use-case'
import { makeCompany } from '../../utils/factories/make-company'
import { AppError } from '../../shared/error/app-error'
import { RemovePaymentDataCompany } from './remove-payment-data.use-case'

describe('Use case - remove payment data', () => {
  it('should be able to remove payment data', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createPlatformManager = new CreateCompany(
      inMemoryRepository,
      bcryptPassword
    )
    const addPaymentDataCompany = new AddPaymentDataCompany(inMemoryRepository)
    const removePaymentDataCompany = new RemovePaymentDataCompany(
      inMemoryRepository
    )

    const { company } = await createPlatformManager.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      cnpj: CNPJ.generate(),
      org: 'heads',
    })

    await addPaymentDataCompany.execute({
      companyId: company.id,
      accountNumber: '122233',
      agency: '0001',
      name: 'test bank',
      typeAccount: 'corrente',
    })

    await removePaymentDataCompany.execute({ companyId: company.id })

    expect(inMemoryRepository.companys[0].bankData).toBeNull()
  })

  it('should not be able remove payment data for a company that does not exist', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()

    const company = makeCompany()

    const removePaymentDataCompany = new RemovePaymentDataCompany(
      inMemoryRepository
    )

    expect(async () => {
      return await removePaymentDataCompany.execute({
        companyId: company.id,
      })
    }).rejects.toThrowError(AppError)
  })
})

/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { InMemoryCompanyRepository } from '../../utils/repository/in-memory-company'
import { CNPJ } from '../../utils/validator/CNPJ'
import { CreateCompany } from './create-company.use-case'
import { AddPaymentDataCompany } from './add-payment-data.use-case'
import { makeCompany } from '../../utils/factories/make-company'
import { AppError } from '../../shared/error/app-error'

describe('Use case - add payment data', () => {
  it('should be able to add payment data', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createPlatformManager = new CreateCompany(
      inMemoryRepository,
      bcryptPassword
    )
    const addPaymentDataCompany = new AddPaymentDataCompany(inMemoryRepository)

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

    expect(inMemoryRepository.companys[0].bankData).toMatchObject({
      accountNumber: '122233',
      agency: '0001',
      name: 'test bank',
      typeAccount: 'corrente',
    })
  })

  it('should not be able add payment data for a company that does not exist', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()

    const company = makeCompany()

    const addPaymentDataCompany = new AddPaymentDataCompany(inMemoryRepository)

    expect(async () => {
      return await addPaymentDataCompany.execute({
        companyId: company.id,
        accountNumber: '122233',
        agency: '0001',
        name: 'test bank',
        typeAccount: 'corrente',
      })
    }).rejects.toThrowError(AppError)
  })
})

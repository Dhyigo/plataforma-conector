/* eslint-disable @typescript-eslint/no-floating-promises */
import { describe, expect, it } from 'vitest'
import { BcryptPasswordService } from '../../utils/service/bcrypt-password-service'
import { AppError } from '../../shared/error/app-error'
import { InMemoryCompanyRepository } from '../../utils/repository/in-memory-company'
import { CNPJ } from '../../utils/validator/CNPJ'
import { makeCompany } from '../../utils/factories/make-company'
import { CreateCompany } from './create-company.use-case'
import { UpdateIdentificationDataCompany } from './update-identification-data-company.use-case'

describe('Use case - update identification data company', () => {
  it('should be able to update a identification data', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()
    const bcryptPassword = new BcryptPasswordService()

    const createPlatformManager = new CreateCompany(
      inMemoryRepository,
      bcryptPassword
    )
    const updateIdentification = new UpdateIdentificationDataCompany(
      inMemoryRepository
    )

    const { company } = await createPlatformManager.execute({
      name: 'name example',
      email: 'test@test.test',
      password: '12345',
      cnpj: CNPJ.generate(),
      org: 'heads',
    })

    const newName = 'new name'
    const newEmail = 'newemail@email.test'
    const newCnpj = CNPJ.generate()
    const newOrg = 'new org'

    await updateIdentification.execute({
      companyId: company.id,
      newEmail,
      newName,
      newCnpj,
      newOrg,
    })

    expect(inMemoryRepository.companys[0].name).toEqual(newName)
    expect(inMemoryRepository.companys[0].email).toEqual(newEmail)
    expect(inMemoryRepository.companys[0].cnpj.value).toEqual(newCnpj)
    expect(inMemoryRepository.companys[0].org).toEqual(newOrg)
  })

  it('should not be able to update identification data for a company that does not exist', async () => {
    const inMemoryRepository = new InMemoryCompanyRepository()

    const company = makeCompany()

    const updateIdentification = new UpdateIdentificationDataCompany(
      inMemoryRepository
    )

    const newName = 'new name'
    const newEmail = 'newemail@email.test'
    const newCnpj = CNPJ.generate()
    const newOrg = 'new org'

    expect(async () => {
      return await updateIdentification.execute({
        companyId: company.id,
        newEmail,
        newName,
        newCnpj,
        newOrg,
      })
    }).rejects.toThrowError(AppError)
  })
})

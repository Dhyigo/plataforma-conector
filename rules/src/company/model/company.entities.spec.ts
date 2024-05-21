import { describe, expect, it } from 'vitest'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { makeCompany } from '../../utils/factories/make-company'
import { Company } from './company.entities'
import { Cnpj } from './cnpj.value-object'
import { makeBankData } from '../../utils/factories/make-bank-data'
import { BankData } from './bank-data.entities'
import { TextNumeric } from '../../shared/object-value/text-numeric.value-object'

describe('Entities - Company', () => {
  it('should be able to create a Company', () => {
    const company = makeCompany()

    expect(company).toBeInstanceOf(Company)
  })

  it('should be able to change the password and change the update date', () => {
    const company = makeCompany({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    company.changePassword('654321')

    expect(company.password).toEqual('654321')
    expect(company.updatedAt).not.toEqual(new Date('2022-06-12'))
  })

  it('should be able to change identify data and change the update date', () => {
    const company = makeCompany({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    company.changeIdentificationData({
      name: new SimpleName('New Name'),
      email: new Email('new@test.com'),
      cnpj: new Cnpj('89491823000170'),
      org: new SimpleName('new org'),
    })

    expect(company.name).toEqual('New Name')
    expect(company.email).toEqual('new@test.com')
    expect(company.cnpj.value).toEqual('89491823000170')
    expect(company.org).toEqual('new org')
    expect(company.updatedAt).not.toEqual(new Date('2022-06-12'))
  })

  it('should be able to update payment data', () => {
    const company = makeCompany()

    const bankData = makeBankData({
      agency: new TextNumeric('11111111111', 'agencia'),
    })

    company.addPaymentData(bankData)

    expect(company.bankData).instanceOf(BankData)
    expect(company.bankData?.agency).toBe(bankData.agency)
  })
})

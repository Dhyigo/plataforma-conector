import { describe, expect, it } from 'vitest'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { makeAdmin } from '../../utils/factories/make-admin'
import { Admin } from './admin.entities'
import { CPF } from '../../utils/validator/CPF'
import { Cpf } from '../../shared/object-value/cpf.value-object'

describe('Entities - Admin', () => {
  it('should be able to create a Admin', () => {
    const cpf = CPF.generate()

    const admin = new Admin({
      companyId: 'exemple-company-id',
      name: new SimpleName('Test name'),
      cpf: new Cpf(cpf),
      email: new Email('test@test.test'),
      password: 'abcd',
    })

    expect(admin).toBeInstanceOf(Admin)
    expect(admin).toMatchObject({
      name: 'Test name',
      email: 'test@test.test',
      companyId: 'exemple-company-id',
      cpf: { value: cpf },
      password: 'abcd',
    })
  })

  it('should be able to change the password and change the update date', () => {
    const admin = makeAdmin({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    admin.changePassword('654321')

    expect(admin.password).toEqual('654321')
    expect(admin.updatedAt).not.toEqual(new Date('2022-06-12'))
  })

  it('should be able to change identify data and change the update date', () => {
    const admin = makeAdmin({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    admin.changeIdentificationData({
      name: new SimpleName('New Name'),
      email: new Email('new@test.com'),
    })

    expect(admin).toMatchObject({
      name: 'New Name',
      email: 'new@test.com',
    })
    expect(admin.updatedAt).not.toEqual(new Date('2022-06-12'))
  })
})

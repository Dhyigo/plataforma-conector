import { Admin, AdminProps } from '../../admin/model/admin.entities'
import { Cpf } from '../../shared/object-value/cpf.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { CPF } from '../validator/CPF'

type Override = Partial<AdminProps>

export function makeAdmin(override?: Override): Admin {
  return new Admin({
    companyId: 'exemple-id',
    cpf: new Cpf(CPF.generate()),
    email: new Email('test@test.test'),
    name: new SimpleName('Test name'),
    password: 'abcd',
    ...override,
  })
}

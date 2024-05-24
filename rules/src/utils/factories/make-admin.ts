import { Admin, AdminProps } from '../../admin/model/admin.entities'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

type Override = Partial<AdminProps>

export function makeAdmin(override?: Override): Admin {
  return new Admin({
    companyId: 'exemple-id',
    email: new Email('test@test.test'),
    name: new SimpleName('Test name'),
    password: 'abcd',
    ...override,
  })
}

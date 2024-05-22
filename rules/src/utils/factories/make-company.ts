import { Cnpj } from '../../company/model/cnpj.value-object'
import { Company, CompanyProps } from '../../company/model/company.entities'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { makeBankData } from './make-bank-data'

type Override = Partial<CompanyProps>

export function makeCompany(override: Override = {}): Company {
  const bankData = makeBankData()

  return new Company({
    name: new SimpleName('bank exemple'),
    cnpj: new Cnpj('02.701.325/0001-27'),
    email: new Email('test@test.test'),
    password: '1234456',
    bankData,
    ...override,
  })
}

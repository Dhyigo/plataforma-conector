import { BankData, BankDataProps } from '../../company/model/bank-data.entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

type Override = Partial<BankDataProps>

export function makeBankData(override: Override = {}): BankData {
  return new BankData({
    name: new SimpleName('bank exemple'),
    agency: '0001',
    accountNumber: '0001',
    typeAccount: new SimpleName('corrente'),
    ...override,
  })
}

import { BankData, BankDataProps } from '../../company/model/bank-data.entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { TextNumeric } from '../../shared/object-value/text-numeric.value-object'

type Override = Partial<BankDataProps>

export function makeBankData(override: Override = {}): BankData {
  return new BankData({
    name: new SimpleName('bank exemple'),
    agency: new TextNumeric('0001', 'agencia'),
    accountNumber: new TextNumeric('0001', 'número da conta'),
    typeAccount: new SimpleName('corrente'),
    ...override,
  })
}

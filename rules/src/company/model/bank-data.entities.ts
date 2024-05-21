import { Entities } from '../../shared/interface/entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

export interface BankDataProps {
  name: SimpleName
  agency: string
  accountNumber: string
  typeAccount: SimpleName
}

export class BankData extends Entities {
  private readonly _props: BankDataProps

  constructor(props: BankDataProps, id?: string) {
    super(id)
    this._props = props
  }

  get name(): string {
    return this._props.name.value
  }

  get agency(): string {
    return this._props.agency
  }

  get accountNumber(): string {
    return this._props.accountNumber
  }

  get typeAccount(): string {
    return this._props.typeAccount.value
  }
}

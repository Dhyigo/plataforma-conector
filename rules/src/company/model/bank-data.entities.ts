import { Entity, EntityTypes } from '../../shared/interface/entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { TextNumeric } from '../../shared/object-value/text-numeric.value-object'

export interface BankDataProps {
  name: SimpleName
  typeAccount: SimpleName
  agency: TextNumeric
  accountNumber: TextNumeric
}

export class BankData extends Entity {
  private readonly _props: BankDataProps

  constructor(props: BankDataProps, id?: string) {
    super(id, EntityTypes.Company)
    this._props = props
  }

  get name(): string {
    return this._props.name.value
  }

  get agency(): string {
    return this._props.agency.value
  }

  get accountNumber(): string {
    return this._props.accountNumber.value
  }

  get typeAccount(): string {
    return this._props.typeAccount.value
  }
}

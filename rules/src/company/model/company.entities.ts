import { Replace } from '../../helpers/replace'
import { Email } from '../../shared/object-value/email.object-value'
import { Entities } from '../../shared/interface/entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Cnpj } from './cnpj.value-object'
import { BankData } from './bank-data.entities'

export interface CompanyProps {
  name: SimpleName
  email: Email
  cnpj: Cnpj
  org: SimpleName
  bankData: BankData | null
  password: string
  createdAt: Date
  updatedAt: Date
}

interface ChangeIdentificationData {
  name: SimpleName
  email: Email
  cnpj: Cnpj
  org: SimpleName
}

type ICompanyProps = Replace<
  CompanyProps,
  { createdAt?: Date; updatedAt?: Date; bankData?: BankData | null }
>
export class Company extends Entities {
  private _props: CompanyProps

  constructor(props: ICompanyProps, id?: string) {
    super(id)
    this._props = {
      ...props,
      bankData: props.bankData ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  changePassword(password: string): void {
    this._props.password = password
    this.update()
  }

  changeIdentificationData(data: ChangeIdentificationData): void {
    const { name, email, cnpj, org } = data

    this._props = {
      ...this._props,
      name,
      email,
      cnpj,
      org,
    }

    this.update()
  }

  addPaymentData(bankDatas: BankData): void {
    this._props.bankData = bankDatas
  }

  removePaymentData(): void {
    this._props.bankData = null
  }

  get name(): string {
    return this._props.name.value
  }

  get email(): string {
    return this._props.email.value
  }

  get cnpj(): Cnpj {
    return this._props.cnpj
  }

  get org(): string {
    return this._props.org.value
  }

  get bankData(): BankData | null {
    return this._props.bankData
  }

  get password(): string {
    return this._props.password
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date {
    return this._props.updatedAt
  }

  private update(): void {
    this._props.updatedAt = new Date()
  }
}

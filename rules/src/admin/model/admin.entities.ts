import { Replace } from '../../helpers/replace'
import { Entities } from '../../shared/interface/entities'
import { Cpf } from '../../shared/object-value/cpf.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

export interface AdminProps {
  name: SimpleName
  email: Email
  cpf: Cpf
  companyId: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface IdentificationData {
  name: SimpleName
  email: Email
}

export class Admin extends Entities {
  private _props: AdminProps

  constructor(
    props: Replace<AdminProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string
  ) {
    super(id)

    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  changePassword(password: string): void {
    this._props.password = password
    this.update()
  }

  changeIdentificationData(data: IdentificationData): void {
    const { name, email } = data

    this._props = {
      ...this._props,
      name,
      email,
    }

    this.update()
  }

  private update(): void {
    this._props.updatedAt = new Date()
  }

  get name(): string {
    return this._props.name.value
  }

  get email(): string {
    return this._props.email.value
  }

  get cpf(): Cpf {
    return this._props.cpf
  }

  get companyId(): string {
    return this._props.companyId
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
}

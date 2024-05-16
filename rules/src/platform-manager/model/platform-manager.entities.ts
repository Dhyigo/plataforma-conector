import { Replace } from '../../helpers/replace'
import { Email } from '../../shared/object-value/email.object-value'
import { Entities } from '../../shared/interface/entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

export interface PlatformManagerProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export class PlatformManager extends Entities {
  private _props: PlatformManagerProps
  private _name: SimpleName
  private _email: Email

  constructor(
    props: Replace<
      PlatformManagerProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string
  ) {
    super(id)
    this._name = new SimpleName(props.name)
    this._email = new Email(props.email)

    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  get props(): PlatformManagerProps {
    return this._props
  }

  changePassword(password: string): void {
    this._props.password = password
    this.setUpdateAt()
  }

  changeIdentificationData(name: string, email: string): void {
    this._name = new SimpleName(name)
    this._email = new Email(email)

    this._props = { ...this.props, name, email }

    this.setUpdateAt()
  }

  get name(): SimpleName {
    return this._name
  }

  get email(): Email {
    return this._email
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date {
    return this._props.updatedAt
  }

  private setUpdateAt(): void {
    this._props.updatedAt = new Date()
  }
}

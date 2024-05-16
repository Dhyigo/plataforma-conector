import { Replace } from '../../helpers/replace'
import { Email } from '../../shared/object-value/email.object-value'
import { Entities } from '../../shared/interface/entities'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

export interface PlatformManagerProps {
  name: SimpleName
  email: Email
  password: string
  createdAt: Date
  updatedAt: Date
}

type IPlatformManagerProps = Replace<
  PlatformManagerProps,
  { createdAt?: Date; updatedAt?: Date }
>
export class PlatformManager extends Entities {
  private _props: PlatformManagerProps

  constructor(props: IPlatformManagerProps, id?: string) {
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

  changeIdentificationData(data: { name: SimpleName; email: Email }): void {
    const { name, email } = data

    this._props = {
      ...this._props,
      name,
      email,
    }

    this.update()
  }

  get name(): string {
    return this._props.name.value
  }

  get email(): string {
    return this._props.email.value
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

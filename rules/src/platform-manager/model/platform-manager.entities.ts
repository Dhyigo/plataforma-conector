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
  private readonly _props: PlatformManagerProps
  readonly name: SimpleName
  readonly email: Email

  constructor(
    props: Replace<
      PlatformManagerProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string
  ) {
    super(id)
    this.name = new SimpleName(props.name)
    this.email = new Email(props.email)

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

import { Id } from '../object-value/id.object-value'

export enum EntityTypes {
  PlatformManager = 'platform-manager',
  Company = 'company',
  Admin = 'admin',
  Default = 'default',
}

export abstract class Entity {
  private readonly _id: Id
  private readonly _type: EntityTypes

  constructor(id?: string, type?: EntityTypes) {
    this._id = new Id(id)
    this._type = type ?? EntityTypes.Default
  }

  get id(): string {
    return this._id.value
  }

  get type(): string {
    return this._type
  }
}

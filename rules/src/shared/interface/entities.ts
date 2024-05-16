import { Id } from '../object-value/id.object-value'

export abstract class Entities {
  private readonly _id: Id

  constructor(id?: string) {
    this._id = new Id(id)
  }

  get id(): string {
    return this._id.value
  }
}

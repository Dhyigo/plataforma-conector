import { isNumeric } from 'validator'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../error/app-error'

export class TextNumeric {
  private readonly _value: string

  constructor(value: string, field: string) {
    const notIsNumeric = !isNumeric(value)

    if (notIsNumeric) {
      throw new AppError({
        message: `${field} deve ser numérico.`,
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    this._value = value
  }

  get value(): string {
    return this._value
  }
}

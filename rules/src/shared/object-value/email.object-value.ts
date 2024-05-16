import { isEmail } from 'validator'
import { AppError } from '../app-error'
import { StatusCodes } from 'http-status-codes'
export class Email {
  private readonly _email: string

  constructor(email: string) {
    const isNotEmail = !isEmail(email)

    if (isNotEmail) {
      throw new AppError({
        message: 'Por favor, insira um endereço de e-mail válido',
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    this._email = email
  }

  get value(): string {
    return this._email
  }
}

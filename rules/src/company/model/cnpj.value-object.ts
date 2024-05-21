import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { CNPJ } from '../../utils/validator/CNPJ'

export class Cnpj {
  private readonly _cnpj: string

  constructor(cnpj: string) {
    cnpj = cnpj.toString().replace(/\D/g, '')
    const cnpjIsInvalid = !CNPJ.validate(cnpj)

    if (cnpjIsInvalid) {
      throw new AppError({
        message: 'CNPJ inválido.',
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    this._cnpj = cnpj
  }

  get value(): string {
    return this._cnpj
  }

  format(): string {
    return CNPJ.format(this._cnpj)
  }
}

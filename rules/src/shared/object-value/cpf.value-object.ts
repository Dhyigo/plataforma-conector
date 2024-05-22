import { StatusCodes } from 'http-status-codes'
import { CPF } from '../../utils/validator/CPF'
import { AppError } from '../error/app-error'

export class Cpf {
  private readonly _cpf: string

  constructor(cpf: string) {
    cpf = cpf.toString().replace(/\D/g, '')
    const notIsValid = !CPF.isValid(cpf)

    if (notIsValid) {
      throw new AppError({
        message: 'CPF inválido.',
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    this._cpf = cpf
  }

  get value(): string {
    return this._cpf
  }

  format(): string {
    return CPF.format(this._cpf)
  }
}

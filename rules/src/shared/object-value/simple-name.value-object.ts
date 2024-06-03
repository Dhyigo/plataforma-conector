import {} from 'validator'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../error/app-error'

interface SimpleNameConfig {
  min?: number
  max?: number
  field?: string
}

export class SimpleName {
  private readonly _name: string

  constructor(value: string, config?: SimpleNameConfig) {
    const { max = 240, min = 3, field = 'Nome' } = { ...config }

    if (typeof value !== 'string') {
      throw new AppError({
        message: `${field} deve ser texto`,
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    const name = value.trim()

    const hasEspecialCharOrNumber = !/^[a-zA-ZÀ-ÿ\s']*$/.test(name)

    if (hasEspecialCharOrNumber) {
      throw new AppError({
        message: `${field} deve conter apenas letras.`,
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    if (name.length < min) {
      throw new AppError({
        message: `${field} deve ter no mínimo ${min} caracteres.`,
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    if (name.length > max) {
      throw new AppError({
        message: `${field} deve ter no máximo ${max} caracteres.`,
        statusCode: StatusCodes.BAD_REQUEST,
      })
    }

    this._name = name
  }

  get value(): string {
    return this._name
  }
}

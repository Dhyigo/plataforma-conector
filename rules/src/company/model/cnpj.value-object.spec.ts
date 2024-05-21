import { describe, expect, it } from 'vitest'
import { Cnpj } from './cnpj.value-object'
import { AppError } from '../../shared/error/app-error'

describe('Value object - Cnpj', () => {
  it('should create a valid cnpj', () => {
    const cnpj = new Cnpj('02.701.325/0001-27')

    expect(cnpj.value).toBeTruthy()
  })

  it('should not create a invalid cnpj', () => {
    expect(() => new Cnpj('11.111.111/1111-11')).toThrowError(AppError)
  })

  it('should return a cnpj formatted ', () => {
    const cnpj = new Cnpj('02701325000127')
    const expectedFormat = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

    expect(cnpj.format()).toBe('02.701.325/0001-27')
    expect(cnpj.format()).toMatch(expectedFormat)
  })
})

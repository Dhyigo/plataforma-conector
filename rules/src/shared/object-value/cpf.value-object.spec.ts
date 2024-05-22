import { describe, expect, it } from 'vitest'
import { AppError } from '../../shared/error/app-error'
import { Cpf } from './cpf.value-object'

describe('Value object - Cpf', () => {
  it('should create a valid cpf', () => {
    const cpf = new Cpf('89534882062')

    expect(cpf.value).toBeTruthy()
  })

  it('should not create a invalid cpf', () => {
    expect(() => new Cpf('89534882011')).toThrowError(AppError)
  })

  it('should return a cpf formatted ', () => {
    const cpf = new Cpf('52827267004')
    const expectedFormat = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

    expect(cpf.format()).toBe('528.272.670-04')
    expect(cpf.format()).toMatch(expectedFormat)
  })
})

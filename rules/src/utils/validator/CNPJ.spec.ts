import { describe, expect, it } from 'vitest'
import { CNPJ } from './CNPJ'

describe('Validador - CNPJ', () => {
  it('Deve validar um CNPJ válido', () => {
    const cnpj = '02.701.325/0001-27'

    expect(CNPJ.validate(cnpj)).toBeTruthy()
  })

  it('Deve invalidar um CNPJ inválido', () => {
    const cnpj = '02.701.325/1234-27'

    expect(CNPJ.validate(cnpj)).toBeFalsy()
  })

  it('Deve criar um CNPJ válido', () => {
    const cnpj = CNPJ.generate()

    expect(CNPJ.validate(cnpj)).toBeTruthy()
  })

  it('Deve formatar um CNPJ', () => {
    const cnpj = '02701325000127'
    const formattedCnpj = '02.701.325/0001-27'

    const cnpjFormatted = CNPJ.format(cnpj)

    expect(cnpjFormatted).toBe(formattedCnpj)
  })
})

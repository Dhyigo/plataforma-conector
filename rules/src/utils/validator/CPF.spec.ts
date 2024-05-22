import { describe, expect, it } from 'vitest'
import { CPF } from './CPF'

describe('CPF', () => {
  it('Deve validar um CPF válido', () => {
    const cpf = '600.663.500-34'

    expect(CPF.isValid(cpf)).toBeTruthy()
  })

  it('Deve invalidar um CPF inválido', () => {
    const cpf = '600.663.500-14'

    expect(CPF.isValid(cpf)).toBeFalsy()
  })

  it('Deve criar um CPF válido', () => {
    const cpf = CPF.generate()

    expect(CPF.isValid(cpf)).toBeTruthy()
  })

  it('Deve formatar um CPF', () => {
    const cpf = '60066350034'
    const formattedCnpj = '600.663.500-34'

    const cpfFormatted = CPF.format(cpf)

    expect(cpfFormatted).toBe(formattedCnpj)
  })
})

import { describe, expect, it } from 'vitest'
import { makeBankData } from '../../utils/factories/make-bank-data'
import { BankData } from './bank-data.entities'

describe('Entities - Bank data', () => {
  it('should be able to create a Bank data', () => {
    const bankData = makeBankData()

    expect(bankData).toBeInstanceOf(BankData)
  })
})

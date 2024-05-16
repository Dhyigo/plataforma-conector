import { describe, expect, it } from 'vitest'
import { SimpleName } from './simple-name.value-object'
import { AppError } from '../app-error'

describe('Value object = Simple name', () => {
  it('should be able to create a simple name', () => {
    const value: any = 'nametest'
    const name = new SimpleName(value as string)

    expect(name).instanceOf(SimpleName)
    expect(name.value).toEqual(value)
  })

  it('should not create a simple name with a value other than a string', () => {
    const value: any = 123

    expect(() => new SimpleName(value as string)).toThrow(AppError)
  })

  it('should not be able to create a simple name with less than 5 characters', () => {
    expect(() => new SimpleName('Di')).toThrowError(AppError)
    expect(() => new SimpleName('Di', { min: 3 })).toThrowError(AppError)
  })

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new SimpleName('a'.repeat(241))).toThrow()
    expect(() => new SimpleName('a'.repeat(241), { max: 240 })).toThrow()
  })

  it('should throw AppError when creating a simple name with special characters', () => {
    expect(() => new SimpleName('Diego!@#', { min: 3 })).toThrowError(AppError)
  })
})

import { describe, expect, it } from 'vitest'
import { Email } from './email.object-value'
import { AppError } from '../error/app-error'

describe('Value object - Email', () => {
  it('should be create an Email', () => {
    const email = new Email('test@test.com')
    expect(email).toBeInstanceOf(Email)
  })

  it('should error when creating a email with value invalid', () => {
    expect(() => new Email('test')).toThrowError(AppError)
  })
})

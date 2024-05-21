import { describe, expect, it } from 'vitest'
import { TextNumeric } from './text-numeric.value-object'

describe('Value Object - text numeric', () => {
  it('should create a numeric text', () => {
    const text = new TextNumeric('1234', 'texto')
    expect(text.value).toBe('1234')
  })

  it('should not create numeric text with non-numeric text', () => {
    expect(() => new TextNumeric('ab12', 'texto')).toThrowError()
  })
})

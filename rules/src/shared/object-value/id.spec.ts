import { describe, expect, it } from 'vitest'
import { Id } from './id.object-value'

describe('Value object - Id', () => {
  it('should be able to create an ID', () => {
    const value = 'exemplo-id'
    const id = new Id(value)

    expect(id).instanceOf(Id)
    expect(id.value).toEqual(value)
  })

  it('should be able to create a valueless ID', () => {
    const id = new Id()

    expect(id).instanceOf(Id)
    expect(id.value).toString()
  })
})

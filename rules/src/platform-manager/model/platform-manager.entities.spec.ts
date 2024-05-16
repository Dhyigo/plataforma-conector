import { describe, expect, it } from 'vitest'
import { PlatformManager } from './platform-manager.entities'

describe('Entities - Platform manager', () => {
  it('should be able to create a Platform manager', () => {
    const platformManager = new PlatformManager({
      name: 'name exemple',
      email: 'test@email.com',
      password: '123456',
    })

    expect(platformManager).toBeInstanceOf(PlatformManager)
  })

  it('should be able to change the password and change the update date', () => {
    const platformManager = new PlatformManager({
      name: 'name exemple',
      email: 'test@email.com',
      password: '123456',
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    platformManager.changePassword('654321')

    expect(platformManager.props.password).toEqual('654321')
    expect(platformManager.props.updatedAt).not.toEqual(new Date('2022-06-12'))
  })
})

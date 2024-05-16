import { describe, expect, it } from 'vitest'
import { PlatformManager } from './platform-manager.entities'
import { makePlatformManager } from '../../utils/factorie/make-platform-manager'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'

describe('Entities - Platform manager', () => {
  it('should be able to create a Platform manager', () => {
    const platformManager = makePlatformManager()

    expect(platformManager).toBeInstanceOf(PlatformManager)
  })

  it('should be able to change the password and change the update date', () => {
    const platformManager = makePlatformManager({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    platformManager.changePassword('654321')

    expect(platformManager.password).toEqual('654321')
    expect(platformManager.updatedAt).not.toEqual(new Date('2022-06-12'))
  })

  it('should be able to change identify data and change the update date', () => {
    const platformManager = makePlatformManager({
      createdAt: new Date('2022-06-12'),
      updatedAt: new Date('2022-06-12'),
    })

    platformManager.changeIdentificationData({
      name: new SimpleName('New Name'),
      email: new Email('new@test.com'),
    })

    expect(platformManager.name).toEqual('New Name')
    expect(platformManager.email).toEqual('new@test.com')
    expect(platformManager.updatedAt).not.toEqual(new Date('2022-06-12'))
  })
})

import {
  PlatformManager,
  PlatformManagerProps,
} from '../../platform-manager/model/platform-manager.entities'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

type Override = Partial<PlatformManagerProps>

export function makePlatformManager(override: Override = {}): PlatformManager {
  return new PlatformManager({
    name: new SimpleName('name exemple'),
    email: new Email('test@email.com'),
    password: '123456',
    ...override,
  })
}

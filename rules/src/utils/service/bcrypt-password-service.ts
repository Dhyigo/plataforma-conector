import { PasswordServices } from '../../shared/interface/password-services'

export class BcryptPasswordService implements PasswordServices {
  async hash(password: string): Promise<string> {
    return `${password}:crypt-fake`
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return `${password}:crypt-fake` === hash
  }
}

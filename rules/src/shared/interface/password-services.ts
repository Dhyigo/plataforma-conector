export abstract class PasswordServices {
  abstract hash(password: string): Promise<string>
  abstract compareHash(password: string, hash: string): Promise<boolean>
}

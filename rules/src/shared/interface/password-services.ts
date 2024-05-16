export interface PasswordServices {
  hash(password: string): Promise<string>
  compareHash(password: string, hash: string): Promise<boolean>
}

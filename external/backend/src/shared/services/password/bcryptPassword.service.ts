import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordServices } from 'rules';

@Injectable()
export class BcryptPasswordService implements PasswordServices {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

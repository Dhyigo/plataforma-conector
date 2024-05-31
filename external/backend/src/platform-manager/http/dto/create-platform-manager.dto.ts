import { IsEmail, IsString, Length } from 'class-validator';
import { PlatformManagerProps } from 'rules';

type TPlatformManager = Partial<Record<keyof PlatformManagerProps, unknown>>;

export class CreatePlatformManagerDto implements TPlatformManager {
  @IsString({ message: 'O nome deve ser texto.' })
  @Length(3, 220, { message: 'O nome precisa ter entre 3 e 220 caracteres.' })
  name: string;

  @IsEmail(
    {},
    { message: 'O e-mail é inválido. Por favor, insira um e-mail válido.' },
  )
  email: string;

  @Length(8, 320, { message: 'A senha precisa ter entre 8 e 320 caracteres.' })
  password: string;
}

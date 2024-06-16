import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { CreatePlatformManagerDto } from './create-platform-manager.dto';

export class UpdateIdentificationDataDto
  implements Omit<CreatePlatformManagerDto, 'password'>
{
  @Length(3, 220, { message: 'O nome precisa ter entre 3 e 220 caracteres.' })
  @Matches(/^[a-zA-ZÀ-ÿ\s']*$/, {
    message: 'O nome deve conter apenas letras.',
  })
  @IsString({ message: 'O nome deve ser texto.' })
  name: string;

  @IsEmail(
    {},
    { message: 'O e-mail é inválido. Por favor, insira um e-mail válido.' },
  )
  email: string;
}

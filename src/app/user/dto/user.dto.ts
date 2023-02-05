import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidBirthday } from '../validator/birthday-format.validator';
import { IsValidCpf } from '../validator/cpf-format.validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsValidBirthday()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @IsValidCpf()
  cpf: string;
}

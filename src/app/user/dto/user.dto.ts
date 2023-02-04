import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidCpf } from '../validator/cpf-format.validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @IsValidCpf()
  cpf: string;
}

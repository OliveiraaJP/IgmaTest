import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidBirthday } from '../validator/birthday-format.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsValidBirthday()
  birthday?: string;
}

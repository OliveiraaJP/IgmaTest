import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class BirthdayFormatValidator implements ValidatorConstraintInterface {
  constructor(
    private message: string = 'birthday should be on DD/MM/YYYY format',
  ) {}

  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const pattern = /^\d{2}\/\d{2}\/\d{4}$/gm;
    const date = new Date();
    if (!pattern.test(value)) return false;

    const day = value.substring(0, 2);
    if (Number(day) > 31) {
      this.message = 'dd should be less than 32';
      return false;
    }

    const month = value.substring(3, 5);
    if (Number(month) > 12) {
      this.message = 'month should be less than 13';
      return false;
    }

    const year = value.substring(6, 10);
    if (Number(year) > date.getFullYear()) {
      this.message = 'year should be less than ' + date.getFullYear();
      return false;
    }

    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.message;
  }
}

export const IsValidBirthday = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: BirthdayFormatValidator,
    });
  };
};

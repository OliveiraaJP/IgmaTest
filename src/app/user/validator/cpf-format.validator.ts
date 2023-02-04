import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class CpfFormatValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const format = validCpfFormat(value);
    if (!format) {
      throw new HttpException(
        'Cpf should be xxxxxxxxxxx OR xxx.xxx.xxx-xx format.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const digits = validCpfDigits(value);
    if (!digits || cpfBlacklist.includes(value.replace(/[^\d]+/g, ''))) {
      throw new HttpException(
        'Cpf should be valid.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return true;
  }
}

const cpfBlacklist: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

function validCpfFormat(cpf: string): boolean {
  const pattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}|^\d{11}$/;
  if (pattern.test(cpf) !== true) {
    return false;
  }
  return true;
}

function validCpfDigits(cpf: string): boolean {
  const stripCpf = cpf.replace(/[^\d]+/g, '');
  let sum1 = 0;
  let rest1: number;

  for (let i = 1; i <= 9; i++) {
    sum1 += parseInt(stripCpf.substring(i - 1, i)) * (11 - i);
  }
  rest1 = (sum1 * 10) % 11;

  if (rest1 === 10 || rest1 === 11) rest1 = 0;
  if (rest1 !== parseInt(stripCpf.substring(9, 10))) return false;

  let sum2 = 0;
  let rest2: number;

  for (let i = 1; i <= 10; i++) {
    sum2 += parseInt(stripCpf.substring(i - 1, i)) * (12 - i);
  }
  rest2 = (sum2 * 10) % 11;

  if (rest2 === 10 || rest2 === 11) rest2 = 0;
  if (rest2 !== parseInt(stripCpf.substring(10, 11))) return false;

  return true;
}

export const IsValidCpf = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: CpfFormatValidator,
    });
  };
};

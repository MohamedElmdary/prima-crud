import { MinLength, IsEmail, Matches } from 'class-validator';

export class UserDTO {
  @MinLength(4, {
    message: 'Username min length is 4.',
  })
  username: string;

  @IsEmail(undefined, {
    message: 'Invalid Email pattern.',
  })
  email: string;

  @Matches(/\d{11}/, {
    message: 'Incorrect phone number.',
  })
  phone: string;

  @MinLength(6, {
    message: 'Password min length is 6.',
  })
  password: string;
}

export class UserLoginDTO {
  @IsEmail(undefined, {
    message: 'Invalid Email pattern.',
  })
  email: string;

  @MinLength(6, {
    message: 'Password min length is 6.',
  })
  password: string;
}

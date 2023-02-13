export class RegisterUserDto {
  full_name: string;
  password: string;
  email: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

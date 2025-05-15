import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

// For user registration
export class CreateUserDto {
  @IsNotEmpty()
  readonly _id: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}

// For user updates
export class UpdateUserDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @MinLength(6)
  readonly password?: string;
}

// For user login
export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}

// Berfungsi untuk menentukan ketentuan validasi

import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
} from "class-validator";

export class DTORegister {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  roles?: string;
}

export class DTOLogin {
  @IsNotEmpty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: "password is not empty" })
  @MinLength(8)
  password: string;
}

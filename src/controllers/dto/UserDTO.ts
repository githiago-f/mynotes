import { IsEmail, Length, IsNotEmpty } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  public readonly email!: string;

  @IsNotEmpty()
  @Length(6)
  public readonly password!: string;
}

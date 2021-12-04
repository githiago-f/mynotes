import { IsEmail, Length, IsNotEmpty } from 'class-validator';
import { Unique } from 'models/validators/UniqueValidator';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Unique()
  public readonly email!: string;

  @IsNotEmpty()
  @Length(6)
  public readonly password!: string;
}

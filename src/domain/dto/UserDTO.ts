import { IsEmail, Length, IsNotEmpty } from 'class-validator';
import { Unique } from 'domain/shared/validators/UniqueValidator';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Unique('User')
  public readonly email!: string;

  @IsNotEmpty()
  @Length(6)
  public readonly password!: string;
}

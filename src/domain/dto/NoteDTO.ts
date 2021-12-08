import { Length, IsNotEmpty, IsUUID } from 'class-validator';

export class NoteDTO {
  @IsNotEmpty()
  @Length(1, 150)
  public readonly title!: string;

  @Length(1, 400)
  @IsNotEmpty()
  public readonly content!: string;

  @IsUUID('4')
  @IsNotEmpty()
  public readonly authorId!: string;
}

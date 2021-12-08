import { NoteDTO } from 'domain/dto/NoteDTO';
import { Note } from 'domain/entity/Note';

export class NoteRepository {
  public findPaged(page?: number): Promise<Note[]> {
    return Note.findAll({
      where: {
        visible: true
      },
      limit: 10,
      offset: page || 0
    });
  }

  public create(note: NoteDTO): Promise<Note> {
    return Note.create(note);
  }
}

import { Note } from "domain/entity/Note";

export class NoteRepository {
  public findPaged(page?: number): Promise<Note[]> {
    return Note.findAll({
      where: {},
      limit: 10,
      offset: page || 0
    });
  }
}

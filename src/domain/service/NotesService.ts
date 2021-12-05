import { Note } from "domain/entity/Note";
import { NoteRepository } from "domain/repository/NoteRepository";
import { RedisService } from "./RedisService";

export class NotesService {
  private readonly REDIS_BASE_KEY = 'notes:page-';
  constructor(
    private repository: NoteRepository,
    private redisService: RedisService
  ) {}

  public async getNotesPaged(page?: number) {
    const currentKey = this.REDIS_BASE_KEY + page;

    const result = await this.redisService.getCachedByKey<Note[]>(currentKey);
    if(result) return result;

    const data = await this.repository.findPaged(page);
    this.redisService.storeDataInCache(currentKey, data);

    return data;
  }
}

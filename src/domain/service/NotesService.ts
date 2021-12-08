import { NoteDTO } from 'domain/dto/NoteDTO';
import { Note } from 'domain/entity/Note';
import { NoteRepository } from 'domain/repository/NoteRepository';
import { logger } from 'helpers/logger';
import { RedisService } from './RedisService';


export class NotesService {
  private readonly LOGGER = logger.child({
    name: NotesService.name
  });
  private readonly REDIS_BASE_KEY = 'notes:page-';
  constructor(
    private repository: NoteRepository,
    private redisService: RedisService
  ) {}

  public async getNotesPaged(page?: number) {
    const currentKey = this.REDIS_BASE_KEY + page;
    this.LOGGER.info('getNotesPaged', { currentKey });

    const result = await this.redisService.getCachedByKey<Note[]>(currentKey);
    if(result && result.length > 0) return result;

    const data = await this.repository.findPaged(page);
    this.redisService.storeDataInCache(currentKey, data);

    return data;
  }

  public async createNote(note: NoteDTO) {
    this.LOGGER.info('createNote', { note });
    const result = await this.repository.create(note);
    return result;
  }
}

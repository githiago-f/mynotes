import { logger } from 'helpers/logger';
import { RedisClientType } from 'redis/dist/lib/client';

export class RedisService {
  private readonly logger = logger.child({
    name: RedisService.name
  });

  constructor(
    private redis?: RedisClientType | null) {}

  public async getCachedByKey<T>(key: string) {
    let result = [] as unknown;
    try {
      await this.redis?.connect();
      const redisJSONResult = await this.redis?.get(key) || '[]';
      result = JSON.parse(redisJSONResult) as T;
    } catch(e) {
      this.logger.error(e);
    }
    await this.disconnect();
    return result;
  }

  public async storeDataInCache(key: string, data: any[]) {
    try {
      await this.redis?.connect();
      if(data.length > 0) {
        await this.redis?.set(key, JSON.stringify(data));
      }
    } catch(e) {
      this.logger.error(e);
    }
    await this.disconnect();
  }

  public async disconnect() {
    try {
      await this.redis?.disconnect();
    } catch(e) {
      this.logger.error(e);
    }
  }
}

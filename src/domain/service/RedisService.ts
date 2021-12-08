import { logger } from 'helpers/logger';
import { RedisClientType } from 'redis/dist/lib/client';

export class RedisService {
  private readonly logger = logger.child({
    name: RedisService.name
  });

  private isConnected = false;

  constructor(
    private redis?: RedisClientType | null) {}

  private async connect() {
    if(this.isConnected) return;
    try {
      await this.redis?.connect();
      this.isConnected = true;

      this.redis?.on('error', async (err) => {
        this.logger.error(err);
        await this.redis?.quit();
        this.isConnected = false;
      });
    } catch(e) {
      this.logger.error((e as Error).message);
    }
  }

  public async getCachedByKey<T>(key: string) {
    try {
      await this.connect();
      const redisJSONResult = await this.redis?.get(key) || '[]';
      return JSON.parse(redisJSONResult) as T;
    } catch(e) {
      this.logger.error((e as Error).message);
    }
  }

  public async storeDataInCache(key: string, data: any[]) {
    try {
      await this.connect();
      if(data.length > 0) {
        await this.redis?.set(key, JSON.stringify(data), {
          EX: 1000
        });
      }
    } catch(e) {
      this.logger.error((e as Error).message);
    }
  }
}

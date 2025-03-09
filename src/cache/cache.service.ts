import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async set(userId: number, token: string, ttl?: number) {
    await this.cacheManager.set(`token:${token}`, userId, ttl);
  }

  async get(token: string): Promise<string | null> {
    return await this.cacheManager.get(`token:${token}`);
  }

  async delete(token: string) {
    await this.cacheManager.del(`token:${token}`);
  }
}
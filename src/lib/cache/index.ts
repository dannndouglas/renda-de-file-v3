import RedisCache from './redis';

interface CacheOptions {
  ttlMinutes?: number;
  useRedis?: boolean;
}

class CacheManager {
  private static instance: CacheManager;
  private redis: RedisCache;
  private memoryCache: Map<string, { data: any; expires: number }> = new Map();

  private constructor() {
    this.redis = RedisCache.getInstance();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() > timestamp;
  }

  private cleanMemoryCache(): void {
    const now = Date.now();
    for (const [key, value] of this.memoryCache.entries()) {
      if (this.isExpired(value.expires)) {
        this.memoryCache.delete(key);
      }
    }
  }

  async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    const { useRedis = true } = options;

    // Tentar Redis primeiro se habilitado
    if (useRedis && this.redis.isEnabled()) {
      const redisValue = await this.redis.get<T>(key);
      if (redisValue !== null) {
        return redisValue;
      }
    }

    // Fallback para cache em memória
    this.cleanMemoryCache();
    const memoryValue = this.memoryCache.get(key);

    if (memoryValue && !this.isExpired(memoryValue.expires)) {
      return memoryValue.data as T;
    }

    return null;
  }

  async set(
    key: string,
    value: any,
    options: CacheOptions = {}
  ): Promise<boolean> {
    const { ttlMinutes = 30, useRedis = true } = options;
    const ttlSeconds = ttlMinutes * 60;

    let redisSuccess = false;
    let memorySuccess = false;

    // Salvar no Redis se habilitado
    if (useRedis && this.redis.isEnabled()) {
      redisSuccess = await this.redis.set(key, value, ttlSeconds);
    }

    // Sempre salvar no cache em memória como backup
    try {
      this.memoryCache.set(key, {
        data: value,
        expires: Date.now() + ttlSeconds * 1000,
      });
      memorySuccess = true;
    } catch (error) {
      console.error('Erro ao salvar no cache em memória:', error);
    }

    return redisSuccess || memorySuccess;
  }

  async del(key: string): Promise<boolean> {
    let redisSuccess = false;
    let memorySuccess = false;

    // Deletar do Redis
    if (this.redis.isEnabled()) {
      redisSuccess = await this.redis.del(key);
    }

    // Deletar do cache em memória
    memorySuccess = this.memoryCache.delete(key);

    return redisSuccess || memorySuccess;
  }

  async flush(): Promise<boolean> {
    let redisSuccess = false;
    let memorySuccess = false;

    // Limpar Redis
    if (this.redis.isEnabled()) {
      redisSuccess = await this.redis.flush();
    }

    // Limpar cache em memória
    try {
      this.memoryCache.clear();
      memorySuccess = true;
    } catch (error) {
      console.error('Erro ao limpar cache em memória:', error);
    }

    return redisSuccess || memorySuccess;
  }

  // Métodos específicos para o projeto
  async cacheProducts(products: any[], ttlMinutes = 30): Promise<void> {
    await this.set('products:all', products, { ttlMinutes });
  }

  async getCachedProducts(): Promise<any[] | null> {
    return await this.get('products:all');
  }

  async cacheProductsByCategory(
    category: string,
    products: any[],
    ttlMinutes = 30
  ): Promise<void> {
    await this.set(`products:category:${category}`, products, { ttlMinutes });
  }

  async getCachedProductsByCategory(category: string): Promise<any[] | null> {
    return await this.get(`products:category:${category}`);
  }

  async cacheAssociations(associations: any[], ttlMinutes = 60): Promise<void> {
    await this.set('associations:all', associations, { ttlMinutes });
  }

  async getCachedAssociations(): Promise<any[] | null> {
    return await this.get('associations:all');
  }

  async cacheNews(news: any[], ttlMinutes = 15): Promise<void> {
    await this.set('news:all', news, { ttlMinutes });
  }

  async getCachedNews(): Promise<any[] | null> {
    return await this.get('news:all');
  }

  async cacheEvents(events: any[], ttlMinutes = 15): Promise<void> {
    await this.set('events:all', events, { ttlMinutes });
  }

  async getCachedEvents(): Promise<any[] | null> {
    return await this.get('events:all');
  }

  async invalidateProductCache(): Promise<void> {
    const keys = ['products:all', 'products:featured'];

    for (const key of keys) {
      await this.del(key);
    }

    // Invalidar cache por categoria
    const categories = ['decoracao', 'vestuario', 'acessorios', 'casa'];
    for (const category of categories) {
      await this.del(`products:category:${category}`);
    }
  }

  async cacheWithFallback<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Tentar buscar do cache
    const cached = await this.get<T>(key, options);
    if (cached !== null) {
      return cached;
    }

    // Se não encontrou no cache, executar função e cachear resultado
    const data = await fetchFunction();
    await this.set(key, data, options);
    return data;
  }

  getStats(): { redis: boolean; memoryKeys: number } {
    return {
      redis: this.redis.isEnabled(),
      memoryKeys: this.memoryCache.size,
    };
  }
}

export default CacheManager;

import { Redis } from 'ioredis';

class RedisCache {
  private static instance: RedisCache;
  private client: Redis | null = null;
  private isConnected = false;

  private constructor() {
    this.connect();
  }

  static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  private connect() {
    try {
      const redisUrl = process.env.REDIS_URL;
      
      if (!redisUrl) {
        console.warn('REDIS_URL não configurado. Cache Redis desabilitado.');
        return;
      }

      this.client = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      });

      this.client.on('connect', () => {
        console.log('Redis conectado com sucesso');
        this.isConnected = true;
      });

      this.client.on('error', (error) => {
        console.error('Erro no Redis:', error);
        this.isConnected = false;
      });

      this.client.on('close', () => {
        console.log('Conexão Redis fechada');
        this.isConnected = false;
      });

    } catch (error) {
      console.error('Erro ao conectar Redis:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client || !this.isConnected) {
      return null;
    }

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao buscar do Redis:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      
      if (ttlSeconds) {
        await this.client.setex(key, ttlSeconds, serialized);
      } else {
        await this.client.set(key, serialized);
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar no Redis:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Erro ao deletar do Redis:', error);
      return false;
    }
  }

  async flush(): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      await this.client.flushall();
      return true;
    } catch (error) {
      console.error('Erro ao limpar Redis:', error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Erro ao verificar existência no Redis:', error);
      return false;
    }
  }

  async increment(key: string, by = 1): Promise<number> {
    if (!this.client || !this.isConnected) {
      return 0;
    }

    try {
      return await this.client.incrby(key, by);
    } catch (error) {
      console.error('Erro ao incrementar no Redis:', error);
      return 0;
    }
  }

  async setHash(key: string, hash: Record<string, any>): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }

    try {
      const serializedHash: Record<string, string> = {};
      for (const [field, value] of Object.entries(hash)) {
        serializedHash[field] = JSON.stringify(value);
      }
      
      await this.client.hmset(key, serializedHash);
      return true;
    } catch (error) {
      console.error('Erro ao salvar hash no Redis:', error);
      return false;
    }
  }

  async getHash(key: string): Promise<Record<string, any> | null> {
    if (!this.client || !this.isConnected) {
      return null;
    }

    try {
      const hash = await this.client.hgetall(key);
      if (Object.keys(hash).length === 0) {
        return null;
      }

      const deserializedHash: Record<string, any> = {};
      for (const [field, value] of Object.entries(hash)) {
        deserializedHash[field] = JSON.parse(value);
      }
      
      return deserializedHash;
    } catch (error) {
      console.error('Erro ao buscar hash do Redis:', error);
      return null;
    }
  }

  // Métodos específicos para o projeto
  async cacheProducts(products: any[], ttlMinutes = 30): Promise<void> {
    const key = 'products:all';
    await this.set(key, products, ttlMinutes * 60);
  }

  async getCachedProducts(): Promise<any[] | null> {
    return await this.get('products:all');
  }

  async cacheProductsByCategory(category: string, products: any[], ttlMinutes = 30): Promise<void> {
    const key = `products:category:${category}`;
    await this.set(key, products, ttlMinutes * 60);
  }

  async getCachedProductsByCategory(category: string): Promise<any[] | null> {
    const key = `products:category:${category}`;
    return await this.get(key);
  }

  async cacheAssociations(associations: any[], ttlMinutes = 60): Promise<void> {
    const key = 'associations:all';
    await this.set(key, associations, ttlMinutes * 60);
  }

  async getCachedAssociations(): Promise<any[] | null> {
    return await this.get('associations:all');
  }

  async cacheNews(news: any[], ttlMinutes = 15): Promise<void> {
    const key = 'news:all';
    await this.set(key, news, ttlMinutes * 60);
  }

  async getCachedNews(): Promise<any[] | null> {
    return await this.get('news:all');
  }

  async cacheEvents(events: any[], ttlMinutes = 15): Promise<void> {
    const key = 'events:all';
    await this.set(key, events, ttlMinutes * 60);
  }

  async getCachedEvents(): Promise<any[] | null> {
    return await this.get('events:all');
  }

  async invalidateProductCache(): Promise<void> {
    const keys = [
      'products:all',
      'products:featured',
    ];
    
    for (const key of keys) {
      await this.del(key);
    }

    // Invalidar cache por categoria
    const categories = ['decoracao', 'vestuario', 'acessorios', 'casa'];
    for (const category of categories) {
      await this.del(`products:category:${category}`);
    }
  }

  async trackAnalytics(event: string, data: any): Promise<void> {
    const key = `analytics:${event}:${new Date().toISOString().split('T')[0]}`;
    await this.increment(key);
    
    // Armazenar detalhes do evento
    const detailKey = `analytics:details:${event}:${Date.now()}`;
    await this.set(detailKey, data, 24 * 60 * 60); // 24 horas
  }

  isEnabled(): boolean {
    return this.isConnected && this.client !== null;
  }
}

export default RedisCache;
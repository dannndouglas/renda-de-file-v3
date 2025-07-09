import { NextRequest } from 'next/server';

// Interface para configuração do rate limiting
interface RateLimitConfig {
  windowMs: number; // janela de tempo em ms
  maxRequests: number; // máximo de requests na janela
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (request: NextRequest) => string;
}

// Armazenamento em memória para rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Limpar contadores expirados a cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now >= data.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function createRateLimit(config: RateLimitConfig) {
  const {
    windowMs,
    maxRequests,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = (request: NextRequest) => {
      // Gerar chave baseada em IP e User-Agent
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0] : 
                request.headers.get('x-real-ip') || 
                request.ip || 'unknown';
      
      const userAgent = request.headers.get('user-agent') || 'unknown';
      return `${ip}:${userAgent.slice(0, 50)}`;
    },
  } = config;

  return {
    check: (request: NextRequest): { success: boolean; remaining: number; resetTime: number } => {
      const key = keyGenerator(request);
      const now = Date.now();
      const resetTime = now + windowMs;

      let requestData = requestCounts.get(key);

      // Se não existe ou expirou, criar novo
      if (!requestData || now >= requestData.resetTime) {
        requestData = { count: 0, resetTime };
        requestCounts.set(key, requestData);
      }

      // Incrementar contador
      requestData.count++;

      const remaining = Math.max(0, maxRequests - requestData.count);
      const success = requestData.count <= maxRequests;

      return {
        success,
        remaining,
        resetTime: requestData.resetTime,
      };
    },

    // Middleware para ser usado em API routes
    middleware: async (
      request: NextRequest,
      handler: (req: NextRequest) => Promise<Response>
    ): Promise<Response> => {
      const result = this.check(request);

      // Headers de rate limiting
      const headers = new Headers({
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
      });

      if (!result.success) {
        return new Response(
          JSON.stringify({
            error: 'Rate limit exceeded',
            message: 'Too many requests, please try again later.',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
          }),
          {
            status: 429,
            headers: {
              ...headers,
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
            },
          }
        );
      }

      // Executar handler original
      const response = await handler(request);

      // Adicionar headers de rate limiting à resposta
      for (const [key, value] of headers.entries()) {
        response.headers.set(key, value);
      }

      return response;
    },
  };
}

// Rate limiters pré-configurados
export const apiRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 100, // 100 requests por IP por 15 minutos
});

export const contactRateLimit = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  maxRequests: 5, // 5 formulários por IP por hora
});

export const searchRateLimit = createRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  maxRequests: 30, // 30 buscas por minuto
});

export const whatsappRateLimit = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  maxRequests: 10, // 10 cliques WhatsApp por 5 minutos
});
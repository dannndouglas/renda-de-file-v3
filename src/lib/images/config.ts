/**
 * Configuração de otimização de imagens
 * Configurações para Next.js Image, Sanity e Supabase
 */

export const IMAGE_CONFIG = {
  // Tamanhos de dispositivos (responsive breakpoints)
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

  // Tamanhos de imagens para ícones e elementos pequenos
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  // Formatos de imagem suportados (ordem de preferência)
  formats: ['image/avif', 'image/webp', 'image/jpeg'] as const,

  // Qualidade padrão para diferentes contextos
  quality: {
    thumbnail: 60,
    card: 75,
    hero: 85,
    gallery: 90,
    print: 95,
  },

  // Tamanhos específicos para o projeto
  sizes: {
    thumbnail: { width: 150, height: 150 },
    card: { width: 400, height: 400 },
    hero: { width: 1200, height: 600 },
    gallery: { width: 800, height: 800 },
    association: { width: 200, height: 200 },
    avatar: { width: 64, height: 64 },
  },

  // Configurações de cache
  cache: {
    // Cache TTL em segundos (1 ano)
    ttl: 31536000,
    // Revalidação em segundos (1 semana)
    revalidate: 604800,
  },

  // Domínios permitidos para imagens
  domains: {
    sanity: 'cdn.sanity.io',
    supabase: '*.supabase.co',
  },

  // Configurações de placeholder
  placeholder: {
    // Cor de fundo padrão
    backgroundColor: '#f3f4f6',
    // Blur data URL base
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  },
} as const;

// Tipos derivados da configuração
export type ImageFormat = (typeof IMAGE_CONFIG.formats)[number];
export type ImageSize = keyof typeof IMAGE_CONFIG.sizes;
export type ImageQuality = keyof typeof IMAGE_CONFIG.quality;

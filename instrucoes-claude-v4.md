# Construir um Site Moderno para Renda de Filé - Artesanato Tradicional de Jaguaribe, CE

## Visão Geral do Projeto

Criar um site moderno, responsivo e escalável para mostrar e comercializar a Renda de Filé, artesanato tradicional de Jaguaribe, Ceará, Brasil. O site deve honrar a herança cultural enquanto proporciona uma experiência digital contemporânea com sistema de gestão de conteúdo flexível e alta performance.

## Requisitos Técnicos

### Stack Principal

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript (modo strict)
- **Estilização**: Tailwind CSS com design system customizado
- **Componentes UI**: shadcn/ui para componentes acessíveis e profissionais
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Armazenamento**: Supabase Storage para imagens
- **CMS Headless**: Sanity para gestão completa de conteúdo e administração
- **Busca**: Algolia ou MeiliSearch para busca avançada
- **Estado Global**: Zustand + TanStack Query
- **Autenticação**: NextAuth.js com Sanity como provider
- **CDN**: Cloudflare + otimização de imagens nativa
- **Cache**: Redis + ISR do Next.js
- **Monitoramento**: Sentry + Vercel Analytics
- **Deploy**: Vercel (frontend) + Supabase (backend)

### Estrutura do Projeto

```
src/
  app/
    (marketing)/
      page.tsx          # Página inicial
      historia/         # Seção de história
      associacoes/      # Associações
      catalogo/         # Catálogo de produtos
      produto/[id]/     # Página individual do produto
      noticias/         # Notícias e eventos
      contato/          # Contato
    (analytics)/
      analytics/        # Dashboard de métricas (protegido)
        page.tsx        # Visão geral
        whatsapp/       # Métricas WhatsApp
        produtos/       # Produtos mais vistos
    api/
      v1/
        produtos/       # API de produtos
        busca/          # API de busca
        auth/[...nextauth]/ # Autenticação
      webhooks/
        sanity/         # Webhooks do Sanity
    layout.tsx
    globals.css
    manifest.json       # PWA manifest
  components/
    ui/                 # Componentes shadcn/ui
    sections/           # Seções das páginas
    catalog/            # Componentes do catálogo
    common/             # Componentes compartilhados
    search/             # Componentes de busca
    whatsapp/           # Componentes WhatsApp
    pwa/                # Componentes PWA
  lib/
    supabase/          # Cliente Supabase e utilitários
    sanity/            # Cliente Sanity, queries e tipos
    auth/              # Configuração NextAuth
    algolia/           # Cliente de busca
    cache/             # Utilitários de cache
    utils/             # Funções auxiliares
    whatsapp/          # Utilitários WhatsApp
    constants/         # Constantes da aplicação
    images/            # Otimização de imagens
  stores/              # Stores Zustand
    useFilterStore.ts
    useSearchStore.ts
    useFavoritesStore.ts
  types/               # Definições TypeScript
  hooks/               # Hooks React customizados
  services/            # Serviços e integrações
prisma/
  schema.prisma        # Schema do banco de dados
sanity/
  schemas/             # Schemas do Sanity
    documents/         # Documentos principais
      produto.ts
      associacao.ts
      noticia.ts
      evento.ts
      configuracoes.ts
    objects/           # Objetos reutilizáveis
    singletons/        # Documentos únicos
  desk/               # Estrutura do Studio
  components/         # Componentes customizados
  plugins/            # Plugins do Sanity
public/
  images/             # Imagens estáticas
  icons/              # Ícones PWA
```

## Funcionalidades Principais

### 1. Página Inicial

- **Seção Hero**: Banner em largura total com imagens deslumbrantes da renda
  - Conteúdo gerenciado via Sanity CMS
  - Texto animado: "Renda de Filé de Jaguaribe - Tradição que Atravessa Gerações"
  - Indicador de rolagem suave
  - Botões de ação: "Conheça Nossa História" e "Veja o Catálogo"
  - Imagens otimizadas com next/image e blur placeholder
- **Seção de Introdução**: Visão geral do artesanato
  - Layout dividido com texto e imagem
  - Título: "A Arte Que Define Jaguaribe"
  - Ênfase na herança cultural e tradição artesanal
  - Conteúdo editável via Sanity
- **Produtos em Destaque**: Carrossel mostrando as melhores peças
  - Título da seção: "Peças em Destaque"
  - Imagens com lazy loading e zoom ao passar o mouse
  - Funcionalidade de visualização rápida
  - Exibição de preço: "A partir de R$ XX,XX"
  - Informação da associação: "Associação [Nome]"
  - Badge de disponibilidade: "Disponível" ou "Sob Encomenda"
  - Botão "Conversar no WhatsApp"
- **Impacto Cultural**: Estatísticas e conquistas
  - "300+ anos de tradição"
  - "500+ artesãs ativas"
  - "Patrimônio Cultural Imaterial"
  - "Exportação para 5 continentes"
  - Dados atualizáveis via Sanity

### 2. Página de História (/historia)

- **Componente de Linha do Tempo**: Timeline histórica interativa
  - Marcos principais do século XVII até o presente
  - Efeitos hover revelando informações detalhadas
  - Conteúdo gerenciado via Sanity
- **Seção de Patrimônio**: Mergulho profundo nas origens
  - Conexão com tradições egípcias e europeias
  - Chegada ao Brasil e a Jaguaribe
  - Evolução das técnicas
- **Galeria de Fotos**: Imagens históricas
  - Comparações antes/depois com slider
  - Funcionalidade lightbox
  - Legendas com contexto histórico
  - Upload e gestão via Sanity

### 3. Página de Associações (/associacoes)

- **Diretório de Associações**: Layout em grade de todas as associações
  - Logo/foto de cada associação
  - Informações de contato
  - Número de membros
  - Especialidades
  - Dados sincronizados com Sanity
- **Páginas Individuais das Associações**: Perfis detalhados
  - História e fundação
  - Equipe de liderança
  - Produtos especializados
  - Informações sobre como se associar
  - Galeria de produtos da associação

### 4. Catálogo de Produtos (/catalogo)

- **Sistema de Busca Avançado**: Powered by Algolia/MeiliSearch
  - Busca instantânea com sugestões
  - Correção ortográfica automática
  - Busca por voz (opcional)
  - Analytics de busca integrado

- **Sistema de Filtros**: Opções avançadas de filtragem
  - **Disponibilidade**: Disponível, Sob Encomenda
  - Categoria: Decoração, Vestuário, Religioso, Bebê, Acessórios, Personalizado
  - Faixa de preço: slider com valores em R$
  - Tamanho: Pequeno, Médio, Grande, Sob medida
  - Cor: Branco, Cru, Colorido
  - Tempo de produção: Pronta entrega, 7 dias, 15 dias, 30 dias
  - Associação: Filtro por associação específica
  - Estado dos filtros mantido via Zustand
- **Grade de Produtos**: Layout masonry responsivo
  - Lazy loading com intersection observer
  - Virtual scrolling para grandes listas
  - Badge de disponibilidade em cada card
  - Botão com ícone do WhatsApp: "Consultar"
  - Ícone de coração "Salvar nos Favoritos"
  - Imagens otimizadas automaticamente
- **Modal de Detalhes do Produto**: Informações ricas do produto
  - Galeria de imagens com zoom
  - Descrição detalhada
  - "Associação: [Nome]" com link para perfil
  - Badge "Personalização disponível"
  - **Indicador de Disponibilidade**:
    - Verde: "Produto Disponível - Pronta Entrega"
    - Laranja: "Sob Encomenda - Consulte Prazo"
  - **Botão de Ação WhatsApp**:
    - Texto dinâmico baseado na disponibilidade
    - Produtos disponíveis: "Comprar via WhatsApp"
    - Produtos sob encomenda: "Encomendar via WhatsApp"
    - Ao clicar, abre WhatsApp com mensagem pré-formatada
  - Seção "Produtos Relacionados"

### 5. Página Individual do Produto (/produto/[id])

- **Layout Detalhado**:
  - Galeria de imagens em alta resolução
  - Zoom on hover
  - Otimização automática de imagens
- **Informações do Produto**:
  - Nome e descrição completa
  - Especificações técnicas
  - Materiais utilizados
  - Cuidados e manutenção
  - História da peça (quando relevante)
  - Preço sugerido ou faixa de preço
- **Status de Disponibilidade Destacado**:
  - Banner visual indicando status
  - Mensagem clara sobre disponibilidade
- **Integração WhatsApp via Link Direto**:
  - **Botão Principal de Contato**:
    - Ícone do WhatsApp + texto dinâmico
    - Se disponível: "💬 Comprar via WhatsApp"
    - Se sob encomenda: "💬 Encomendar via WhatsApp"
  - **Mensagem Pré-formatada**:

    ```
    Olá! Vi o produto [Nome do Produto] no site da Renda de Filé.

    Código: [ID]
    Associação: [Nome da Associação]
    Status: [Disponível/Sob Encomenda]

    Gostaria de mais informações sobre este produto.
    ```

  - **Link Dinâmico**: Abre WhatsApp da associação responsável

- **Seção Social**:
  - Botões de compartilhamento em redes sociais
  - Produtos similares da mesma associação
  - Galeria "Quem comprou também viu"

### 6. Notícias e Eventos (/noticias)

- **Sistema de Blog**: Gerenciamento via Sanity
  - Editor visual no Sanity Studio
  - Categorias e tags
  - Artigos relacionados
  - Compartilhamento social
  - RSS feed
- **Calendário de Eventos**: Calendário interativo
  - Destaques do Festival da Renda de Filé
  - Agendas de workshops
  - Filtro por tipo de evento
  - Links de inscrição
  - Sincronização com Google Calendar

### 7. Página de Contato (/contato)

- **Contato Multicanal**: Vários métodos de contato
  - Formulário de contato com validação
    - Campos: Nome, Email, Telefone, Assunto, Mensagem
    - Mensagem de sucesso: "Mensagem enviada com sucesso!"
  - Link WhatsApp direto
    - Botão: "Fale Conosco pelo WhatsApp"
  - Mapa de localização (embed Google Maps)
    - Endereço: "Jaguaribe, Ceará, Brasil"
  - Exibição de horário comercial
    - "Horário de Funcionamento: Segunda a Sexta, 8h às 17h"
- **Sistema de Consultas**: Consultas específicas de produtos
  - Link direto para WhatsApp com produto pré-selecionado
  - Opção de enviar foto de referência via WhatsApp
  - QR Code para facilitar acesso mobile

### 8. Dashboard de Analytics (/analytics) - Protegido por autenticação

- **Visão Geral**: Métricas principais do negócio
  - Total de visualizações
  - Produtos mais vistos
  - Taxa de cliques WhatsApp
  - Horários de pico
- **Métricas WhatsApp**: Análise de conversões
  - Taxa de conversão por produto
  - Associações mais procuradas
  - Tipos de consulta (compra vs encomenda)
  - Gráficos temporais
- **Relatórios**: Exportação de dados
  - Exportar para Excel/CSV
  - Filtros por período
  - Comparações mensais

## Sistema de Gestão de Conteúdo (Sanity CMS)

### Configuração do Sanity Studio

O Sanity Studio será a interface administrativa completa para gestão de conteúdo, eliminando a necessidade de um dashboard customizado.

```typescript
// sanity/schemas/documents/produto.ts
export default defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'nome',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imagens',
      title: 'Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma imagem'),
    },
    {
      name: 'associacao',
      title: 'Associação',
      type: 'reference',
      to: [{ type: 'associacao' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'disponibilidade',
      title: 'Disponibilidade',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'disponivel' },
          { title: 'Sob Encomenda', value: 'sob-encomenda' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    // ... outros campos
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'associacao.nome',
      media: 'imagens.0',
    },
  },
});
```

### Sistema de Permissões no Sanity

```typescript
// sanity/desk/structure.ts
export const structure = (S, context) => {
  const { currentUser } = context;

  return S.list()
    .title('Conteúdo')
    .items([
      // Admin vê tudo
      ...(currentUser.roles.find((r) => r.name === 'administrator')
        ? [
            S.listItem()
              .title('Configurações')
              .icon(CogIcon)
              .child(
                S.document().schemaType('configuracoes').documentId('global')
              ),
            S.divider(),
          ]
        : []),

      // Todos veem produtos
      S.listItem()
        .title('Produtos')
        .icon(PackageIcon)
        .child(
          S.documentList()
            .title('Produtos')
            .filter('_type == "produto"')
            // Filtro por associação se necessário
            .filter(
              currentUser.roles.find((r) => r.name === 'associacao')
                ? '_type == "produto" && associacao._ref == $associacaoId'
                : '_type == "produto"'
            )
            .params({ associacaoId: currentUser.associacaoId })
        ),

      // ... outros itens do menu
    ]);
};
```

### Tipos de Usuários no Sanity

1. **Administrador**: Acesso total ao sistema
2. **Editor**: Gerencia todo conteúdo público
3. **Associação**: Gerencia apenas produtos da sua associação

## Sistema de Autenticação

### Configuração do NextAuth.js

```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { sanityClient } from '@/lib/sanity/client';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        // Verificar credenciais no Sanity
        const user = await sanityClient.fetch(
          `*[_type == "usuario" && email == $email][0]`,
          { email: credentials?.email }
        );

        if (
          user &&
          (await verifyPassword(credentials?.password, user.password))
        ) {
          return {
            id: user._id,
            email: user.email,
            name: user.nome,
            role: user.papel,
            associacaoId: user.associacao?._ref,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.associacaoId = user.associacaoId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.associacaoId = token.associacaoId;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
};
```

### Middleware de Proteção

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Proteger rotas de analytics
      if (req.nextUrl.pathname.startsWith('/analytics')) {
        return token?.role === 'admin' || token?.role === 'editor';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/analytics/:path*'],
};
```

## PWA (Progressive Web App)

### Configuração do PWA

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest.json$/],
  scope: '/',
  sw: 'service-worker.js',
});

module.exports = withPWA({
  // outras configurações do Next.js
});
```

### Manifest.json

```json
{
  "name": "Renda de Filé de Jaguaribe",
  "short_name": "Renda de Filé",
  "description": "Artesanato tradicional de Jaguaribe, Ceará",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#8B4513",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Componente de Instalação PWA

```typescript
// components/pwa/InstallPrompt.tsx
export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA instalado com sucesso');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <p className="text-sm mb-2">Instale nosso app para acesso rápido!</p>
      <div className="flex gap-2">
        <Button onClick={handleInstall} size="sm">
          Instalar
        </Button>
        <Button onClick={() => setShowPrompt(false)} variant="outline" size="sm">
          Agora não
        </Button>
      </div>
    </div>
  );
}
```

## Sistema de Otimização de Imagens

### Configuração de Otimização

```typescript
// lib/images/optimization.ts
export const imageOptimizationConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 ano
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};

// Componente de imagem otimizada
export function OptimizedImage({
  src,
  alt,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        priority={priority}
        quality={85}
        placeholder="blur"
        blurDataURL={generateBlurDataURL(src)}
        onLoadingComplete={() => setLoading(false)}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
        )}
        {...props}
      />
    </div>
  );
}
```

### Pipeline de Processamento no Upload

```typescript
// sanity/plugins/image-optimization.ts
export const imageOptimizationPlugin = definePlugin({
  name: 'image-optimization',
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'produto') {
        return [...prev, OptimizeImagesAction];
      }
      return prev;
    },
  },
});

// Ação para otimizar imagens automaticamente
function OptimizeImagesAction(props) {
  return {
    label: 'Otimizar Imagens',
    onHandle: async () => {
      const images = props.draft?.imagens || [];

      for (const image of images) {
        await processImage(image, {
          sizes: [400, 800, 1200],
          formats: ['webp', 'avif'],
          quality: 85,
        });
      }
    },
  };
}
```

## Sistema de Busca Avançado

### Implementação com Algolia/MeiliSearch

```typescript
// Índices de busca
- Produtos (principal)
- Associações
- Notícias/Blog
- FAQ

// Features
- Busca instantânea
- Filtros facetados
- Ranking personalizado
- Sinônimos configuráveis
- Analytics de busca
```

### Integração no Frontend

```typescript
// Componentes de busca
- SearchBar global
- SearchResults com highlighting
- SearchFilters dinâmicos
- SearchAnalytics dashboard
```

## Gestão de Estado Global

### Stores Zustand

```typescript
// useFavoritesStore
- Produtos favoritos
- Sincronização com localStorage
- Contador de favoritos

// useFilterStore
- Filtros ativos
- Ordenação
- View mode (grid/list)
- Persistência de preferências

// useSearchStore
- Query atual
- Resultados
- Sugestões
- Histórico de busca

// useWhatsAppStore
- Formatação de mensagens
- Tracking de cliques
- Analytics de conversão
```

### TanStack Query

```typescript
// Queries
- Produtos (com cache)
- Associações
- Notícias
- Eventos

// Mutations
- Adicionar aos favoritos
- Registrar interesse
- Enviar formulário de contato
```

## Estratégia de CDN e Cache

### CDN Configuration

```typescript
// Cloudflare + Next.js Image Optimization
- Assets estáticos
- Imagens otimizadas automaticamente
- API responses cache
- Edge locations BR

// Headers de cache
- Imagens: 1 ano
- CSS/JS: 6 meses
- API: variável por endpoint
```

### Cache Strategy

```typescript
// Redis
- Session data
- Carrinho temporário
- Resultados de busca
- Rate limiting

// Next.js ISR
- Páginas de produtos: 60s
- Home: 300s
- Catálogo: 120s
- On-demand revalidation via Sanity webhooks
```

### Edge Caching

```typescript
// Vercel Edge Functions
- Geolocalização
- A/B testing
- Personalização
- Request coalescing
```

## Sistema de Monitoramento

### Error Tracking (Sentry)

```typescript
// Configuração
- Source maps
- User context
- Custom tags
- Performance monitoring
- Release tracking
```

### Analytics

```typescript
// Vercel Analytics
- Web Vitals
- Custom events
- Tracking de cliques no WhatsApp
- Produtos mais visualizados

// WhatsApp Analytics
- Taxa de cliques por produto
- Horários de maior conversão
- Produtos mais consultados
- Associações mais procuradas
```

### Logs Estruturados

```typescript
// Winston/Pino
- API requests
- Errors detalhados
- User actions
- Performance metrics
```

## Requisitos de Design

### Identidade Visual

- **Paleta de Cores**:
  - Primária: Tons terrosos quentes refletindo a paisagem do Ceará
  - Secundária: Pastéis suaves inspirados nos padrões da renda
  - Destaque: Tons de joias ricos para CTAs
  - Neutro: Off-white e cinzas claros
  - Status: Verde (disponível), Laranja (sob encomenda), Vermelho (indisponível)
- **Tipografia**:
  - Títulos: Fonte serif elegante (Playfair Display ou similar)
  - Corpo: Sans-serif limpa (Inter ou similar)
  - Especial: Fonte script para elementos decorativos

### Princípios UI/UX

- **Mobile-First**: Otimizado para smartphones (público principal)
- **Acessibilidade**: Conformidade WCAG 2.1 AA
- **Performance**: Lighthouse score > 90
- **Animações**: Micro-interações sutis e significativas
  - Framer Motion para transições de página
  - Efeitos hover em elementos interativos
  - Skeletons de carregamento para melhor performance percebida

### Design de Componentes

- **Cards**: Elevados com sombras sutis
- **Botões**: Cantos arredondados com estados hover
- **Imagens**: Lazy loading com efeito blur-up
- **Navegação**: Header fixo com efeito transparente-para-sólido ao rolar
- **Badges**: Indicadores visuais claros para status

## Schema do Banco de Dados

```prisma
model Usuario {
  id            String       @id @default(cuid())
  email         String       @unique
  nome          String
  papel         PapelUsuario @default(EDITOR)
  associacaoId  String?
  sanityUserId  String?      @unique // Link com usuário do Sanity
  ativo         Boolean      @default(true)
  criadoEm      DateTime     @default(now())
  atualizadoEm  DateTime     @updatedAt
}

model Produto {
  id              String          @id @default(cuid())
  nome            String
  slug            String          @unique
  descricao       String          @db.Text
  descricaoBreve  String
  categoria       Categoria
  preco           Decimal?        @db.Decimal(10, 2)
  precoPromocional Decimal?       @db.Decimal(10, 2)
  imagens         String[]
  imagemPrincipal String
  disponibilidade Disponibilidade @default(DISPONIVEL)
  tempoProducao   Int?            // em dias
  destaque        Boolean         @default(false)
  personalizavel  Boolean         @default(false)
  associacaoId    String
  associacao      Associacao      @relation(fields: [associacaoId], references: [id])
  favoritos       Favorito[]
  consultas       ConsultaWhatsApp[]
  tags            String[]
  metaTitle       String?
  metaDescription String?
  sanityId        String?         @unique // Referência ao documento no Sanity
  criadoEm        DateTime        @default(now())
  atualizadoEm    DateTime        @updatedAt

  @@index([categoria, disponibilidade])
  @@index([associacaoId])
  @@fulltext([nome, descricao])
}

model Associacao {
  id           String     @id @default(cuid())
  nome         String
  slug         String     @unique
  descricao    String     @db.Text
  historia     String?    @db.Text
  logo         String?
  banner       String?
  endereco     String
  cidade       String     @default("Jaguaribe")
  estado       String     @default("CE")
  cep          String?
  telefone     String
  email        String?
  whatsapp     String?
  instagram    String?
  facebook     String?
  website      String?
  numeroMembros Int?
  especialidades String[]
  produtos     Produto[]
  ativo        Boolean    @default(true)
  sanityId     String?    @unique // Referência ao documento no Sanity
  criadoEm     DateTime   @default(now())
  atualizadoEm DateTime   @updatedAt
}

model Favorito {
  id        String   @id @default(cuid())
  sessionId String   // ID da sessão do navegador
  produtoId String
  produto   Produto  @relation(fields: [produtoId], references: [id])
  criadoEm  DateTime @default(now())

  @@unique([sessionId, produtoId])
  @@index([sessionId])
}

model ConsultaWhatsApp {
  id          String   @id @default(cuid())
  sessionId   String   // ID da sessão do navegador
  produtoId   String
  produto     Produto  @relation(fields: [produtoId], references: [id])
  tipo        TipoConsulta @default(COMPRA)
  origem      String?  // página de origem do clique
  criadoEm    DateTime @default(now())

  @@index([produtoId])
  @@index([criadoEm])
}

model FormularioContato {
  id          String   @id @default(cuid())
  nome        String
  email       String
  telefone    String?
  assunto     String
  mensagem    String   @db.Text
  respondido  Boolean  @default(false)
  criadoEm    DateTime @default(now())
}

model MetricaAcesso {
  id          String   @id @default(cuid())
  sessionId   String
  pagina      String
  produtoId   String?
  produto     Produto? @relation(fields: [produtoId], references: [id])
  userAgent   String?
  referer     String?
  criadoEm    DateTime @default(now())

  @@index([produtoId])
  @@index([criadoEm])
  @@index([pagina])
}

// Enums
enum PapelUsuario {
  ADMIN
  EDITOR
  ASSOCIACAO
}

enum Categoria {
  DECORACAO
  VESTUARIO
  RELIGIOSO
  BEBE
  ACESSORIOS
  PERSONALIZADO
}

enum Disponibilidade {
  DISPONIVEL
  SOB_ENCOMENDA
}

enum TipoConsulta {
  COMPRA
  ENCOMENDA
  DUVIDA
  ORCAMENTO
}
```

## Integração WhatsApp (Link Direto)

### Configuração de Links WhatsApp

```typescript
// lib/whatsapp/utils.ts
export function gerarLinkWhatsApp(produto: Produto, associacao: Associacao) {
  const numero = associacao.whatsapp?.replace(/\D/g, '');

  if (!numero) {
    console.error('Associação sem número de WhatsApp:', associacao.nome);
    return null;
  }

  const mensagem = `Olá! Vi o produto "${produto.nome}" no site da Renda de Filé.

📦 Código: ${produto.id}
🏪 Associação: ${associacao.nome}
✅ Status: ${produto.disponibilidade === 'DISPONIVEL' ? 'Disponível' : 'Sob Encomenda'}
💰 Valor: ${produto.preco ? `R$ ${produto.preco}` : 'Consultar'}

Gostaria de mais informações sobre este produto.`;

  const mensagemCodificada = encodeURIComponent(mensagem);
  return `https://wa.me/55${numero}?text=${mensagemCodificada}`;
}

// Tracking de cliques (analytics)
export async function trackWhatsAppClick(
  produtoId: string,
  tipo: TipoConsulta
) {
  try {
    await api.post('/api/v1/consultas-whatsapp', {
      produtoId,
      tipo,
      sessionId: getSessionId(),
      origem: window.location.pathname,
    });
  } catch (error) {
    console.error('Erro ao registrar clique WhatsApp:', error);
  }
}
```

### Componente WhatsApp Button

```typescript
// components/whatsapp/WhatsAppButton.tsx
interface WhatsAppButtonProps {
  produto: Produto;
  associacao: Associacao;
  variant?: 'disponivel' | 'sob-encomenda';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackingEnabled?: boolean;
}

export function WhatsAppButton({
  produto,
  associacao,
  variant,
  size = 'md',
  className,
  trackingEnabled = true
}: WhatsAppButtonProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (trackingEnabled) {
      await trackWhatsAppClick(
        produto.id,
        variant === 'disponivel' ? 'COMPRA' : 'ENCOMENDA'
      );
    }

    const link = gerarLinkWhatsApp(produto, associacao);
    if (link) {
      window.open(link, '_blank');
    }
  };

  const texto = variant === 'disponivel'
    ? 'Comprar via WhatsApp'
    : 'Encomendar via WhatsApp';

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={cn(
        'gap-2',
        variant === 'disponivel' ? 'bg-green-600' : 'bg-orange-600',
        className
      )}
    >
      <WhatsAppIcon className="w-5 h-5" />
      {texto}
    </Button>
  );
}
```

### QR Code para Mobile

```typescript
// components/whatsapp/WhatsAppQRCode.tsx
export function WhatsAppQRCode({ produto, associacao, size = 200 }) {
  const link = gerarLinkWhatsApp(produto, associacao);

  if (!link) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeSVG value={link} size={size} />
      <p className="text-sm text-muted-foreground">
        Escaneie para conversar no WhatsApp
      </p>
    </div>
  );
}
```

## Webhooks e Sincronização

### Webhook Handler para Sanity

```typescript
// app/api/webhooks/sanity/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const signature = headers().get(SIGNATURE_HEADER_NAME);
  const body = await req.text();

  if (!isValidSignature(body, signature!, secret)) {
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const { _type, _id, operation } = JSON.parse(body);

    // Revalidar cache baseado no tipo de documento
    switch (_type) {
      case 'produto':
        revalidatePath('/catalogo');
        revalidatePath(`/produto/${_id}`);
        revalidateTag('produtos');

        // Atualizar índice de busca
        if (operation !== 'delete') {
          await updateSearchIndex('produto', _id);
        }
        break;

      case 'associacao':
        revalidatePath('/associacoes');
        revalidateTag('associacoes');
        break;

      case 'noticia':
        revalidatePath('/noticias');
        revalidateTag('noticias');
        break;

      case 'configuracoes':
        revalidateTag('configuracoes');
        break;
    }

    return new Response('Success', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook handler failed', { status: 500 });
  }
}

// Atualizar índice de busca
async function updateSearchIndex(type: string, id: string) {
  // Buscar dados atualizados do Sanity
  const documento = await sanityClient.fetch(
    `*[_type == $type && _id == $id][0]`,
    { type, id }
  );

  if (documento) {
    // Atualizar no Algolia/MeiliSearch
    await searchClient.saveObject({
      objectID: id,
      ...documento,
    });
  }
}
```

## Diretrizes de Implementação

### Otimização de Performance

- Usar o componente Image do Next.js para todas as imagens
- Implementar estratégias adequadas de cache
- Code-splitting para componentes pesados
- Otimizar tamanho do bundle com tree-shaking
- Usar imports dinâmicos para recursos não críticos
- Implementar virtual scrolling para listas grandes
- Service Worker para cache offline via PWA
- Otimização automática de imagens no upload

### SEO e Marketing

- Implementar dados estruturados (JSON-LD)
- Meta tags com suporte Open Graph
- Geração de sitemap dinâmico
- Configuração de robots.txt
- Integração com Google Analytics 4
- Rich snippets para produtos
- Breadcrumbs estruturados

### Segurança

- Validação de input com Zod
- Proteção CSRF
- Rate limiting em formulários
- Configuração de headers seguros
- Gerenciamento de variáveis de ambiente
- Sanitização de conteúdo do CMS
- Autenticação segura com NextAuth.js

### Preparação para Internacionalização

- Estruturar código para suporte futuro de i18n
- Usar chaves de tradução ao invés de strings hardcoded
- Utilitários de formatação de moeda
- Localização de data/hora
- URLs amigáveis para SEO multilíngue

### Estratégia de Testes

- Testes unitários para utilitários
- Testes de integração para rotas de API
- Testes E2E para caminhos críticos do usuário
- Testes de acessibilidade
- Monitoramento de performance
- Testes de carga para Black Friday

## Diretrizes de Conteúdo

### Linguagem e Localização

- **Idioma Principal**: Português Brasileiro (pt-BR)
- **Todo texto da UI, conteúdo e mensagens devem estar em português**
- **Comentários de código e nomes de variáveis**: Inglês (padrão da indústria)

### Tom de Voz

- Respeitoso com a tradição
- Caloroso e acolhedor
- Educacional mas acessível
- Orgulho da herança cultural

### Mensagens-Chave

- "Tradição de mais de três séculos"
- "Feito à mão com amor e dedicação"
- "Apoiando nossas artesãs locais"
- "Patrimônio Cultural Imaterial"
- "Sustentável e ético"

## Fases de Desenvolvimento

### Fase 1: Fundação e Alta Prioridade

1. Setup do projeto com Next.js 14 e TypeScript
2. Configurar Tailwind CSS e shadcn/ui
3. Configurar Supabase e Prisma
4. **Setup completo do Sanity CMS com estrutura administrativa**
5. **Implementar sistema de autenticação com NextAuth.js**
6. **Configurar PWA básico com manifest e service worker**
7. **Sistema de otimização de imagens**
8. Configurar sistema de busca (Algolia/MeiliSearch)
9. Implementar stores Zustand e TanStack Query
10. Criar layout básico e navegação
11. Implementar design system responsivo

### Fase 2: Páginas Principais e Integração

1. **Configurar webhooks Sanity para revalidação de cache**
2. **Implementar páginas protegidas de analytics**
3. Integrar CMS com todas as páginas públicas
4. Construir página inicial com conteúdo dinâmico
5. Criar página de história com timeline do CMS
6. Implementar diretório de associações sincronizado
7. Catálogo com busca avançada e filtros
8. Sistema de disponibilidade de produtos
9. Formulário de contato integrado

### Fase 3: Funcionalidades Avançadas

1. Sistema de favoritos (sem necessidade de login)
2. Integração de links WhatsApp para cada associação
3. Sistema de notícias/blog via CMS
4. Calendário de eventos dinâmico
5. Analytics de conversão WhatsApp
6. **Notificações push via PWA**
7. Sistema de newsletters

### Fase 4: Otimização e Performance

1. Configurar CDN e estratégias de cache avançadas
2. Implementar Redis para cache
3. **Otimização avançada de imagens com múltiplos formatos**
4. Setup completo de monitoramento
5. Testes de carga e otimização
6. **Melhorias de PWA (offline completo)**

### Fase 5: Polimento e Lançamento

1. Refinamento de UI/UX
2. Implementação completa de SEO
3. Setup de analytics avançado
4. Hardening de segurança
5. Documentação completa
6. **Treinamento para uso do Sanity Studio**
7. Deploy em produção

## Começar a Construir

Comece com o setup fundamental, focando em criar uma arquitetura sólida e escalável. As prioridades de alta importância são:

1. **Sanity CMS como centro administrativo** - elimina necessidade de dashboard customizado
2. **Sistema de autenticação robusto** - protege áreas administrativas
3. **PWA desde o início** - melhora experiência mobile significativamente
4. **Otimização de imagens nativa** - performance superior sem complexidade extra

O Sanity Studio será customizado para oferecer uma experiência administrativa completa, com diferentes níveis de acesso para administradores, editores e associações. Isso simplifica drasticamente o desenvolvimento e manutenção.

A integração com WhatsApp continuará sendo feita através de links diretos, garantindo simplicidade e eficiência. O sistema de analytics focará apenas em métricas de negócio que o Sanity não cobre nativamente.

Lembre-se: Este site representa não apenas produtos, mas séculos de patrimônio cultural. Cada decisão de design deve honrar as artesãs e seu artesanato, enquanto proporciona uma experiência digital de classe mundial com a flexibilidade e escalabilidade necessárias para crescer com o negócio.

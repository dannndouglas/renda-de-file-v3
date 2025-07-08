# Guia de Setup - Site Renda de Filé v3

## 📋 Pré-requisitos

### Software Necessário

- **Node.js** >= 18.17.0 (recomendado: v20+)
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0 ou **pnpm** >= 8.0.0
- **Git** >= 2.30.0
- **PostgreSQL** >= 14.0 (local ou remoto)

### Contas e Serviços

- [Vercel](https://vercel.com) - Deploy do frontend
- [Supabase](https://supabase.com) - Banco PostgreSQL e Storage
- [Sanity](https://sanity.io) - CMS Headless
- [Algolia](https://algolia.com) - Busca (ou MeiliSearch)
- [Google Console](https://console.cloud.google.com) - OAuth
- [Sentry](https://sentry.io) - Monitoramento de erros

## 🚀 Setup Inicial do Projeto

### 1. Criação do Projeto Next.js

```bash
# Criar projeto Next.js 14 com TypeScript
npx create-next-app@latest renda-de-file-v3 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navegar para o diretório
cd renda-de-file-v3

# Instalar dependências adicionais
npm install @supabase/supabase-js @prisma/client prisma next-auth @auth/prisma-adapter zustand @tanstack/react-query @tanstack/react-query-devtools framer-motion lucide-react class-variance-authority clsx tailwind-merge react-hook-form @hookform/resolvers zod sonner next-themes

# Dependências de desenvolvimento
npm install -D @types/node typescript eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

### 2. Configuração do Tailwind CSS e shadcn/ui

```bash
# Inicializar shadcn/ui
npx shadcn-ui@latest init

# Instalar componentes essenciais
npx shadcn-ui@latest add button card input label form dialog sheet tabs badge avatar separator scroll-area select checkbox textarea alert
```

### 3. Setup do Prisma

```bash
# Inicializar Prisma
npx prisma init

# Gerar cliente após configurar schema
npx prisma generate

# Aplicar migrações (após configurar banco)
npx prisma db push

# Abrir Prisma Studio (opcional)
npx prisma studio
```

### 4. Setup do Sanity CMS

```bash
# Instalar Sanity CLI globalmente
npm install -g @sanity/cli

# Inicializar projeto Sanity
sanity init

# Instalar dependências do Sanity para Next.js
npm install @sanity/client @sanity/image-url next-sanity @sanity/webhook

# Instalar plugins úteis
npm install @sanity/vision @sanity/document-internationalization
```

## 🔧 Configuração de Ambiente

### Arquivo .env.local

```bash
# ========================================
# NEXT.JS & NEXTAUTH
# ========================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-super-forte-aqui

# ========================================
# SUPABASE
# ========================================
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# URL do banco PostgreSQL (Supabase ou local)
DATABASE_URL="postgresql://postgres:senha@localhost:5432/renda_de_file"

# ========================================
# SANITY CMS
# ========================================
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-api-token-com-write-permissions
SANITY_WEBHOOK_SECRET=webhook-secret-para-revalidacao

# ========================================
# GOOGLE OAUTH
# ========================================
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret

# ========================================
# ALGOLIA (BUSCA)
# ========================================
NEXT_PUBLIC_ALGOLIA_APP_ID=seu-app-id
ALGOLIA_ADMIN_API_KEY=sua-admin-key
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=sua-search-key

# ========================================
# ANALYTICS & MONITORAMENTO
# ========================================
NEXT_PUBLIC_GA_TRACKING_ID=GA4-TRACKING-ID
SENTRY_DSN=https://sua-sentry-dsn
NEXT_PUBLIC_VERCEL_URL=$VERCEL_URL

# ========================================
# REDIS (OPCIONAL)
# ========================================
REDIS_URL=redis://localhost:6379

# ========================================
# DESENVOLVIMENTO
# ========================================
NODE_ENV=development
```

### Arquivo .env.example

```bash
# Copiar e renomear para .env.local
cp .env.example .env.local
```

## 📁 Estrutura de Pastas

```
src/
├── app/                          # App Router do Next.js
│   ├── (marketing)/             # Grupo de rotas públicas
│   │   ├── page.tsx            # Página inicial
│   │   ├── historia/           # História da renda
│   │   ├── associacoes/        # Associações
│   │   ├── catalogo/           # Catálogo de produtos
│   │   ├── produto/[id]/       # Página individual
│   │   ├── noticias/           # Blog/notícias
│   │   └── contato/            # Contato
│   ├── (analytics)/            # Grupo protegido
│   │   └── analytics/          # Dashboard analytics
│   ├── api/                    # API Routes
│   │   ├── v1/                # API v1
│   │   │   ├── produtos/      # CRUD produtos
│   │   │   └── busca/         # Busca
│   │   ├── auth/[...nextauth]/ # NextAuth
│   │   └── webhooks/          # Webhooks (Sanity)
│   ├── layout.tsx             # Layout global
│   ├── globals.css            # Estilos globais
│   └── manifest.json          # PWA manifest
├── components/                 # Componentes React
│   ├── ui/                    # shadcn/ui components
│   ├── sections/              # Seções das páginas
│   ├── catalog/               # Componentes do catálogo
│   ├── common/                # Componentes comuns
│   ├── search/                # Componentes de busca
│   ├── whatsapp/              # WhatsApp integration
│   └── pwa/                   # PWA components
├── lib/                       # Bibliotecas e utilitários
│   ├── supabase/             # Cliente Supabase
│   ├── sanity/               # Cliente Sanity + queries
│   ├── auth/                 # Configuração NextAuth
│   ├── algolia/              # Cliente busca
│   ├── cache/                # Utilitários cache
│   ├── utils/                # Funções auxiliares
│   ├── whatsapp/             # WhatsApp utils
│   ├── constants/            # Constantes
│   └── images/               # Otimização imagens
├── stores/                    # Zustand stores
│   ├── useFilterStore.ts
│   ├── useSearchStore.ts
│   └── useFavoritesStore.ts
├── types/                     # TypeScript definitions
├── hooks/                     # React hooks customizados
└── services/                  # Serviços e integrações

prisma/
├── schema.prisma             # Schema do banco
└── migrations/               # Migrações

sanity/
├── schemas/                  # Schemas do Sanity
│   ├── documents/           # Documentos principais
│   ├── objects/             # Objetos reutilizáveis
│   └── singletons/          # Documentos únicos
├── desk/                    # Estrutura do Studio
├── components/              # Componentes customizados
└── plugins/                 # Plugins do Sanity

public/
├── images/                  # Imagens estáticas
├── icons/                   # Ícones PWA
├── manifest.json           # PWA manifest
└── sw.js                   # Service Worker
```

## 🛠️ Scripts de Desenvolvimento

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "sanity:dev": "cd sanity && sanity dev",
    "sanity:build": "cd sanity && sanity build",
    "sanity:deploy": "cd sanity && sanity deploy",
    "test": "echo \"No tests yet\"",
    "prepare": "husky install"
  }
}
```

### Comandos Úteis do Dia a Dia

```bash
# Desenvolvimento
npm run dev                    # Iniciar dev server
npm run sanity:dev            # Iniciar Sanity Studio

# Banco de dados
npm run db:generate           # Gerar cliente Prisma
npm run db:push              # Aplicar mudanças no schema
npm run db:studio            # Abrir Prisma Studio

# Qualidade de código
npm run lint                 # Verificar ESLint
npm run type-check          # Verificar TypeScript
npm run format              # Formatar código

# Build e deploy
npm run build               # Build de produção
npm run start               # Rodar build local
npm run sanity:deploy       # Deploy do Sanity Studio
```

## 🔗 Setup de Serviços Externos

### 1. Supabase Setup

```bash
# Criar projeto no Supabase
# Configurar banco PostgreSQL
# Configurar Storage buckets
# Copiar URL e chaves para .env.local
```

### 2. Sanity Setup

```bash
# Criar projeto no Sanity
sanity init

# Configurar esquemas
# Configurar permissões
# Deploy do Studio
sanity deploy
```

### 3. Algolia Setup

```bash
# Criar conta no Algolia
# Criar índices:
# - produtos
# - associacoes
# - noticias
# Configurar settings e ranking
```

### 4. Google OAuth Setup

```bash
# Criar projeto no Google Console
# Configurar OAuth consent screen
# Criar credenciais OAuth 2.0
# Adicionar URLs autorizadas
```

## 🚀 Deploy em Produção

### Vercel Deploy

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard
# Configurar domínio customizado
```

### Configurações de Produção

```bash
# Variáveis de ambiente
# NEXTAUTH_URL=https://seu-dominio.com
# DATABASE_URL=postgresql://...
# Todas as outras vars de prod
```

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**

   ```bash
   # Verificar DATABASE_URL
   # Testar conexão com Prisma
   npx prisma db push
   ```

2. **Erro no Sanity**

   ```bash
   # Verificar project ID e dataset
   # Regenerar API token
   # Verificar cors origins
   ```

3. **Erro de autenticação**
   ```bash
   # Verificar NEXTAUTH_SECRET
   # Verificar URLs do Google OAuth
   ```

### Logs e Debug

```bash
# Next.js debug
DEBUG=* npm run dev

# Prisma debug
DEBUG="prisma:*" npm run dev

# Verificar variáveis de ambiente
printenv | grep NEXT
```

## 📚 Recursos Adicionais

### Documentação Oficial

- [Next.js 14](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Sanity](https://www.sanity.io/docs)
- [Supabase](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Ferramentas de Desenvolvimento

- [Prisma Studio](http://localhost:5555) - Interface do banco
- [Sanity Studio](http://localhost:3333) - CMS interface
- [Next.js Dev](http://localhost:3000) - Aplicação

### Monitoramento

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [Sanity Desk](https://www.sanity.io/manage)

---

**Última atualização:** 08/07/2025  
**Mantenedor:** Claude Development Team

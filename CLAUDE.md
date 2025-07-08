# Instruções para Desenvolvimento com Claude - Renda de Filé v3

## 🎯 Comandos Obrigatórios para Cada Sessão

### Antes de Fazer Commits
```bash
# SEMPRE executar antes de finalizar uma sessão
npm run lint        # Verificar ESLint
npm run type-check  # Verificar TypeScript
npm run format      # Formatar código
npm run build       # Testar build de produção
```

### Comandos de Desenvolvimento
```bash
# Iniciar ambiente de desenvolvimento
npm run dev         # Next.js dev server (porta 3000)
npm run sanity:dev  # Sanity Studio (porta 3333)
npm run db:studio   # Prisma Studio (porta 5555)

# Banco de dados
npm run db:generate # Regenerar cliente Prisma
npm run db:push     # Aplicar mudanças no schema
```

## 📁 Estrutura do Projeto e Convenções

### Organização de Arquivos
```
src/
├── app/              # App Router - roteamento e páginas
├── components/       # Componentes React reutilizáveis
├── lib/             # Utilitários, clientes e configurações
├── stores/          # Zustand stores para estado global
├── types/           # Definições TypeScript
├── hooks/           # Custom React hooks
└── services/        # Integrações com APIs externas
```

### Convenções de Nomenclatura
- **Arquivos de componentes:** PascalCase (`ProductCard.tsx`)
- **Arquivos de utilitários:** camelCase (`imageUtils.ts`)
- **Páginas:** lowercase (`page.tsx`, `layout.tsx`)
- **Constantes:** UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Tipos:** PascalCase com sufixo (`ProductType`, `UserProps`)

### Imports
```typescript
// Sempre usar paths absolutos
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/catalog/ProductCard"
import { supabase } from "@/lib/supabase/client"

// Ordem dos imports:
// 1. React e Next.js
// 2. Bibliotecas externas
// 3. Componentes internos
// 4. Utilitários e tipos
// 5. Estilos
```

## 🔧 Padrões de Desenvolvimento

### Componentes React
```typescript
// Template padrão para componentes
interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
  // outras props específicas
}

export function ComponentName({
  children,
  className,
  ...props
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {children}
    </div>
  );
}
```

### Páginas Next.js (App Router)
```typescript
// Template para páginas
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Título da Página',
  description: 'Descrição SEO da página',
};

export default function PageName() {
  return (
    <main>
      {/* Conteúdo da página */}
    </main>
  );
}
```

### API Routes
```typescript
// Template para API routes
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Lógica da API
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## 🗃️ Gestão de Estado

### Zustand Stores
```typescript
// Template para stores
interface StoreState {
  // estado
  items: Item[];
  loading: boolean;
  
  // ações
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  items: [],
  loading: false,
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  setLoading: (loading) => set({ loading }),
}));
```

### TanStack Query
```typescript
// Hooks para dados do servidor
export function useProducts() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const response = await fetch('/api/v1/produtos');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

## 🎨 Estilização com Tailwind

### Classes Utilitárias Principais
```css
/* Layout */
container mx-auto px-4
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
flex items-center justify-between
space-y-4 space-x-2

/* Responsividade */
hidden md:block
text-sm md:text-base lg:text-lg
p-2 md:p-4 lg:p-6

/* Estados */
hover:bg-gray-100 focus:ring-2 active:scale-95
transition-all duration-200 ease-in-out

/* Cores do projeto */
bg-amber-50 text-amber-900
bg-orange-500 hover:bg-orange-600
border-amber-200
```

### Componentes shadcn/ui
```typescript
// Sempre usar os componentes do shadcn
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
```

## 📊 Integração com CMS (Sanity)

### Queries GROQ
```typescript
// Exemplos de queries Sanity
export const PRODUTOS_QUERY = `*[_type == "produto"] {
  _id,
  nome,
  slug,
  descricao,
  imagens,
  categoria,
  disponibilidade,
  preco,
  associacao->{
    _id,
    nome,
    whatsapp
  }
}`;

export const PRODUTO_BY_SLUG_QUERY = `*[_type == "produto" && slug.current == $slug][0] {
  _id,
  nome,
  slug,
  descricao,
  imagens,
  categoria,
  disponibilidade,
  preco,
  tempoProducao,
  personalizavel,
  associacao->{
    _id,
    nome,
    descricao,
    telefone,
    whatsapp,
    endereco
  }
}`;
```

### Cliente Sanity
```typescript
// Configuração do cliente
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});
```

## 🛡️ Autenticação e Segurança

### NextAuth.js
```typescript
// Verificação de autenticação
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

// Em páginas protegidas
const session = await getServerSession(authOptions);
if (!session) {
  redirect('/auth/login');
}

// Em componentes cliente
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();
if (status === 'loading') return <Loading />;
if (!session) return <LoginButton />;
```

### Middleware de Proteção
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith('/analytics')) {
        return token?.role === 'admin' || token?.role === 'editor';
      }
      return true;
    },
  },
});
```

## 📱 PWA e Performance

### Otimização de Imagens
```typescript
// Usar sempre o componente Image do Next.js
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="Descrição da imagem"
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  className="object-cover rounded-lg"
/>
```

### Lazy Loading
```typescript
// Componentes pesados
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // se necessário
});
```

## 📈 Analytics e Tracking

### WhatsApp Tracking
```typescript
// Sempre rastrear cliques no WhatsApp
import { trackWhatsAppClick } from '@/lib/analytics/whatsapp';

const handleWhatsAppClick = async () => {
  await trackWhatsAppClick(produto.id, 'COMPRA');
  // abrir WhatsApp
};
```

### Métricas de Performance
```typescript
// Web Vitals
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
  // Enviar para analytics
}
```

## 🔍 Busca e Filtros

### Integração Algolia
```typescript
// Cliente de busca
import { algoliasearch } from 'algoliasearch';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

// Busca instantânea
const { hits, nbHits } = await searchClient
  .search([{
    indexName: 'produtos',
    query: searchTerm,
    filters: 'categoria:decoracao AND disponibilidade:disponivel'
  }]);
```

## 📱 Integração WhatsApp

### Links Diretos
```typescript
// Gerar link WhatsApp
export function gerarLinkWhatsApp(produto: Produto, associacao: Associacao) {
  const numero = associacao.whatsapp?.replace(/\D/g, '');
  const mensagem = `Olá! Vi o produto "${produto.nome}" no site da Renda de Filé.

📦 Código: ${produto.id}
🏪 Associação: ${associacao.nome}
✅ Status: ${produto.disponibilidade}

Gostaria de mais informações.`;

  return `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
}
```

## 🐛 Debugging e Logs

### Logs Estruturados
```typescript
// Usar console estruturado
console.log('[PRODUTO]', 'Carregando produto:', { id, slug });
console.error('[API_ERROR]', 'Erro ao buscar produtos:', error);
console.warn('[PERFORMANCE]', 'Query lenta detectada:', { query, duration });
```

### Error Boundaries
```typescript
// Sempre ter error boundaries
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error, errorInfo) => {
    console.error('Erro capturado:', error, errorInfo);
  }}
>
  <Component />
</ErrorBoundary>
```

## 📝 Comentários e Documentação

### JSDoc para Funções Públicas
```typescript
/**
 * Gera um link direto para WhatsApp com mensagem pré-formatada
 * @param produto - Produto a ser consultado
 * @param associacao - Associação responsável pelo produto
 * @returns URL do WhatsApp ou null se não houver número
 */
export function gerarLinkWhatsApp(produto: Produto, associacao: Associacao): string | null {
  // implementação
}
```

### Comentários Inline
```typescript
// Usar comentários para lógica complexa
// Calcular preço com desconto baseado na disponibilidade
const precoFinal = produto.disponibilidade === 'DISPONIVEL' 
  ? produto.preco 
  : produto.preco * 0.9; // 10% desconto para encomendas
```

## 🚀 Deploy e CI/CD

### Checklist Pré-Deploy
- [ ] `npm run lint` passou
- [ ] `npm run type-check` passou
- [ ] `npm run build` passou
- [ ] Testes passaram (quando implementados)
- [ ] Variáveis de ambiente configuradas
- [ ] Sanity Studio deployado

### Comandos de Deploy
```bash
# Build de produção
npm run build

# Deploy Sanity Studio
npm run sanity:deploy

# Deploy Vercel (automático via git push)
git push origin main
```

## 🔄 Atualização dos Arquivos de Progresso

### Sempre Atualizar DESENVOLVIMENTO.md
```markdown
### Sessão X - DD/MM/AAAA
**Objetivos:** O que foi planejado para a sessão
**Realizações:** ✅ Tarefas concluídas
**Próximos Passos:** O que fazer na próxima sessão
**Problemas:** Bugs ou bloqueios encontrados
```

## 📚 Links Úteis

### Documentação Rápida
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Classes](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Sanity GROQ](https://www.sanity.io/docs/groq)
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)

### Ferramentas de Desenvolvimento
- http://localhost:3000 - Aplicação Next.js
- http://localhost:3333 - Sanity Studio
- http://localhost:5555 - Prisma Studio

---

**IMPORTANTE:** Sempre seguir estas convenções para manter a consistência do código e facilitar a manutenção. Em caso de dúvida, consultar a documentação oficial das tecnologias utilizadas.

**Última atualização:** 08/07/2025
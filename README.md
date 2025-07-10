# Renda de Filé v3

<div align="center">
  <img src="public/logo.png" alt="Renda de Filé" width="200" />
  
  **Plataforma digital para preservação e comercialização da Renda de Filé**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
</div>

## 📋 Sobre o Projeto

A Renda de Filé v3 é uma plataforma digital moderna desenvolvida para promover e facilitar a comercialização da tradicional Renda de Filé de Jaguaribe, Ceará. O projeto conecta artesãs locais com compradores, preservando uma importante tradição cultural brasileira.

### 🎯 Principais Funcionalidades

- **Catálogo Digital**: Exibição de produtos com imagens de alta qualidade
- **Sistema de Busca**: Busca avançada com filtros por categoria, disponibilidade e associação
- **Integração WhatsApp**: Links diretos para contato com artesãs
- **PWA**: Aplicação instalável com funcionamento offline
- **Analytics**: Dashboard completo para monitoramento de métricas
- **CMS Headless**: Gestão de conteúdo via Sanity Studio
- **Otimização SEO**: Metadados completos e sitemap automático

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 15.3** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes UI modernos
- **Zustand** - Gerenciamento de estado
- **TanStack Query** - Cache e sincronização de dados

### Backend & Infraestrutura

- **Sanity CMS** - Gestão de conteúdo
- **PostgreSQL** - Banco de dados principal
- **Prisma ORM** - Mapeamento objeto-relacional
- **NextAuth.js** - Autenticação
- **Supabase Storage** - Armazenamento de imagens

### Ferramentas & Otimização

- **Algolia** - Busca instantânea
- **Sentry** - Monitoramento de erros
- **Vercel Analytics** - Web Vitals
- **PWA** - Progressive Web App

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ e npm
- PostgreSQL 14+
- Conta no Sanity.io
- Conta no Supabase
- Conta no Vercel (para deploy)

### Passos de Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/renda-de-file-v3.git
cd renda-de-file-v3
```

2. **Instale as dependências**

```bash
npm install
cd sanity && npm install && cd ..
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

4. **Configure o banco de dados**

```bash
npm run db:generate
npm run db:push
```

5. **Inicie o desenvolvimento**

```bash
npm run dev          # Next.js (porta 3000)
npm run sanity:dev   # Sanity Studio (porta 3333)
npm run db:studio    # Prisma Studio (porta 5555)
```

## 📁 Estrutura do Projeto

```
renda-de-file-v3/
├── src/
│   ├── app/              # App Router - páginas e layouts
│   ├── components/       # Componentes React
│   ├── lib/             # Utilitários e configurações
│   ├── stores/          # Estado global (Zustand)
│   ├── hooks/           # Custom React hooks
│   └── types/           # Definições TypeScript
├── sanity/              # Sanity Studio e schemas
├── public/              # Arquivos estáticos
├── scripts/             # Scripts de automação
└── prisma/              # Schema do banco de dados
```

## 🌐 Deploy

### Deploy na Vercel

1. **Conecte o repositório no Vercel**
2. **Configure as variáveis de ambiente**
3. **Deploy automático via push para main**

### Deploy do Sanity Studio

```bash
cd sanity
npm run deploy
```

## 📊 Monitoramento

### Analytics Dashboard

Acesse `/analytics` para visualizar:

- Métricas de produtos mais visualizados
- Taxa de cliques no WhatsApp
- Web Vitals (LCP, FID, CLS)
- Estatísticas de conversão

### Endpoints da API

- `GET /api/v1/produtos` - Lista de produtos
- `POST /api/v1/contato` - Envio de formulário
- `POST /api/v1/newsletter` - Inscrição newsletter
- `POST /api/v1/whatsapp/track` - Tracking WhatsApp

## 🔒 Segurança

- Headers de segurança configurados
- Rate limiting implementado
- Autenticação com NextAuth.js
- Validação de entrada com Zod
- CORS configurado apropriadamente

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build           # Build de produção
npm run start           # Inicia servidor de produção

# Qualidade de Código
npm run lint            # Verifica ESLint
npm run type-check      # Verifica TypeScript
npm run format          # Formata código com Prettier

# Banco de Dados
npm run db:generate     # Gera cliente Prisma
npm run db:push        # Sincroniza schema
npm run db:studio      # Interface visual do BD

# Sanity
npm run sanity:dev     # Sanity Studio local
npm run sanity:deploy  # Deploy do Studio
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: [Seu Nome]
- **Design**: [Designer]
- **Coordenação**: SESCOOP/CE

## 📞 Contato

Para dúvidas ou suporte:

- Email: contato@rendadefile.com.br
- WhatsApp: (88) 99999-9999
- Website: [www.rendadefile.com.br](https://www.rendadefile.com.br)

---

<div align="center">
  Feito com ❤️ para preservar a tradição da Renda de Filé de Jaguaribe, CE
</div>

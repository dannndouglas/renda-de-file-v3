# Sanity Studio - Renda de Filé CMS

## Configuração para Produção

### 1. Variáveis de Ambiente

Crie um arquivo `.env.production` no diretório `sanity/` com:

```env
SANITY_STUDIO_PROJECT_ID=rsgezubm
SANITY_STUDIO_DATASET=production
```

### 2. Deploy do Sanity Studio

```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Deploy para Sanity.io
npm run deploy
```

O Studio será disponibilizado em: https://renda-de-file.sanity.studio

### 3. Configuração de CORS

As URLs permitidas já estão configuradas em `sanity.config.ts`:

- https://rendadefile.vercel.app
- https://www.rendadefile.com.br
- https://rendadefile.com.br

### 4. Datasets

- **development**: Para desenvolvimento local
- **production**: Para produção

### 5. Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Verificar configuração
npx sanity config check

# Gerenciar datasets
npx sanity dataset list
npx sanity dataset create production
npx sanity dataset copy development production

# Gerenciar CORS
npx sanity cors add https://rendadefile.com.br

# Deploy
npm run deploy
```

### 6. Migração de Dados

Para copiar dados do dataset de desenvolvimento para produção:

```bash
npx sanity dataset export development
npx sanity dataset import production.tar.gz production --replace
```

### 7. Tokens de API

Para gerar um novo token de API para produção:

1. Acesse: https://www.sanity.io/manage/project/rsgezubm/api
2. Crie um novo token com permissões de leitura/escrita
3. Adicione ao `.env` do Next.js como `SANITY_API_TOKEN`

### 8. Webhooks

Para configurar webhooks de revalidação:

1. Acesse: https://www.sanity.io/manage/project/rsgezubm/api/webhooks
2. Adicione webhook para: https://rendadefile.com.br/api/revalidate
3. Configure o secret no `.env` como `SANITY_WEBHOOK_SECRET`

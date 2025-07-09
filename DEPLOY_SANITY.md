# Guia de Deploy do Sanity Studio - Renda de Filé

## Pré-requisitos

1. Conta no Sanity.io
2. Acesso ao projeto `rsgezubm`
3. Node.js instalado

## Passo a Passo

### 1. Preparar o Dataset de Produção

```bash
# Acessar o diretório do Sanity
cd sanity

# Listar datasets existentes
npx sanity dataset list

# Criar dataset de produção (se não existir)
npx sanity dataset create production --visibility public

# Copiar dados do desenvolvimento para produção (opcional)
npx sanity dataset export development ./backup-dev.tar.gz
npx sanity dataset import ./backup-dev.tar.gz production --replace
```

### 2. Configurar Variáveis de Ambiente

Criar arquivo `sanity/.env.production`:
```env
SANITY_STUDIO_PROJECT_ID=rsgezubm
SANITY_STUDIO_DATASET=production
```

### 3. Configurar CORS para Produção

```bash
# Adicionar URLs de produção
npx sanity cors add https://rendadefile.com.br --credentials
npx sanity cors add https://www.rendadefile.com.br --credentials
npx sanity cors add https://rendadefile.vercel.app --credentials

# Verificar CORS configurado
npx sanity cors list
```

### 4. Deploy do Sanity Studio

```bash
# Instalar dependências
npm install

# Build do Studio
npm run build

# Deploy para Sanity.io
npm run deploy

# O comando perguntará pelo hostname do Studio
# Use: renda-de-file
```

### 5. Configurar Token de API

1. Acesse: https://www.sanity.io/manage/project/rsgezubm/api
2. Vá para "API" > "Tokens"
3. Crie um novo token:
   - Nome: `production-token`
   - Permissions: `Editor` (ou `Write` se precisar apenas escrever)
4. Copie o token e adicione ao `.env.production` do Next.js:
   ```env
   SANITY_API_TOKEN=seu-token-aqui
   ```

### 6. Configurar Webhooks (Opcional)

Para revalidação automática do Next.js:

1. Acesse: https://www.sanity.io/manage/project/rsgezubm/api/webhooks
2. Clique em "Create Webhook"
3. Configure:
   - Name: `Next.js Revalidation`
   - URL: `https://rendadefile.com.br/api/revalidate`
   - Dataset: `production`
   - Trigger on: Selecione os tipos de documento
   - Secret: Gere um secret seguro
4. Adicione o secret ao `.env.production`:
   ```env
   SANITY_WEBHOOK_SECRET=seu-secret-aqui
   ```

### 7. Verificar Deploy

- Studio: https://renda-de-file.sanity.studio
- Fazer login com sua conta Sanity
- Verificar se o dataset está como `production`
- Testar criação/edição de conteúdo

### 8. Configurar Next.js para Produção

No arquivo `.env.production` do Next.js:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=rsgezubm
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-de-producao
```

## Comandos Úteis

```bash
# Verificar configuração
cd sanity
npx sanity config check

# Ver logs do deploy
npx sanity deploy --log-level debug

# Gerenciar usuários
npx sanity users invite user@email.com

# Backup do dataset
npx sanity dataset export production backup-prod-$(date +%Y%m%d).tar.gz
```

## Troubleshooting

### Erro de CORS
- Verifique se as URLs estão exatamente corretas (com/sem www)
- Certifique-se de usar `--credentials` ao adicionar CORS

### Erro de Permissão
- Verifique se o token tem as permissões corretas
- Para ler e escrever, use permissão `Editor`

### Dataset não encontrado
- Confirme que o dataset `production` foi criado
- Verifique a variável `NEXT_PUBLIC_SANITY_DATASET`

## Checklist Final

- [ ] Dataset `production` criado
- [ ] CORS configurado para URLs de produção
- [ ] Token de API gerado e configurado
- [ ] Studio deployado em renda-de-file.sanity.studio
- [ ] Variáveis de ambiente configuradas no Next.js
- [ ] Teste de criação/edição de conteúdo funcionando
- [ ] Webhook configurado (se aplicável)

## Suporte

- Documentação Sanity: https://www.sanity.io/docs
- Dashboard do Projeto: https://www.sanity.io/manage/project/rsgezubm
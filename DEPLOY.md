# 🚀 Guia de Deploy - Renda de Filé v3

Este documento detalha o processo completo de deploy da aplicação Renda de Filé v3 em produção.

## 📋 Checklist Pré-Deploy

### 1. Validações Locais
```bash
# Execute todos os comandos de validação
npm run lint        # ✅ Sem erros ESLint
npm run type-check  # ✅ Sem erros TypeScript
npm run format      # ✅ Código formatado
npm run build       # ✅ Build bem-sucedido
```

### 2. Variáveis de Ambiente
- [ ] Copiar `.env.example` para `.env.production`
- [ ] Preencher todas as variáveis necessárias
- [ ] Validar conexões com serviços externos

### 3. Banco de Dados
- [ ] Backup do banco de desenvolvimento
- [ ] Criar banco de produção no PostgreSQL
- [ ] Aplicar schema com Prisma

## 🌐 Deploy na Vercel

### 1. Preparação do Repositório

```bash
# Certifique-se de que está na branch main
git checkout main
git pull origin main

# Commit todas as mudanças
git add .
git commit -m "chore: preparar para deploy v1.0.0"
git push origin main
```

### 2. Configuração na Vercel

1. **Acesse [vercel.com](https://vercel.com) e faça login**

2. **Importe o projeto**
   - Click em "New Project"
   - Selecione o repositório `renda-de-file-v3`
   - Configure o framework: Next.js
   - Root Directory: deixe vazio (raiz do projeto)

3. **Configure as variáveis de ambiente**
   - Vá em "Environment Variables"
   - Adicione todas as variáveis do `.env.production`
   - Marque para Production, Preview e Development

4. **Configurações de Build**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

5. **Deploy**
   - Click em "Deploy"
   - Aguarde o build (aproximadamente 5-10 minutos)

### 3. Domínio Personalizado

1. **Em Settings > Domains**
   - Adicione `rendadefile.com.br`
   - Adicione `www.rendadefile.com.br`

2. **Configure o DNS no seu provedor**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 🎨 Deploy do Sanity Studio

### 1. Criar Dataset de Produção

```bash
cd sanity

# Criar dataset de produção
npx sanity dataset create production --visibility public

# Copiar dados do desenvolvimento (opcional)
npx sanity dataset export development dataset.tar.gz
npx sanity dataset import dataset.tar.gz production
```

### 2. Deploy do Studio

```bash
# Ainda no diretório sanity/
npm run deploy

# Responda as perguntas:
# Studio hostname: renda-de-file
# Enable CORS for app? Yes
# Add CORS origin: https://rendadefile.com.br
```

### 3. Configurar CORS

No dashboard do Sanity:
1. Vá em Settings > API > CORS Origins
2. Adicione:
   - `https://rendadefile.com.br`
   - `https://www.rendadefile.com.br`
   - `https://rendadefile.vercel.app`

## 🗄️ Configuração do Banco de Dados

### 1. PostgreSQL no Supabase/Neon

1. **Crie um novo projeto**
2. **Copie a connection string**
3. **Atualize DATABASE_URL no Vercel**

### 2. Aplicar Schema

```bash
# Localmente, aponte para o banco de produção
export DATABASE_URL="sua_connection_string_producao"

# Gere e aplique o schema
npm run db:generate
npm run db:push

# Verifique se está tudo ok
npm run db:studio
```

## 📦 Configuração do Supabase Storage

### 1. Criar Bucket

1. No dashboard do Supabase, vá em Storage
2. Crie um bucket chamado `produtos`
3. Configure como público
4. Adicione políticas de segurança:

```sql
-- Permitir leitura pública
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'produtos');

-- Permitir upload apenas para autenticados
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'produtos' AND
  auth.role() = 'authenticated'
);
```

## 🔍 Configuração do Algolia

### 1. Criar Índices

1. No dashboard do Algolia
2. Crie os índices:
   - `produtos`
   - `noticias`

### 2. Configurar Atributos

```javascript
// Configuração do índice produtos
{
  searchableAttributes: [
    'nome',
    'descricao',
    'categoria',
    'associacao.nome'
  ],
  attributesForFaceting: [
    'filterOnly(categoria)',
    'filterOnly(disponibilidade)',
    'filterOnly(associacao.nome)'
  ],
  customRanking: ['desc(updatedAt)']
}
```

### 3. Sincronizar Dados

```bash
# Execute o script de sincronização
node scripts/sync-algolia.js
```

## 📊 Monitoramento Pós-Deploy

### 1. Verificações Essenciais

- [ ] Homepage carregando corretamente
- [ ] Catálogo de produtos funcionando
- [ ] Busca retornando resultados
- [ ] Links do WhatsApp funcionando
- [ ] Formulário de contato enviando
- [ ] PWA instalável
- [ ] Analytics registrando eventos

### 2. Performance

```bash
# Teste com Lighthouse
npm run lighthouse https://rendadefile.com.br

# Métricas esperadas:
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 95
# - SEO: 100
```

### 3. Configurar Alertas

No Vercel:
1. Settings > Notifications
2. Configure alertas para:
   - Build failures
   - Function errors
   - Performance degradation

## 🔄 Deploy de Atualizações

### Deploy Automático

```bash
# Toda push para main faz deploy automático
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

### Deploy Manual

```bash
# Via Vercel CLI
npm i -g vercel
vercel --prod
```

## 🚨 Rollback

### Via Vercel Dashboard

1. Vá em Deployments
2. Encontre o deploy anterior estável
3. Click nos 3 pontos > Promote to Production

### Via Git

```bash
# Reverter para commit anterior
git revert HEAD
git push origin main
```

## 📱 App Stores (PWA)

### Google Play Store (TWA)

1. Use o [PWABuilder](https://www.pwabuilder.com/)
2. Gere o APK assinado
3. Publique na Play Console

### Microsoft Store

1. Use o PWABuilder
2. Gere o pacote MSIX
3. Publique no Partner Center

## 🛡️ Segurança Pós-Deploy

### 1. Headers de Segurança

Verifique em [securityheaders.com](https://securityheaders.com):
- [ ] CSP configurado
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] Referrer-Policy

### 2. Monitoramento

- [ ] Sentry configurado e recebendo erros
- [ ] Logs estruturados funcionando
- [ ] Alertas de segurança ativos

## 📝 Documentação Final

### 1. Atualizar README

- [ ] URLs de produção
- [ ] Status badges
- [ ] Links para documentação

### 2. Criar CHANGELOG

```markdown
# Changelog

## [1.0.0] - 2025-01-09

### Added
- Catálogo completo de produtos
- Sistema de busca com Algolia
- Integração WhatsApp
- PWA com funcionamento offline
- Dashboard de analytics
- Sistema de favoritos
```

### 3. Treinamento

- [ ] Criar vídeos tutoriais do Sanity Studio
- [ ] Documentar fluxo de publicação
- [ ] Treinar equipe de conteúdo

## 🎉 Pós-Lançamento

### Divulgação

1. **Redes Sociais**
   - Posts no Instagram das associações
   - Stories com link
   - WhatsApp para grupos

2. **SEO**
   - Submeter sitemap ao Google
   - Configurar Google My Business
   - Backlinks de parceiros

### Métricas de Sucesso

Monitorar nas primeiras semanas:
- Número de visitantes únicos
- Taxa de cliques no WhatsApp
- Produtos mais visualizados
- Taxa de instalação do PWA
- Tempo médio na página

---

## 📞 Suporte

Em caso de problemas:

1. **Logs**: Vercel Dashboard > Functions > Logs
2. **Erros**: Sentry Dashboard
3. **Performance**: Vercel Analytics
4. **Conteúdo**: Sanity Studio

**Contato Técnico**: suporte@rendadefile.com.br

---

Última atualização: 09/01/2025
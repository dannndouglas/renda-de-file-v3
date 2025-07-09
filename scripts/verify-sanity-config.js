#!/usr/bin/env node

/**
 * Script para verificar a configuração do Sanity antes do deploy
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do Sanity...\n');

// Verificar variáveis de ambiente
const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_API_TOKEN',
];

const envPath = path.join(__dirname, '../.env.local');
const envProductionPath = path.join(__dirname, '../.env.production');
const sanityEnvPath = path.join(__dirname, '../sanity/.env.production');

// Verificar arquivo .env.local
if (fs.existsSync(envPath)) {
  console.log('✅ Arquivo .env.local encontrado');
} else {
  console.log('⚠️  Arquivo .env.local não encontrado');
}

// Verificar arquivo .env.production
if (fs.existsSync(envProductionPath)) {
  console.log('✅ Arquivo .env.production encontrado');
} else {
  console.log('⚠️  Arquivo .env.production não encontrado - usando .env.production.example como referência');
}

// Verificar arquivo sanity/.env.production
if (fs.existsSync(sanityEnvPath)) {
  console.log('✅ Arquivo sanity/.env.production encontrado');
} else {
  console.log('❌ Arquivo sanity/.env.production não encontrado - necessário para deploy do Studio');
}

// Verificar configurações do Sanity
console.log('\n📋 Configurações do Sanity:');

const sanityConfigPath = path.join(__dirname, '../sanity/sanity.config.ts');
if (fs.existsSync(sanityConfigPath)) {
  const config = fs.readFileSync(sanityConfigPath, 'utf8');
  
  // Verificar projectId
  const projectIdMatch = config.match(/projectId:\s*['"]([^'"]+)['"]/);
  if (projectIdMatch) {
    console.log(`✅ Project ID: ${projectIdMatch[1]}`);
  }
  
  // Verificar dataset
  if (config.includes('process.env.SANITY_STUDIO_DATASET')) {
    console.log('✅ Dataset configurado para usar variável de ambiente');
  }
  
  // Verificar CORS
  if (config.includes('rendadefile.com.br')) {
    console.log('✅ CORS configurado para produção');
  }
}

// Verificar schemas
const schemasPath = path.join(__dirname, '../sanity/schemas');
if (fs.existsSync(schemasPath)) {
  const schemaFiles = fs.readdirSync(path.join(schemasPath, 'documents')).filter(f => f.endsWith('.ts'));
  console.log(`\n📁 Schemas encontrados: ${schemaFiles.length}`);
  schemaFiles.forEach(file => {
    console.log(`   - ${file.replace('.ts', '')}`);
  });
}

// Verificar scripts no package.json
const sanityPackagePath = path.join(__dirname, '../sanity/package.json');
if (fs.existsSync(sanityPackagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(sanityPackagePath, 'utf8'));
  console.log('\n📦 Scripts do Sanity:');
  Object.keys(packageJson.scripts).forEach(script => {
    console.log(`   - npm run ${script}`);
  });
}

console.log('\n✨ Para fazer o deploy do Sanity Studio:');
console.log('1. cd sanity');
console.log('2. npm install');
console.log('3. npm run deploy');
console.log('\n🔗 O Studio estará disponível em: https://renda-de-file.sanity.studio');

console.log('\n📝 Checklist para produção:');
console.log('[ ] Criar dataset "production" no Sanity');
console.log('[ ] Configurar token de API com permissões adequadas');
console.log('[ ] Adicionar URLs de produção nas configurações de CORS');
console.log('[ ] Configurar webhooks para revalidação');
console.log('[ ] Testar conexão com o dataset de produção');
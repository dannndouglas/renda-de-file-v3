// Teste rápido de conexão
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tpuanpryaecetwblyvnz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdWFucHJ5YWVjZXR3Ymx5dm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTc4MzgsImV4cCI6MjA2NzQ5MzgzOH0.5D5wtacLY2fcc0T2829yCev1k5unh_2m-FBdMgqvwhE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🧪 Testando conexão com Supabase...');

    // Teste básico de conectividade
    const { data, error } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Erro na conexão:', error.message);

      // Teste de autenticação
      const { data: authData, error: authError } =
        await supabase.auth.getSession();
      console.log('🔐 Status auth:', authError ? 'Erro' : 'OK');
    } else {
      console.log('✅ Conexão com Supabase funcionando!');
      console.log('📊 Dados:', data);
    }
  } catch (err) {
    console.log('💥 Erro geral:', err.message);
  }
}

testConnection();

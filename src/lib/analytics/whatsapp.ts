export async function trackWhatsAppClick(
  produtoId: string,
  tipo: 'COMPRA' | 'INFORMACAO' = 'COMPRA'
) {
  try {
    await fetch('/api/v1/whatsapp/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        produtoId,
        tipo,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('[ANALYTICS] Erro ao rastrear clique WhatsApp:', error);
  }
}
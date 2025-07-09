import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { whatsappRateLimit } from '@/lib/security/rateLimit';

export async function POST(request: NextRequest) {
  return whatsappRateLimit.middleware(request, async (req) => {
    try {
      const body = await req.json();
      const { produtoId, tipo = 'COMPRA', origem = 'catalogo' } = body;

      if (!produtoId) {
        return NextResponse.json(
          { error: 'produtoId é obrigatório' },
          { status: 400 }
        );
      }

      // Obter sessionId do cookie ou gerar um novo
      const sessionId =
        req.cookies.get('sessionId')?.value || crypto.randomUUID();

      // Registrar clique no WhatsApp
      await prisma.consultaWhatsApp.create({
        data: {
          sessionId,
          produtoId,
          tipo,
          origem,
        },
      });

      // Configurar cookie de sessão se não existir
      const response = NextResponse.json({ success: true });

      if (!req.cookies.get('sessionId')) {
        response.cookies.set('sessionId', sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365, // 1 ano
        });
      }

      return response;
    } catch (error) {
      console.error('Erro ao registrar clique WhatsApp:', error);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }
  });
}

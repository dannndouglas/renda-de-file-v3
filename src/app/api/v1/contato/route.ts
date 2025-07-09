import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { contactRateLimit } from '@/lib/security/rateLimit';

const contactSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string().min(10),
  assunto: z.string(),
  mensagem: z.string().min(10),
});

export async function POST(request: NextRequest) {
  // Aplicar rate limiting
  return contactRateLimit.middleware(request, async (req) => {
    try {
      const body = await req.json();

      // Validar dados
      const data = contactSchema.parse(body);

      // Salvar no banco de dados
      const contato = await prisma.contato.create({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          assunto: data.assunto,
          mensagem: data.mensagem,
          status: 'NOVO',
        },
      });

      // TODO: Aqui você pode adicionar lógica para enviar email de notificação
      // await sendNotificationEmail(contato);

      return NextResponse.json({
        success: true,
        message: 'Mensagem enviada com sucesso',
        id: contato.id,
      });
    } catch (error) {
      console.error('Erro ao processar contato:', error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Dados inválidos', details: error.errors },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Erro ao processar mensagem' },
        { status: 500 }
      );
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação (admin only)
    // TODO: Implementar verificação de sessão admin

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where = status ? { status: status as any } : {};

    const [contatos, total] = await Promise.all([
      prisma.contato.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contato.count({ where }),
    ]);

    return NextResponse.json({
      contatos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    );
  }
}

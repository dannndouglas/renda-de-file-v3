import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
});

// Inscrever no newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Verificar se email já existe
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email: validatedData.email },
    });

    if (existingSubscription) {
      if (existingSubscription.ativo) {
        return NextResponse.json(
          { error: 'Este email já está inscrito no newsletter' },
          { status: 400 }
        );
      } else {
        // Reativar inscrição
        await prisma.newsletterSubscription.update({
          where: { email: validatedData.email },
          data: {
            ativo: true,
            nome: validatedData.nome || existingSubscription.nome,
            dataAtualizacao: new Date(),
          },
        });

        return NextResponse.json({
          message: 'Inscrição reativada com sucesso!',
          reativado: true,
        });
      }
    }

    // Criar nova inscrição
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email: validatedData.email,
        nome: validatedData.nome,
        ativo: true,
        origem: 'website',
      },
    });

    return NextResponse.json({
      message: 'Inscrito no newsletter com sucesso!',
      subscription: {
        id: subscription.id,
        email: subscription.email,
        nome: subscription.nome,
      },
    });

  } catch (error) {
    console.error('Erro ao inscrever no newsletter:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Cancelar inscrição
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Inscrição não encontrada' },
        { status: 404 }
      );
    }

    // Verificar token se fornecido (para links de cancelamento)
    if (token && subscription.unsubscribeToken !== token) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        ativo: false,
        dataAtualizacao: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Inscrição cancelada com sucesso',
    });

  } catch (error) {
    console.error('Erro ao cancelar inscrição:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
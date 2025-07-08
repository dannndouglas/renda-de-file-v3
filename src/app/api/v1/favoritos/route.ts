import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json({ favoritos: [] });
    }

    const favoritos = await prisma.favorito.findMany({
      where: { sessionId },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            imagemPrincipal: true,
            preco: true,
            slug: true,
            disponibilidade: true,
            associacao: {
              select: {
                id: true,
                nome: true,
                whatsapp: true,
              },
            },
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return NextResponse.json({ favoritos });
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { produtoId } = body;

    if (!produtoId) {
      return NextResponse.json(
        { error: 'produtoId é obrigatório' },
        { status: 400 }
      );
    }

    // Obter sessionId do cookie ou gerar um novo
    const sessionId =
      request.cookies.get('sessionId')?.value || crypto.randomUUID();

    // Verificar se já existe
    const existingFavorito = await prisma.favorito.findUnique({
      where: {
        sessionId_produtoId: {
          sessionId,
          produtoId,
        },
      },
    });

    if (existingFavorito) {
      return NextResponse.json({
        message: 'Produto já está nos favoritos',
        favorito: existingFavorito,
      });
    }

    // Criar novo favorito
    const favorito = await prisma.favorito.create({
      data: {
        sessionId,
        produtoId,
      },
    });

    // Configurar cookie de sessão se não existir
    const response = NextResponse.json({ favorito });

    if (!request.cookies.get('sessionId')) {
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 ano
      });
    }

    return response;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const produtoId = searchParams.get('produtoId');
    const sessionId = request.cookies.get('sessionId')?.value;

    if (!sessionId || !produtoId) {
      return NextResponse.json(
        { error: 'sessionId e produtoId são obrigatórios' },
        { status: 400 }
      );
    }

    await prisma.favorito.delete({
      where: {
        sessionId_produtoId: {
          sessionId,
          produtoId,
        },
      },
    });

    return NextResponse.json({ message: 'Favorito removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

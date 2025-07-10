import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { NextRequest, NextResponse } from 'next/server';
// import { indexSingleProduto, indexSingleAssociacao, removeFromIndex } from '@/lib/algolia/indexing';

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!secret) {
      console.error('SANITY_WEBHOOK_SECRET não configurado');
      return NextResponse.json(
        { error: 'Configuração inválida' },
        { status: 500 }
      );
    }

    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get(SIGNATURE_HEADER_NAME);

    if (!signature) {
      console.error('Webhook Sanity: assinatura ausente');
      return NextResponse.json(
        { error: 'Assinatura ausente' },
        { status: 401 }
      );
    }

    if (!isValidSignature(body, signature, secret)) {
      console.error('Webhook Sanity: assinatura inválida');
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 401 }
      );
    }

    const { _type, _id, operation, slug } = JSON.parse(body);

    console.log(`Webhook Sanity: ${operation} ${_type} ${_id}`);

    // Revalidar cache baseado no tipo de documento
    switch (_type) {
      case 'produto':
        revalidatePath('/catalogo');
        revalidatePath('/');
        revalidateTag('produtos');

        if (slug?.current) {
          revalidatePath(`/produto/${slug.current}`);
        }

        // Atualizar índice de busca (implementação futura)
        // if (operation === 'delete') {
        //   await removeFromIndex('produtos', _id);
        // } else {
        //   await indexSingleProduto(_id);
        // }
        break;

      case 'associacao':
        revalidatePath('/associacoes');
        revalidatePath('/');
        revalidateTag('associacoes');

        if (slug?.current) {
          revalidatePath(`/associacao/${slug.current}`);
        }

        // Atualizar índice de busca (implementação futura)
        // if (operation === 'delete') {
        //   await removeFromIndex('associacoes', _id);
        // } else {
        //   await indexSingleAssociacao(_id);
        // }
        break;

      case 'noticia':
        revalidatePath('/noticias');
        revalidatePath('/');
        revalidateTag('noticias');

        if (slug?.current) {
          revalidatePath(`/noticia/${slug.current}`);
        }

        // Noticias não são indexadas no Algolia por enquanto
        // if (operation === 'delete') {
        //   await removeFromIndex('noticias', _id);
        // } else {
        //   await indexSingleNoticia(_id);
        // }
        break;

      case 'configuracoes':
        revalidatePath('/');
        revalidateTag('configuracoes');
        break;

      default:
        console.log(`Webhook Sanity: tipo ${_type} não tratado`);
    }

    return NextResponse.json({ message: 'Webhook processado com sucesso' });
  } catch (error) {
    console.error('Erro no webhook Sanity:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função de atualização do índice de busca removida
// A atualização agora é feita diretamente nas seções de cada tipo de documento

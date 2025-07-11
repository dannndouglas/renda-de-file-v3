import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { PageHeader } from '@/components/ui/page-header';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { AssociacoesClient } from '@/components/pages/AssociacoesClient';

export const metadata: Metadata = {
  title: 'Associações - Renda de Filé',
  description:
    'Conheça as associações de rendeiras que mantêm viva a tradição da Renda de Filé em Jaguaribe, Ceará.',
};

const ASSOCIACOES_QUERY = `*[_type == "associacao" && ativo == true] | order(nome asc) {
  _id,
  nome,
  slug,
  descricao,
  "logo": logo{
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  endereco,
  telefone,
  email,
  whatsapp,
  redesSociais,
  numeroMembros,
  especialidades,
  "produtoCount": count(*[_type == "produto" && references(^._id)])
}`;

async function getAssociacoes() {
  try {
    const associacoes = await sanityClient.fetch(
      ASSOCIACOES_QUERY,
      {},
      {
        next: { revalidate: 3600 }, // Revalidar a cada hora
      }
    );
    return associacoes;
  } catch (error) {
    console.error('[ASSOCIACOES] Erro ao buscar associações:', error);
    return [];
  }
}

export default async function AssociacoesPage() {
  const associacoes = await getAssociacoes();

  return (
    <PublicLayout>
      <PageHeader
        title="Nossas Associações"
        subtitle="Comunidade de Rendeiras"
        description="Conheça as associações de rendeiras que preservam e promovem a arte da Renda de Filé, gerando renda e mantendo viva nossa tradição centenária"
        variant="default"
        pattern={true}
      />

      <div className="container mx-auto px-4 py-12">
        <AssociacoesClient associacoes={associacoes} />
      </div>
    </PublicLayout>
  );
}

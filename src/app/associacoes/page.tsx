import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Users, Package, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'Associações - Renda de Filé',
  description:
    'Conheça as associações de rendeiras que mantêm viva a tradição da Renda de Filé em Jaguaribe, Ceará.',
};

const ASSOCIACOES_QUERY = `*[_type == "associacao"] | order(nome asc) {
  _id,
  nome,
  descricao,
  imagem,
  telefone,
  whatsapp,
  endereco,
  numeroRendeiras,
  dataFundacao,
  presidente,
  sobre,
  "produtosCount": count(*[_type == "produto" && references(^._id)])
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Nossas Associações
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Conheça as associações de rendeiras que preservam e promovem a arte
            da Renda de Filé, gerando renda e mantendo viva nossa tradição
            centenária.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.length}
              </div>
              <p className="text-gray-600">Associações Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.reduce(
                  (acc: number, assoc: any) =>
                    acc + (assoc.numeroRendeiras || 0),
                  0
                )}
                +
              </div>
              <p className="text-gray-600">Rendeiras Cadastradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.reduce(
                  (acc: number, assoc: any) => acc + (assoc.produtosCount || 0),
                  0
                )}
                +
              </div>
              <p className="text-gray-600">Produtos Cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Associações Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {associacoes.map((associacao: any) => (
            <Card
              key={associacao._id}
              className="transition-shadow hover:shadow-lg"
            >
              {associacao.imagem && (
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={associacao.imagem.asset.url}
                    alt={associacao.nome}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{associacao.nome}</CardTitle>
                {associacao.dataFundacao && (
                  <p className="text-sm text-gray-500">
                    Fundada em {new Date(associacao.dataFundacao).getFullYear()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {associacao.descricao && (
                  <p className="mb-4 line-clamp-3 text-gray-600">
                    {associacao.descricao}
                  </p>
                )}

                <div className="mb-4 space-y-3">
                  {associacao.numeroRendeiras && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{associacao.numeroRendeiras} rendeiras</span>
                    </div>
                  )}

                  {associacao.produtosCount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{associacao.produtosCount} produtos</span>
                    </div>
                  )}

                  {associacao.endereco && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span className="line-clamp-2">
                        {typeof associacao.endereco === 'string'
                          ? associacao.endereco
                          : `${associacao.endereco.rua}, ${associacao.endereco.numero} - ${associacao.endereco.bairro}, ${associacao.endereco.cidade}/${associacao.endereco.estado}`}
                      </span>
                    </div>
                  )}

                  {associacao.telefone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{associacao.telefone}</span>
                    </div>
                  )}
                </div>

                {associacao.presidente && (
                  <p className="mb-4 text-sm text-gray-500">
                    Presidente: {associacao.presidente}
                  </p>
                )}

                <div className="flex gap-2">
                  {associacao.whatsapp && (
                    <Button size="sm" className="flex-1 gap-2" asChild>
                      <a
                        href={`https://wa.me/55${associacao.whatsapp.replace(/\D/g, '')}?text=Olá! Vi a associação ${associacao.nome} no site da Renda de Filé.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                  <Link href={`/catalogo?associacao=${associacao._id}`}>
                    <Button size="sm" variant="outline">
                      Ver Produtos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-lg bg-white p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Quer se tornar uma associação parceira?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            Se você faz parte de uma associação de rendeiras e deseja fazer
            parte da nossa plataforma, entre em contato conosco para saber mais
            sobre como participar.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:contato@rendadefile.com.br">Entrar em Contato</a>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}

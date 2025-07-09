import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Users, Package, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Associações - Renda de Filé',
  description: 'Conheça as associações de rendeiras que mantêm viva a tradição da Renda de Filé em Jaguaribe, Ceará.',
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
    const associacoes = await sanityClient.fetch(ASSOCIACOES_QUERY, {}, {
      next: { revalidate: 3600 } // Revalidar a cada hora
    });
    return associacoes;
  } catch (error) {
    console.error('[ASSOCIACOES] Erro ao buscar associações:', error);
    return [];
  }
}

export default async function AssociacoesPage() {
  const associacoes = await getAssociacoes();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas Associações
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça as associações de rendeiras que preservam e promovem a arte da Renda de Filé, 
            gerando renda e mantendo viva nossa tradição centenária.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.length}
              </div>
              <p className="text-gray-600">Associações Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.reduce((acc: number, assoc: any) => acc + (assoc.numeroRendeiras || 0), 0)}+
              </div>
              <p className="text-gray-600">Rendeiras Cadastradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {associacoes.reduce((acc: number, assoc: any) => acc + (assoc.produtosCount || 0), 0)}+
              </div>
              <p className="text-gray-600">Produtos Cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Associações Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associacoes.map((associacao: any) => (
            <Card key={associacao._id} className="hover:shadow-lg transition-shadow">
              {associacao.imagem && (
                <div className="aspect-video relative bg-gray-100">
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
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {associacao.descricao}
                  </p>
                )}

                <div className="space-y-3 mb-4">
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
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span className="line-clamp-2">{associacao.endereco}</span>
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
                  <p className="text-sm text-gray-500 mb-4">
                    Presidente: {associacao.presidente}
                  </p>
                )}

                <div className="flex gap-2">
                  {associacao.whatsapp && (
                    <Button
                      size="sm"
                      className="flex-1 gap-2"
                      asChild
                    >
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
        <div className="mt-16 text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quer se tornar uma associação parceira?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Se você faz parte de uma associação de rendeiras e deseja fazer parte da nossa plataforma, 
            entre em contato conosco para saber mais sobre como participar.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:contato@rendadefile.com.br">
              Entrar em Contato
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { ModernImageGallery } from '@/components/catalog/ModernImageGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Star, Share2 } from 'lucide-react';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { ShareButton } from '@/components/common/ShareButton';
import { trackWhatsAppClick } from '@/lib/analytics/whatsapp';
import Link from 'next/link';
import Image from 'next/image';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { urlForImage } from '@/lib/images/sanity';
import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
} from '@/components/seo/SEOMetadata';

const PRODUTO_QUERY = `*[_type == "produto" && slug.current == $slug][0] {
  _id,
  nome,
  slug,
  descricao,
  descricaoDetalhada,
  imagens,
  categoria,
  disponibilidade,
  preco,
  precoPromocional,
  tempoProducao,
  personalizavel,
  dimensoes,
  materiais,
  tecnicas,
  cuidados,
  historia,
  tags,
  especificacoes,
  metaTitle,
  metaDescription,
  associacao->{
    _id,
    nome,
    descricao,
    telefone,
    whatsapp,
    endereco,
    sobre
  }
}`;

const PRODUTOS_RELACIONADOS_QUERY = `*[_type == "produto" && categoria == $categoria && slug.current != $slug] [0...4] {
  _id,
  nome,
  slug,
  imagens,
  preco,
  disponibilidade
}`;

async function getProduto(slug: string) {
  try {
    const produto = await sanityClient.fetch(PRODUTO_QUERY, { slug });
    if (!produto) return null;

    const relacionados = await sanityClient.fetch(PRODUTOS_RELACIONADOS_QUERY, {
      categoria: produto.categoria,
      slug,
    });

    return { produto, relacionados };
  } catch (error) {
    console.error('[PRODUTO] Erro ao buscar produto:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getProduto(resolvedParams.slug);

  if (!data) {
    return {
      title: 'Produto não encontrado',
    };
  }

  const { produto } = data;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rendadefile.org.br';

  return generateSEOMetadata({
    title: produto.metaTitle || produto.nome,
    description: produto.metaDescription || produto.descricao,
    keywords: [
      'renda de filé',
      'artesanato',
      'ceará',
      produto.categoria,
      ...(produto.tags || []),
    ],
    ogImage: produto.imagens?.[0]?.asset?.url,
    ogType: 'website',
    canonicalUrl: `${siteUrl}/produto/${resolvedParams.slug}`,
    productData: {
      price: produto.preco,
      currency: 'BRL',
      availability:
        produto.disponibilidade === 'disponivel' ? 'in stock' : 'preorder',
    },
  });
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const data = await getProduto(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { produto, relacionados } = data;

  // WhatsApp tracking will be handled by the WhatsAppButton component itself

  const formatarMensagemWhatsApp = () => {
    const numero = produto.associacao?.whatsapp?.replace(/\D/g, '');
    const mensagem = `Olá! Vi o produto "${produto.nome}" no site da Renda de Filé.

📦 Código: ${produto._id}
🏪 Associação: ${produto.associacao?.nome}
✅ Status: ${produto.disponibilidade === 'disponivel' ? 'Disponível' : 'Sob encomenda'}

Gostaria de mais informações.`;

    return `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
  };

  const jsonLd = generateJsonLd('Product', {
    name: produto.nome,
    description: produto.descricao,
    image: produto.imagens?.[0]?.asset?.url,
    brand: {
      '@type': 'Organization',
      name: produto.associacao?.nome || 'Renda de Filé',
    },
    offers: {
      '@type': 'Offer',
      url: `https://rendadefile.org.br/produto/${resolvedParams.slug}`,
      priceCurrency: 'BRL',
      price: produto.preco,
      availability:
        produto.disponibilidade === 'disponivel'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: produto.associacao?.nome,
        telephone: produto.associacao?.telefone,
        address: produto.associacao?.endereco,
      },
    },
    category: produto.categoria,
  });

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Início
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/catalogo" className="hover:text-gray-900">
                Catálogo
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{produto.nome}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Galeria de Imagens */}
          <div>
            <ModernImageGallery images={produto.imagens} />
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="mb-6">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                {produto.nome}
              </h1>

              <div className="mb-6 flex items-center gap-4">
                <Badge
                  variant={
                    produto.disponibilidade === 'disponivel'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {produto.disponibilidade === 'disponivel'
                    ? 'Disponível'
                    : 'Sob encomenda'}
                </Badge>
                <Badge variant="outline">{produto.categoria}</Badge>
                {produto.personalizavel && (
                  <Badge variant="outline" className="bg-amber-50">
                    Personalizável
                  </Badge>
                )}
              </div>

              <p className="mb-6 text-lg text-gray-700">{produto.descricao}</p>

              <div className="mb-6">
                {produto.precoPromocional &&
                produto.precoPromocional < produto.preco ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-orange-600">
                      R$ {produto.precoPromocional.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </span>
                    <Badge variant="destructive" className="ml-2">
                      {Math.round(
                        ((produto.preco - produto.precoPromocional) /
                          produto.preco) *
                          100
                      )}
                      % OFF
                    </Badge>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-orange-600">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="mb-8 flex gap-4">
                {produto.associacao?.whatsapp && (
                  <WhatsAppButton
                    phoneNumber={produto.associacao.whatsapp}
                    message={formatarMensagemWhatsApp()}
                    size="lg"
                    className="flex-1"
                  />
                )}
                <ShareButton
                  title={produto.nome}
                  text={`Confira este produto incrível: ${produto.nome}`}
                />
              </div>

              <Separator className="my-8" />

              {/* Detalhes */}
              {produto.descricaoDetalhada && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">
                    Descrição Detalhada
                  </h2>
                  <p className="whitespace-pre-line text-gray-700">
                    {produto.descricaoDetalhada}
                  </p>
                </div>
              )}

              {produto.historia && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">
                    História do Produto
                  </h2>
                  <p className="whitespace-pre-line text-gray-700">
                    {produto.historia}
                  </p>
                </div>
              )}

              {/* Especificações */}
              <div className="space-y-6">
                {produto.tempoProducao && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Tempo de Produção
                      </h3>
                      <p className="text-gray-700">{produto.tempoProducao} dias</p>
                    </div>
                  </div>
                )}

                {produto.dimensoes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Dimensões
                    </h3>
                    <p className="text-gray-700">{produto.dimensoes}</p>
                  </div>
                )}

                {produto.materiais && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Materiais
                    </h3>
                    <p className="text-gray-700">
                      {produto.materiais.join(', ')}
                    </p>
                  </div>
                )}

                {produto.tecnicas && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Técnicas Utilizadas
                    </h3>
                    <p className="text-gray-700">
                      {produto.tecnicas.join(', ')}
                    </p>
                  </div>
                )}

                {produto.cuidados && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Cuidados
                    </h3>
                    <p className="whitespace-pre-line text-gray-700">
                      {produto.cuidados}
                    </p>
                  </div>
                )}

                {produto.especificacoes && (
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      Especificações Técnicas
                    </h3>
                    <div className="space-y-2">
                      {produto.especificacoes.tecnica && (
                        <p className="text-gray-700">
                          <span className="font-medium">Técnica:</span>{' '}
                          {produto.especificacoes.tecnica}
                        </p>
                      )}
                      {produto.especificacoes.observacoes && (
                        <p className="text-gray-700">
                          <span className="font-medium">Observações:</span>{' '}
                          {produto.especificacoes.observacoes}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Informações da Associação */}
        {produto.associacao && (
          <Card className="mt-12">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Sobre a Associação</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {produto.associacao.nome}
                  </h3>
                  {produto.associacao.descricao && (
                    <p className="mb-4 text-gray-700">
                      {produto.associacao.descricao}
                    </p>
                  )}
                  {produto.associacao.sobre && (
                    <p className="text-gray-700">{produto.associacao.sobre}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {produto.associacao.endereco && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        {typeof produto.associacao.endereco === 'string' 
                          ? produto.associacao.endereco
                          : `${produto.associacao.endereco.rua}, ${produto.associacao.endereco.numero}${
                              produto.associacao.endereco.bairro ? ` - ${produto.associacao.endereco.bairro}` : ''
                            }, ${produto.associacao.endereco.cidade} - ${produto.associacao.endereco.estado}`
                        }
                      </span>
                    </div>
                  )}
                  {produto.associacao.telefone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        {produto.associacao.telefone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Produtos Relacionados */}
        {relacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relacionados.map((prod: any) => (
                <Link key={prod._id} href={`/produto/${prod.slug.current}`}>
                  <Card className="transition-shadow hover:shadow-lg">
                    <div className="relative aspect-square bg-gray-100">
                      {prod.imagens?.[0] && (
                        <Image
                          src={
                            urlForImage(prod.imagens[0], {
                              width: 400,
                              height: 400,
                              quality: 85,
                            }) || ''
                          }
                          alt={prod.nome}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold text-gray-900">
                        {prod.nome}
                      </h3>
                      <p className="text-xl font-bold text-orange-600">
                        R$ {prod.preco.toFixed(2).replace('.', ',')}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

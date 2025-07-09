import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { ImageGallery } from '@/components/catalog/ImageGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Star, Share2, Heart } from 'lucide-react';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { trackWhatsAppClick } from '@/lib/analytics/whatsapp';
import Link from 'next/link';
import Image from 'next/image';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { generateMetadata as generateSEOMetadata, generateJsonLd } from '@/components/seo/SEOMetadata';

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
  tempoProducao,
  personalizavel,
  dimensoes,
  materiais,
  tecnicas,
  cuidados,
  historia,
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
      slug
    });

    return { produto, relacionados };
  } catch (error) {
    console.error('[PRODUTO] Erro ao buscar produto:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getProduto(resolvedParams.slug);
  
  if (!data) {
    return {
      title: 'Produto não encontrado',
    };
  }

  const { produto } = data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rendadefile.org.br';

  return generateSEOMetadata({
    title: produto.nome,
    description: produto.descricao,
    keywords: [
      'renda de filé',
      'artesanato',
      'ceará',
      produto.categoria,
      ...produto.tags || [],
    ],
    ogImage: produto.imagens?.[0]?.asset?.url,
    ogType: 'product',
    canonicalUrl: `${siteUrl}/produto/${resolvedParams.slug}`,
    productData: {
      price: produto.preco,
      currency: 'BRL',
      availability: produto.disponibilidade === 'disponivel' ? 'in stock' : 'preorder',
    },
  });
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getProduto(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { produto, relacionados } = data;

  const handleWhatsAppClick = async () => {
    'use server';
    await trackWhatsAppClick(produto._id, 'COMPRA');
  };

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
      availability: produto.disponibilidade === 'disponivel' 
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
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-gray-900">Início</Link></li>
            <li>/</li>
            <li><Link href="/catalogo" className="hover:text-gray-900">Catálogo</Link></li>
            <li>/</li>
            <li className="text-gray-900">{produto.nome}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galeria de Imagens */}
          <div>
            <ImageGallery images={produto.imagens} />
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {produto.nome}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <Badge variant={produto.disponibilidade === 'disponivel' ? 'default' : 'secondary'}>
                  {produto.disponibilidade === 'disponivel' ? 'Disponível' : 'Sob encomenda'}
                </Badge>
                <Badge variant="outline">{produto.categoria}</Badge>
                {produto.personalizavel && (
                  <Badge variant="outline" className="bg-amber-50">
                    Personalizável
                  </Badge>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-6">
                {produto.descricao}
              </p>

              <div className="text-3xl font-bold text-orange-600 mb-6">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </div>

              {/* Ações */}
              <div className="flex gap-4 mb-8">
                {produto.associacao?.whatsapp && (
                  <WhatsAppButton
                    phoneNumber={produto.associacao.whatsapp}
                    message={formatarMensagemWhatsApp()}
                    size="lg"
                    className="flex-1"
                    onClick={handleWhatsAppClick}
                  />
                )}
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-8" />

              {/* Detalhes */}
              {produto.descricaoDetalhada && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Descrição Detalhada</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {produto.descricaoDetalhada}
                  </p>
                </div>
              )}

              {/* Especificações */}
              <div className="space-y-6">
                {produto.tempoProducao && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Tempo de Produção</h3>
                      <p className="text-gray-700">{produto.tempoProducao}</p>
                    </div>
                  </div>
                )}

                {produto.dimensoes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dimensões</h3>
                    <p className="text-gray-700">{produto.dimensoes}</p>
                  </div>
                )}

                {produto.materiais && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Materiais</h3>
                    <p className="text-gray-700">{produto.materiais.join(', ')}</p>
                  </div>
                )}

                {produto.tecnicas && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Técnicas Utilizadas</h3>
                    <p className="text-gray-700">{produto.tecnicas.join(', ')}</p>
                  </div>
                )}

                {produto.cuidados && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cuidados</h3>
                    <p className="text-gray-700 whitespace-pre-line">{produto.cuidados}</p>
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
              <h2 className="text-2xl font-bold mb-6">Sobre a Associação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{produto.associacao.nome}</h3>
                  {produto.associacao.descricao && (
                    <p className="text-gray-700 mb-4">{produto.associacao.descricao}</p>
                  )}
                  {produto.associacao.sobre && (
                    <p className="text-gray-700">{produto.associacao.sobre}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {produto.associacao.endereco && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="text-gray-700">{produto.associacao.endereco}</span>
                    </div>
                  )}
                  {produto.associacao.telefone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{produto.associacao.telefone}</span>
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
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relacionados.map((prod: any) => (
                <Link key={prod._id} href={`/produto/${prod.slug.current}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100 relative">
                      {prod.imagens?.[0] && (
                        <Image
                          src={prod.imagens[0].asset.url}
                          alt={prod.nome}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{prod.nome}</h3>
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
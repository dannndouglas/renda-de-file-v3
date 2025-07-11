import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { ASSOCIACAO_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { AssociacaoHeader } from '@/components/associacao/AssociacaoHeader';
import { AssociacaoMaps } from '@/components/associacao/AssociacaoMaps';
import { AssociacaoGallery } from '@/components/associacao/AssociacaoGallery';
import { WhatsAppContactButton } from '@/components/associacao/WhatsAppContactButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  Users,
  Package,
  Instagram,
  Facebook,
  Globe,
  Award,
  Building2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';
import type { Associacao } from '@/lib/sanity/types';

interface AssociacaoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getAssociacao(slug: string): Promise<Associacao | null> {
  try {
    const associacao = await sanityClient.fetch(ASSOCIACAO_BY_SLUG_QUERY, {
      slug,
    });
    return associacao;
  } catch (error) {
    console.error(`Erro ao buscar associação ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const associacoes = await sanityClient.fetch(
      `*[_type == "associacao" && ativo == true && defined(slug.current)] {
        "slug": slug.current
      }`
    );

    // Pré-renderizar páginas para todas as associações ativas

    return associacoes.map((associacao: { slug: string }) => ({
      slug: associacao.slug,
    }));
  } catch (error) {
    console.error('[generateStaticParams] Erro ao buscar associações:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: AssociacaoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const associacao = await getAssociacao(slug);

  if (!associacao) {
    return {
      title: 'Associação não encontrada',
    };
  }

  return {
    title: `${associacao.nome} | Renda de Filé`,
    description: associacao.descricao,
    openGraph: {
      title: `${associacao.nome} | Renda de Filé`,
      description: associacao.descricao,
      images: associacao.banner
        ? [urlForImage(associacao.banner, { width: 1200, height: 630 }) || '']
        : [],
    },
  };
}

// Configurar ISR - revalidar a cada 1 hora
export const revalidate = 3600;

export default async function AssociacaoPage({ params }: AssociacaoPageProps) {
  const { slug } = await params;
  const associacao = await getAssociacao(slug);

  if (!associacao) {
    notFound();
  }

  const enderecoCompleto = associacao.endereco
    ? `${associacao.endereco.rua || ''}, ${associacao.endereco.numero || 's/n'} - ${associacao.endereco.bairro || ''}, ${associacao.endereco.cidade || ''}/${associacao.endereco.estado || ''}`
    : 'Endereço não disponível';

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Header com foto de capa */}
      <AssociacaoHeader associacao={associacao} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Conteúdo principal */}
          <main className="lg:col-span-8" role="main">
            {/* Informações da associação */}
            <section aria-labelledby="about-section">
              <Card className="mb-8 border-0 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="rounded-lg bg-amber-100 p-2">
                      <Building2 className="h-6 w-6 text-amber-600" aria-hidden="true" />
                    </div>
                    <h2 id="about-section" className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Sobre a {associacao.nome}
                    </h2>
                  </CardTitle>
                </CardHeader>
              <CardContent className="pt-0">
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-amber-600 first-letter:leading-none">
                    {associacao.descricao}
                  </p>

                  {associacao.historia && (
                    <div className="mt-8 border-t pt-8">
                      <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-gray-900">
                        <div className="h-1 w-12 rounded bg-gradient-to-r from-amber-500 to-orange-500"></div>
                        Nossa História
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {associacao.historia}
                      </p>
                    </div>
                  )}
                </div>
                </CardContent>
              </Card>
            </section>

            {/* Produtos da associação */}
            {associacao.produtos && associacao.produtos.length > 0 && (
              <section aria-labelledby="products-section">
                <Card className="mb-8 border-0 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="rounded-lg bg-orange-100 p-2">
                        <Package className="h-6 w-6 text-orange-600" aria-hidden="true" />
                      </div>
                      <h2 id="products-section" className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Nossos Produtos
                      </h2>
                      <Badge variant="secondary" className="ml-auto">
                        {associacao.produtos.length} itens
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {associacao.produtos.slice(0, 6).map((produto) => (
                      <Link
                        key={produto._id}
                        href={`/produto/${produto.slug.current}`}
                        className="group"
                      >
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                          {produto.imagens && produto.imagens[0] && (
                            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                              <Image
                                src={
                                  urlForImage(produto.imagens[0], {
                                    width: 400,
                                    height: 400,
                                  }) || ''
                                }
                                alt={produto.nome}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                          )}
                          <div className="p-4">
                            <h4 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-amber-600">
                              {produto.nome}
                            </h4>
                            {produto.preco && (
                              <p className="mt-2 text-lg font-bold text-orange-600">
                                R$ {produto.preco.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {associacao.produtos.length > 6 && (
                    <div className="mt-8 text-center">
                      <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                        <Link href={`/catalogo?associacao=${associacao._id}`}>
                          Ver todos os {associacao.produtos.length} produtos
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4" role="complementary" aria-label="Informações de contato e mapa">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-8">
              {/* Informações de contato */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Contato
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                {associacao.telefone && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="font-medium text-gray-900">{associacao.telefone}</p>
                    </div>
                  </div>
                )}

                {associacao.email && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">E-mail</p>
                      <a
                        href={`mailto:${associacao.email}`}
                        className="font-medium text-amber-600 transition-colors hover:text-amber-700"
                      >
                        {associacao.email}
                      </a>
                    </div>
                  </div>
                )}

                {associacao.numeroMembros && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Membros</p>
                      <p className="font-medium text-gray-900">{associacao.numeroMembros} artesãs</p>
                    </div>
                  </div>
                )}

                {/* Redes sociais */}
                {(associacao.redesSociais?.instagram ||
                  associacao.redesSociais?.facebook ||
                  associacao.redesSociais?.website) && (
                  <div className="rounded-lg border-t bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-900">
                      <Globe className="h-4 w-4" />
                      Redes Sociais
                    </h4>
                    <div className="flex gap-3">
                      {associacao.redesSociais?.instagram && (
                        <a
                          href={`https://instagram.com/${associacao.redesSociais.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-3 text-white transition-transform hover:scale-110"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {associacao.redesSociais?.facebook && (
                        <a
                          href={associacao.redesSociais.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white transition-transform hover:scale-110"
                          aria-label="Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {associacao.redesSociais?.website && (
                        <a
                          href={associacao.redesSociais.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gradient-to-br from-gray-500 to-gray-600 p-3 text-white transition-transform hover:scale-110"
                          aria-label="Website"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Especialidades */}
                {associacao.especialidades &&
                  associacao.especialidades.length > 0 && (
                    <div className="rounded-lg border-t bg-gradient-to-r from-amber-50 to-orange-50 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-600" />
                        <h4 className="text-sm font-medium text-gray-900">
                          Especialidades
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {associacao.especialidades.map(
                          (especialidade, index) => (
                            <Badge
                              key={index}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                            >
                              {especialidade}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>

              {/* Botão WhatsApp */}
              {associacao.whatsapp && (
                <WhatsAppContactButton associacao={associacao} />
              )}

              {/* Mapa */}
              <AssociacaoMaps
                endereco={enderecoCompleto}
                nomeAssociacao={associacao.nome}
              />
            </div>
          </aside>
        </div>

        {/* Galeria de imagens */}
        {associacao.galeria && associacao.galeria.length > 0 && (
          <section className="mt-12" aria-labelledby="gallery-section">
            <AssociacaoGallery
              galeria={associacao.galeria}
              nomeAssociacao={associacao.nome}
            />
          </section>
        )}
      </div>
    </main>
  );
}

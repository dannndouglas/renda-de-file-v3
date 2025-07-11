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
    <main className="min-h-screen">
      {/* Header com foto de capa */}
      <AssociacaoHeader associacao={associacao} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            {/* Informações da associação */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Building2 className="h-6 w-6" />
                  Sobre a {associacao.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 leading-relaxed text-gray-700">
                  {associacao.descricao}
                </p>

                {associacao.historia && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">História</h3>
                    <p className="leading-relaxed text-gray-700">
                      {associacao.historia}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Produtos da associação */}
            {associacao.produtos && associacao.produtos.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Package className="h-6 w-6" />
                    Produtos ({associacao.produtos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {associacao.produtos.slice(0, 6).map((produto) => (
                      <Link
                        key={produto._id}
                        href={`/produto/${produto.slug.current}`}
                      >
                        <div className="group cursor-pointer overflow-hidden rounded-lg border transition-all hover:shadow-md">
                          {produto.imagens && produto.imagens[0] && (
                            <div className="relative aspect-square bg-gray-100">
                              <Image
                                src={
                                  urlForImage(produto.imagens[0], {
                                    width: 300,
                                    height: 300,
                                  }) || ''
                                }
                                alt={produto.nome}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-amber-600">
                              {produto.nome}
                            </h4>
                            {produto.preco && (
                              <p className="mt-1 text-sm text-gray-600">
                                R$ {produto.preco.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {associacao.produtos.length > 6 && (
                    <div className="mt-6 text-center">
                      <Button asChild>
                        <Link href={`/catalogo?associacao=${associacao._id}`}>
                          Ver todos os produtos
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações de contato */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {associacao.telefone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>{associacao.telefone}</span>
                  </div>
                )}

                {associacao.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <a
                      href={`mailto:${associacao.email}`}
                      className="text-amber-600 transition-colors hover:text-amber-700"
                    >
                      {associacao.email}
                    </a>
                  </div>
                )}

                {associacao.numeroMembros && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>{associacao.numeroMembros} membros</span>
                  </div>
                )}

                {/* Redes sociais */}
                {(associacao.redesSociais?.instagram ||
                  associacao.redesSociais?.facebook ||
                  associacao.redesSociais?.website) && (
                  <div className="border-t pt-4">
                    <h4 className="mb-3 text-sm font-medium text-gray-900">
                      Redes Sociais
                    </h4>
                    <div className="flex gap-3">
                      {associacao.redesSociais?.instagram && (
                        <a
                          href={`https://instagram.com/${associacao.redesSociais.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-pink-500"
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
                          className="text-gray-400 transition-colors hover:text-blue-500"
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
                          className="text-gray-400 transition-colors hover:text-gray-600"
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
                    <div className="border-t pt-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-gray-500" />
                        <h4 className="text-sm font-medium text-gray-900">
                          Especialidades
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {associacao.especialidades.map(
                          (especialidade, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
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
        </div>

        {/* Galeria de imagens */}
        {associacao.galeria && associacao.galeria.length > 0 && (
          <div className="mt-12">
            <AssociacaoGallery
              galeria={associacao.galeria}
              nomeAssociacao={associacao.nome}
            />
          </div>
        )}
      </div>
    </main>
  );
}

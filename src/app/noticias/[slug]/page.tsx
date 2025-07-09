import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import {
  NOTICIA_BY_SLUG_QUERY,
  NOTICIAS_RELACIONADAS_QUERY,
} from '@/lib/sanity/queries';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PortableText } from '@portabletext/react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
} from '@/components/seo/SEOMetadata';

interface NoticiaDetalhes {
  _id: string;
  titulo: string;
  resumo: string;
  slug: { current: string };
  imagemPrincipal: any;
  categoria: 'novidade' | 'evento' | 'historia' | 'tecnica';
  dataPublicacao: string;
  autor: {
    nome: string;
    avatar?: any;
    bio?: string;
  };
  tags?: string[];
  destaque?: boolean;
  tempoLeitura?: number;
  conteudo: any;
  galeria?: any[];
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getNoticia(slug: string): Promise<NoticiaDetalhes | null> {
  try {
    const noticia = await sanityClient.fetch(NOTICIA_BY_SLUG_QUERY, { slug });
    return noticia || null;
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return null;
  }
}

async function getNoticiasRelacionadas(
  categoria: string,
  atualId: string
): Promise<NoticiaDetalhes[]> {
  try {
    const noticias = await sanityClient.fetch(NOTICIAS_RELACIONADAS_QUERY, {
      categoria,
      atualId,
    });
    return noticias || [];
  } catch (error) {
    console.error('Erro ao buscar notícias relacionadas:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticia(slug);

  if (!noticia) {
    return {
      title: 'Notícia não encontrada | Renda de Filé',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rendadefile.org.br';

  return generateSEOMetadata({
    title: noticia.titulo,
    description: noticia.resumo,
    keywords: [
      'renda de filé',
      'notícias',
      'artesanato',
      'ceará',
      noticia.categoria,
      ...(noticia.tags || []),
    ],
    ogImage: noticia.imagemPrincipal?.asset?.url,
    ogType: 'article',
    canonicalUrl: `${siteUrl}/noticias/${slug}`,
    author: noticia.autor.nome,
    publishedTime: noticia.dataPublicacao,
    section: noticia.categoria,
    tags: noticia.tags,
  });
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);

  if (!noticia) {
    notFound();
  }

  const noticiasRelacionadas = await getNoticiasRelacionadas(
    noticia.categoria,
    noticia._id
  );

  return (
    <PublicLayout>
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/noticias"
              className="flex items-center gap-2 text-amber-600 transition-colors hover:text-amber-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Notícias
            </Link>
          </nav>

          {/* Artigo Principal */}
          <article className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <Badge className="bg-amber-600 text-white">
                  {noticia.categoria}
                </Badge>
                {noticia.tags && (
                  <div className="flex flex-wrap gap-2">
                    {noticia.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <h1 className="mb-4 text-4xl font-bold text-amber-900">
                {noticia.titulo}
              </h1>

              <p className="mb-6 text-xl text-amber-700">{noticia.resumo}</p>

              {/* Meta informações */}
              <div className="mb-6 flex items-center gap-6 text-sm text-amber-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{noticia.autor.nome}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(noticia.dataPublicacao), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
                {noticia.tempoLeitura && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{noticia.tempoLeitura} min de leitura</span>
                  </div>
                )}
              </div>

              {/* Imagem Principal */}
              <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
                <OptimizedImage
                  src={noticia.imagemPrincipal}
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </header>

            {/* Conteúdo */}
            <div className="prose prose-lg prose-amber mb-12 max-w-none">
              <PortableText value={noticia.conteudo} />
            </div>

            {/* Galeria (se houver) */}
            {noticia.galeria && noticia.galeria.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-amber-900">
                  Galeria de Imagens
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {noticia.galeria.map((imagem, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg"
                    >
                      <OptimizedImage
                        src={imagem}
                        alt={`Galeria ${index + 1}`}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Autor */}
            <div className="mb-12 border-t border-amber-200 pt-8">
              <div className="flex items-start gap-4">
                {noticia.autor.avatar && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <OptimizedImage
                      src={noticia.autor.avatar}
                      alt={noticia.autor.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-900">
                    {noticia.autor.nome}
                  </h3>
                  {noticia.autor.bio && (
                    <p className="text-sm text-amber-700">
                      {noticia.autor.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Compartilhar */}
            <div className="mb-12 border-t border-amber-200 pt-8">
              <div className="flex items-center gap-4">
                <Share2 className="h-5 w-5 text-amber-600" />
                <span className="text-amber-700">Compartilhar:</span>
                <button className="rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700">
                  Copiar Link
                </button>
              </div>
            </div>
          </article>

          {/* Notícias Relacionadas */}
          {noticiasRelacionadas.length > 0 && (
            <section className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-2xl font-bold text-amber-900">
                Notícias Relacionadas
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {noticiasRelacionadas.map((relacionada) => (
                  <Card
                    key={relacionada._id}
                    className="overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-video">
                      <OptimizedImage
                        src={relacionada.imagemPrincipal}
                        alt={relacionada.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-amber-900 transition-colors hover:text-amber-700">
                        <Link href={`/noticias/${relacionada.slug.current}`}>
                          {relacionada.titulo}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-amber-600">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {formatDistanceToNow(
                            new Date(relacionada.dataPublicacao),
                            {
                              addSuffix: true,
                              locale: ptBR,
                            }
                          )}
                        </div>
                        {relacionada.tempoLeitura && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {relacionada.tempoLeitura} min
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm text-amber-700">
                        {relacionada.resumo}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}

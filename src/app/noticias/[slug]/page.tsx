import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { NOTICIA_BY_SLUG_QUERY, NOTICIAS_RELACIONADAS_QUERY } from '@/lib/sanity/queries';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PortableText } from '@portabletext/react';

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

async function getNoticiasRelacionadas(categoria: string, atualId: string): Promise<NoticiaDetalhes[]> {
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

  return {
    title: `${noticia.titulo} | Renda de Filé`,
    description: noticia.resumo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      type: 'article',
      publishedTime: noticia.dataPublicacao,
      authors: [noticia.autor.nome],
      tags: noticia.tags,
    },
  };
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
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/noticias"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Notícias
          </Link>
        </nav>

        {/* Artigo Principal */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
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

            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              {noticia.titulo}
            </h1>

            <p className="text-xl text-amber-700 mb-6">
              {noticia.resumo}
            </p>

            {/* Meta informações */}
            <div className="flex items-center gap-6 text-sm text-amber-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{noticia.autor.nome}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>
                  {formatDistanceToNow(new Date(noticia.dataPublicacao), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
              {noticia.tempoLeitura && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{noticia.tempoLeitura} min de leitura</span>
                </div>
              )}
            </div>

            {/* Imagem Principal */}
            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
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
          <div className="prose prose-lg prose-amber max-w-none mb-12">
            <PortableText value={noticia.conteudo} />
          </div>

          {/* Galeria (se houver) */}
          {noticia.galeria && noticia.galeria.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Galeria de Imagens
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {noticia.galeria.map((imagem, index) => (
                  <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={imagem}
                      alt={`Galeria ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Autor */}
          <div className="border-t border-amber-200 pt-8 mb-12">
            <div className="flex items-start gap-4">
              {noticia.autor.avatar && (
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <OptimizedImage
                    src={noticia.autor.avatar}
                    alt={noticia.autor.nome}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  {noticia.autor.nome}
                </h3>
                {noticia.autor.bio && (
                  <p className="text-amber-700 text-sm">
                    {noticia.autor.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Compartilhar */}
          <div className="border-t border-amber-200 pt-8 mb-12">
            <div className="flex items-center gap-4">
              <Share2 className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700">Compartilhar:</span>
              <button className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors">
                Copiar Link
              </button>
            </div>
          </div>
        </article>

        {/* Notícias Relacionadas */}
        {noticiasRelacionadas.length > 0 && (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-8">
              Notícias Relacionadas
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {noticiasRelacionadas.map((relacionada) => (
                <Card key={relacionada._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={relacionada.imagemPrincipal}
                      alt={relacionada.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-amber-900 hover:text-amber-700 transition-colors text-lg">
                      <Link href={`/noticias/${relacionada.slug.current}`}>
                        {relacionada.titulo}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-amber-600">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDistanceToNow(new Date(relacionada.dataPublicacao), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                      {relacionada.tempoLeitura && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {relacionada.tempoLeitura} min
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 text-sm line-clamp-3">
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
  );
}
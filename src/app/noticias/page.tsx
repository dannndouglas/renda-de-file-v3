import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { NOTICIAS_QUERY } from '@/lib/sanity/queries';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'Notícias | Renda de Filé',
  description: 'Acompanhe as últimas notícias e novidades sobre a Renda de Filé do Ceará',
};

interface Noticia {
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
  };
  tags?: string[];
  destaque?: boolean;
  tempoLeitura?: number;
}

async function getNoticias(): Promise<Noticia[]> {
  try {
    const noticias = await sanityClient.fetch(NOTICIAS_QUERY);
    return noticias || [];
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  if (noticias.length === 0) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-amber-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-amber-900 mb-4">
                Notícias da Renda de Filé
              </h1>
              <p className="text-amber-700 mb-8">
                Em breve, novidades sobre a tradição da Renda de Filé
              </p>
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <div className="text-center text-amber-600">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Novidades em Breve
                    </h3>
                    <p className="text-sm">
                      Estamos preparando conteúdo especial sobre a história, técnicas e eventos da Renda de Filé.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Separar notícias em destaque e regulares
  const noticiasDestaque = noticias.filter(n => n.destaque);
  const noticiasRegulares = noticias.filter(n => !n.destaque);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Notícias da Renda de Filé
          </h1>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Acompanhe as últimas novidades, eventos e histórias sobre a tradição da Renda de Filé do Ceará
          </p>
        </div>

        {/* Notícias em Destaque */}
        {noticiasDestaque.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Destaques
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {noticiasDestaque.map((noticia) => (
                <Card key={noticia._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={noticia.imagemPrincipal}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                    />
                    {noticia.categoria && (
                      <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                        {noticia.categoria}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-amber-900 hover:text-amber-700 transition-colors">
                      <Link href={`/noticias/${noticia.slug.current}`}>
                        {noticia.titulo}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-amber-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {noticia.autor.nome}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDistanceToNow(new Date(noticia.dataPublicacao), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                      {noticia.tempoLeitura && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {noticia.tempoLeitura} min
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 mb-4">{noticia.resumo}</p>
                    {noticia.tags && (
                      <div className="flex flex-wrap gap-2">
                        {noticia.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Todas as Notícias */}
        <section>
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Todas as Notícias
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {noticiasRegulares.map((noticia) => (
              <Card key={noticia._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <OptimizedImage
                    src={noticia.imagemPrincipal}
                    alt={noticia.titulo}
                    fill
                    className="object-cover"
                  />
                  {noticia.categoria && (
                    <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                      {noticia.categoria}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-amber-900 hover:text-amber-700 transition-colors text-lg">
                    <Link href={`/noticias/${noticia.slug.current}`}>
                      {noticia.titulo}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-amber-600">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {formatDistanceToNow(new Date(noticia.dataPublicacao), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </div>
                    {noticia.tempoLeitura && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {noticia.tempoLeitura} min
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 text-sm line-clamp-3">{noticia.resumo}</p>
                  {noticia.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {noticia.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-amber-100 rounded-lg">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Quer ficar por dentro das novidades?
          </h3>
          <p className="text-amber-700 mb-6">
            Acompanhe nosso trabalho e descubra mais sobre a tradição da Renda de Filé
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/associacoes"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Conhecer Associações
            </Link>
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-white text-amber-900 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
        </div>
      </div>
    </PublicLayout>
  );
}
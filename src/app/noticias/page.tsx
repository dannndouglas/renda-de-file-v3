import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { NOTICIAS_QUERY } from '@/lib/sanity/queries';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import { CalendarDays, Clock, User, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'Notícias | Renda de Filé',
  description:
    'Acompanhe as últimas notícias e novidades sobre a Renda de Filé do Ceará',
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
        <PageHeader
          title="Notícias e Novidades"
          subtitle="Fique por Dentro"
          description="Em breve, novidades sobre a tradição da Renda de Filé"
          variant="soft"
        />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-md">
              <CardContent className="p-6">
                <div className="text-center text-renda-600">
                  <CalendarDays className="mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Novidades em Breve
                  </h3>
                  <p className="text-sm">
                    Estamos preparando conteúdo especial sobre a história,
                    técnicas e eventos da Renda de Filé.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Separar notícias em destaque e regulares
  const noticiasDestaque = noticias.filter((n) => n.destaque);
  const noticiasRegulares = noticias.filter((n) => !n.destaque);

  return (
    <PublicLayout>
      <PageHeader
        title="Notícias e Novidades"
        subtitle="Fique por Dentro"
        description="Acompanhe as últimas novidades, eventos e histórias sobre a tradição da Renda de Filé do Ceará"
        variant="soft"
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Notícias em Destaque */}
          {noticiasDestaque.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-renda-900">
                Destaques
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {noticiasDestaque.map((noticia) => (
                  <Card
                    key={noticia._id}
                    className="overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-video">
                      <OptimizedImage
                        src={noticia.imagemPrincipal}
                        alt={noticia.titulo}
                        fill
                        className="object-cover"
                      />
                      {noticia.categoria && (
                        <Badge className="absolute left-4 top-4 bg-renda-600 text-white">
                          {noticia.categoria}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-renda-900 transition-colors hover:text-renda-700">
                        <Link href={`/noticias/${noticia.slug.current}`}>
                          {noticia.titulo}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-renda-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {noticia.autor.nome}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {formatDistanceToNow(
                            new Date(noticia.dataPublicacao),
                            {
                              addSuffix: true,
                              locale: ptBR,
                            }
                          )}
                        </div>
                        {noticia.tempoLeitura && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {noticia.tempoLeitura} min
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-renda-700">{noticia.resumo}</p>
                      {noticia.tags && (
                        <div className="flex flex-wrap gap-2">
                          {noticia.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
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
            <h2 className="mb-6 text-2xl font-bold text-renda-900">
              Todas as Notícias
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {noticiasRegulares.map((noticia) => (
                <Card
                  key={noticia._id}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <OptimizedImage
                      src={noticia.imagemPrincipal}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                    />
                    {noticia.categoria && (
                      <Badge className="absolute left-4 top-4 bg-renda-600 text-white">
                        {noticia.categoria}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-renda-900 transition-colors hover:text-renda-700">
                      <Link href={`/noticias/${noticia.slug.current}`}>
                        {noticia.titulo}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-renda-600">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {formatDistanceToNow(new Date(noticia.dataPublicacao), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                      {noticia.tempoLeitura && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {noticia.tempoLeitura} min
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-renda-700">
                      {noticia.resumo}
                    </p>
                    {noticia.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {noticia.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
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
          <div className="mt-12">
            <CallToActionSection
              subtitle="Fique Por Dentro"
              title="Quer acompanhar as novidades?"
              description="Acompanhe nosso trabalho e descubra mais sobre a tradição da Renda de Filé. Mantenha-se informado sobre eventos, técnicas e as histórias por trás desta arte única."
              variant="gradient"
              buttons={[
                {
                  text: 'Conhecer Associações',
                  href: '/associacoes',
                  variant: 'secondary',
                  icon: Users,
                },
                {
                  text: 'Ver Catálogo',
                  href: '/catalogo',
                  variant: 'outline',
                  icon: ShoppingBag,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

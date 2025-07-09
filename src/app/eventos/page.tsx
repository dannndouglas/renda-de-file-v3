import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { EVENTOS_QUERY } from '@/lib/sanity/queries';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO, isFuture, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'Eventos | Renda de Filé',
  description:
    'Acompanhe os eventos, workshops e encontros sobre a Renda de Filé do Ceará',
};

interface Evento {
  _id: string;
  titulo: string;
  descricao: string;
  slug: { current: string };
  imagemPrincipal: any;
  dataInicio: string;
  dataFim?: string;
  horario: string;
  local: {
    nome: string;
    endereco: string;
    cidade: string;
    estado: string;
  };
  organizador: {
    nome: string;
    contato?: string;
  };
  tipo: 'workshop' | 'feira' | 'exposicao' | 'encontro' | 'curso';
  preco?: number;
  gratuito: boolean;
  inscricaoObrigatoria: boolean;
  linkInscricao?: string;
  capacidade?: number;
  destaque?: boolean;
  tags?: string[];
}

async function getEventos(): Promise<Evento[]> {
  try {
    const eventos = await sanityClient.fetch(EVENTOS_QUERY);
    return eventos || [];
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return [];
  }
}

export default async function EventosPage() {
  const eventos = await getEventos();

  if (eventos.length === 0) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-amber-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-amber-900">
                Eventos da Renda de Filé
              </h1>
              <p className="mb-8 text-amber-700">
                Em breve, eventos e workshops sobre a tradição da Renda de Filé
              </p>
              <Card className="mx-auto max-w-md">
                <CardContent className="p-6">
                  <div className="text-center text-amber-600">
                    <CalendarDays className="mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">
                      Eventos em Breve
                    </h3>
                    <p className="text-sm">
                      Estamos organizando workshops, feiras e encontros para
                      promover a Renda de Filé.
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

  // Separar eventos por status
  const eventosAtivos = eventos.filter((e) => isFuture(parseISO(e.dataInicio)));
  const eventosPassados = eventos.filter((e) => isPast(parseISO(e.dataInicio)));
  const eventosDestaque = eventos.filter((e) => e.destaque);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-amber-900">
            Eventos da Renda de Filé
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-amber-700">
            Participe de workshops, feiras e encontros que celebram e preservam
            a tradição da Renda de Filé do Ceará
          </p>
        </div>

        {/* Eventos em Destaque */}
        {eventosDestaque.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-amber-900">
              Eventos em Destaque
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {eventosDestaque.map((evento) => (
                <Card
                  key={evento._id}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <Badge className="bg-amber-600 text-white">
                        {evento.tipo}
                      </Badge>
                      {evento.gratuito && (
                        <Badge className="bg-green-600 text-white">
                          Gratuito
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-amber-900 transition-colors hover:text-amber-700">
                      <Link href={`/eventos/${evento.slug.current}`}>
                        {evento.titulo}
                      </Link>
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{evento.horario}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {evento.local.nome}, {evento.local.cidade}
                        </span>
                      </div>
                      {evento.capacidade && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Até {evento.capacidade} participantes</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-amber-700">
                      {evento.descricao}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-amber-600">
                        Organizador: {evento.organizador.nome}
                      </div>
                      {evento.linkInscricao && (
                        <Link
                          href={evento.linkInscricao}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Inscrever-se
                        </Link>
                      )}
                    </div>

                    {evento.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {evento.tags.map((tag) => (
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

        {/* Próximos Eventos */}
        {eventosAtivos.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-amber-900">
              Próximos Eventos
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventosAtivos.map((evento) => (
                <Card
                  key={evento._id}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-video">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <Badge className="bg-amber-600 text-white">
                        {evento.tipo}
                      </Badge>
                      {evento.gratuito && (
                        <Badge className="bg-green-600 text-white">
                          Gratuito
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-900 transition-colors hover:text-amber-700">
                      <Link href={`/eventos/${evento.slug.current}`}>
                        {evento.titulo}
                      </Link>
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{evento.local.cidade}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-2 text-sm text-amber-700">
                      {evento.descricao}
                    </p>

                    {evento.linkInscricao && (
                      <Link
                        href={evento.linkInscricao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1 rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Inscrever-se
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Eventos Passados */}
        {eventosPassados.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-amber-900">
              Eventos Anteriores
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventosPassados.map((evento) => (
                <Card
                  key={evento._id}
                  className="overflow-hidden opacity-75 transition-opacity hover:opacity-100"
                >
                  <div className="relative aspect-video">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-gray-600 text-white">
                        Finalizado
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-amber-900">
                      {evento.titulo}
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{evento.local.cidade}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-amber-700">
                      {evento.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="mt-12 rounded-lg bg-amber-100 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-amber-900">
            Organize um Evento
          </h3>
          <p className="mb-6 text-amber-700">
            Tem interesse em organizar um workshop ou evento sobre Renda de
            Filé?
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/associacoes"
              className="rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
            >
              Fale com as Associações
            </Link>
            <Link
              href="/historia"
              className="rounded-lg border border-amber-600 bg-white px-6 py-3 text-amber-900 transition-colors hover:bg-amber-50"
            >
              Conheça a História
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

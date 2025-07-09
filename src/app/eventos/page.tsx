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

export const metadata: Metadata = {
  title: 'Eventos | Renda de Filé',
  description: 'Acompanhe os eventos, workshops e encontros sobre a Renda de Filé do Ceará',
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
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Eventos da Renda de Filé
            </h1>
            <p className="text-amber-700 mb-8">
              Em breve, eventos e workshops sobre a tradição da Renda de Filé
            </p>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="text-center text-amber-600">
                  <CalendarDays className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Eventos em Breve
                  </h3>
                  <p className="text-sm">
                    Estamos organizando workshops, feiras e encontros para promover a Renda de Filé.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Separar eventos por status
  const eventosAtivos = eventos.filter(e => isFuture(parseISO(e.dataInicio)));
  const eventosPassados = eventos.filter(e => isPast(parseISO(e.dataInicio)));
  const eventosDestaque = eventos.filter(e => e.destaque);

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Eventos da Renda de Filé
          </h1>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Participe de workshops, feiras e encontros que celebram e preservam a tradição da Renda de Filé do Ceará
          </p>
        </div>

        {/* Eventos em Destaque */}
        {eventosDestaque.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Eventos em Destaque
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {eventosDestaque.map((evento) => (
                <Card key={evento._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
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
                    <CardTitle className="text-amber-900 hover:text-amber-700 transition-colors">
                      <Link href={`/eventos/${evento.slug.current}`}>
                        {evento.titulo}
                      </Link>
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{evento.horario}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.local.nome}, {evento.local.cidade}</span>
                      </div>
                      {evento.capacidade && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Até {evento.capacidade} participantes</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 mb-4 line-clamp-3">
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
                          className="flex items-center gap-1 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Inscrever-se
                        </Link>
                      )}
                    </div>

                    {evento.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {evento.tags.map((tag) => (
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

        {/* Próximos Eventos */}
        {eventosAtivos.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Próximos Eventos
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventosAtivos.map((evento) => (
                <Card key={evento._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
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
                    <CardTitle className="text-amber-900 hover:text-amber-700 transition-colors text-lg">
                      <Link href={`/eventos/${evento.slug.current}`}>
                        {evento.titulo}
                      </Link>
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.local.cidade}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 text-sm line-clamp-2 mb-4">
                      {evento.descricao}
                    </p>
                    
                    {evento.linkInscricao && (
                      <Link
                        href={evento.linkInscricao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors w-full justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
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
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Eventos Anteriores
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventosPassados.map((evento) => (
                <Card key={evento._id} className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                  <div className="aspect-video relative">
                    <OptimizedImage
                      src={evento.imagemPrincipal}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gray-600 text-white">
                        Finalizado
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-amber-900 text-lg">
                      {evento.titulo}
                    </CardTitle>
                    <div className="space-y-2 text-sm text-amber-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                          {format(parseISO(evento.dataInicio), 'PPP', { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.local.cidade}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 text-sm line-clamp-2">
                      {evento.descricao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-amber-100 rounded-lg">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Organize um Evento
          </h3>
          <p className="text-amber-700 mb-6">
            Tem interesse em organizar um workshop ou evento sobre Renda de Filé?
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/associacoes"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Fale com as Associações
            </Link>
            <Link
              href="/historia"
              className="px-6 py-3 bg-white text-amber-900 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Conheça a História
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
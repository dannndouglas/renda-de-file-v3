import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export const metadata: Metadata = {
  title: 'História - Renda de Filé',
  description:
    'Conheça a história centenária da Renda de Filé, patrimônio cultural de Jaguaribe, Ceará.',
};

const timelineEvents = [
  {
    year: '1700s',
    title: 'Origens da Renda de Filé',
    description:
      'A técnica da Renda de Filé chega ao Brasil através das colonizadoras portuguesas, encontrando em Jaguaribe solo fértil para se desenvolver.',
    icon: MapPin,
    color: 'bg-blue-500',
  },
  {
    year: '1800s',
    title: 'Expansão e Tradição',
    description:
      'A arte se espalha por toda a região, passando de mãe para filha e se tornando uma importante fonte de renda familiar.',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    year: '1950s',
    title: 'Primeiras Organizações',
    description:
      'Surgem os primeiros grupos organizados de rendeiras, estabelecendo técnicas padronizadas e fortalecendo a tradição.',
    icon: Award,
    color: 'bg-purple-500',
  },
  {
    year: '2000s',
    title: 'Reconhecimento Nacional',
    description:
      'A Renda de Filé ganha reconhecimento como patrimônio cultural brasileiro, valorizando ainda mais esta arte milenar.',
    icon: Award,
    color: 'bg-orange-500',
  },
  {
    year: '2024',
    title: 'Era Digital',
    description:
      'Com a criação desta plataforma, a Renda de Filé entra na era digital, conectando rendeiras com o mundo todo.',
    icon: Heart,
    color: 'bg-red-500',
  },
];

const techniques = [
  {
    name: 'Ponto Cheio',
    description: 'Técnica fundamental que cria áreas sólidas no tecido',
    difficulty: 'Básico',
  },
  {
    name: 'Ponto Vazio',
    description: 'Cria espaços vazios decorativos na malha',
    difficulty: 'Básico',
  },
  {
    name: 'Ponto Correntinha',
    description: 'Forma linhas decorativas e contornos',
    difficulty: 'Intermediário',
  },
  {
    name: 'Ponto Fantasia',
    description: 'Combinações complexas que criam padrões únicos',
    difficulty: 'Avançado',
  },
];

export default function HistoriaPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              A História da Renda de Filé
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Mais de 300 anos de tradição, arte e cultura preservados pelas
              mãos habilidosas das rendeiras de Jaguaribe, Ceará
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Desde 1700</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Jaguaribe, CE</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Patrimônio Cultural</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Introdução */}
        <section className="mb-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Uma Arte que Transcende Gerações
              </h2>
              <p className="mb-4 text-gray-600">
                A Renda de Filé é mais do que uma técnica artesanal; é um
                patrimônio cultural que conecta gerações de mulheres
                trabalhadoras em Jaguaribe, Ceará. Esta arte delicada, que
                combina habilidade manual com criatividade infinita, tem sido
                transmitida de mãe para filha há mais de três séculos.
              </p>
              <p className="mb-6 text-gray-600">
                Cada peça conta uma história única, refletindo não apenas a
                técnica apurada da rendeira, mas também suas experiências,
                sonhos e a rica cultura local. É uma forma de resistência
                cultural que se mantém viva e relevante na economia moderna.
              </p>
              <Link href="/associacoes">
                <Button size="lg" className="gap-2">
                  <Users className="h-5 w-5" />
                  Conheça as Rendeiras
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000"
                alt="Rendeira trabalhando na Renda de Filé"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Linha do Tempo
          </h2>
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-gray-300"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                      <Card
                        className={`${isLeft ? 'text-right' : 'text-left'}`}
                      >
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-3">
                            <Badge className={`${event.color} text-white`}>
                              {event.year}
                            </Badge>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-gray-600">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Ícone central */}
                    <div className="absolute left-1/2 flex h-12 w-12 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-gray-300 bg-white">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Técnicas */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Principais Técnicas
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techniques.map((technique, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {technique.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {technique.description}
                  </p>
                  <Badge
                    variant={
                      technique.difficulty === 'Básico'
                        ? 'default'
                        : technique.difficulty === 'Intermediário'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {technique.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Impacto Social */}
        <section className="mb-16 rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Impacto Social e Econômico
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600">
              A Renda de Filé vai muito além da arte: é uma fonte vital de renda
              para centenas de famílias em Jaguaribe e região
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Geração de Renda
              </h3>
              <p className="text-gray-600">
                Fonte principal de renda para mais de 500 famílias na região
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Preservação Cultural
              </h3>
              <p className="text-gray-600">
                Mantém viva uma tradição de mais de 300 anos
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Empoderamento Feminino
              </h3>
              <p className="text-gray-600">
                Proporciona autonomia financeira às mulheres da comunidade
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Faça Parte Desta História</h2>
          <p className="mb-6 text-lg opacity-90">
            Ao adquirir uma peça de Renda de Filé, você não apenas leva para
            casa uma obra de arte única, mas também contribui para a preservação
            desta tradição centenária.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/catalogo">
              <Button size="lg" variant="secondary">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/associacoes">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                Conhecer Rendeiras
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

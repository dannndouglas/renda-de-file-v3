'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { SectionTitle } from '@/components/ui/section-title';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Heart,
  Star,
  Package,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';

interface PaginaHistoria {
  titulo?: string;
  introducao?: string;
  imagemPrincipal?: any;
  timeline?: Array<{
    ano: string;
    titulo: string;
    descricao: string;
    icone?: string;
    imagem?: any;
  }>;
  tecnicas?: Array<{
    nome: string;
    descricao: string;
    dificuldade: string;
    imagem?: any;
  }>;
  impacto?: {
    texto?: string;
    estatisticas?: Array<{
      numero: number;
      label: string;
      icone?: string;
    }>;
  };
}

interface HistoriaClientProps {
  paginaHistoria?: PaginaHistoria | null;
}

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

export function HistoriaClient({ paginaHistoria }: HistoriaClientProps) {
  // Função para mapear ícone string para componente
  const getIconComponent = (iconName?: string) => {
    const iconMap: Record<string, any> = {
      calendar: Calendar,
      mappin: MapPin,
      users: Users,
      award: Award,
      heart: Heart,
      star: Star,
      package: Package,
    };
    return iconMap[iconName?.toLowerCase() || ''] || Award;
  };

  // Usar dados do Sanity se disponíveis, senão usar valores padrão
  const timelineData =
    paginaHistoria?.timeline && paginaHistoria.timeline.length > 0
      ? paginaHistoria.timeline
      : timelineEvents;

  const tecnicasData =
    paginaHistoria?.tecnicas && paginaHistoria.tecnicas.length > 0
      ? paginaHistoria.tecnicas
      : techniques;
  return (
    <>
      {/* Introdução */}
      <section className="mb-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Uma Arte que Transcende Gerações
            </h2>
            <p className="mb-4 text-gray-600">
              A Renda de Filé é mais do que uma técnica artesanal; é um
              patrimônio cultural que conecta gerações de mulheres trabalhadoras
              em Jaguaribe, Ceará. Esta arte delicada, que combina habilidade
              manual com criatividade infinita, tem sido transmitida de mãe para
              filha há mais de três séculos.
            </p>
            <p className="mb-6 text-gray-600">
              Cada peça conta uma história única, refletindo não apenas a
              técnica apurada da rendeira, mas também suas experiências, sonhos
              e a rica cultura local. É uma forma de resistência cultural que se
              mantém viva e relevante na economia moderna.
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
              src={
                paginaHistoria?.imagemPrincipal
                  ? urlForImage(paginaHistoria.imagemPrincipal, {
                      width: 800,
                      height: 800,
                      quality: 90,
                    }) ||
                    paginaHistoria.imagemPrincipal?.asset?.url ||
                    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000'
                  : 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000'
              }
              alt={
                paginaHistoria?.imagemPrincipal?.alt ||
                'Rendeira trabalhando na Renda de Filé'
              }
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <SectionTitle
          title="Linha do Tempo"
          subtitle="Nossa Trajetória"
          description="A evolução de uma arte que atravessa séculos e continua viva nas mãos das rendeiras"
        />
        <div className="relative">
          {/* Linha vertical - oculta no mobile */}
          <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-gray-300 md:block"></div>

          {/* Linha vertical mobile - à esquerda */}
          <div className="absolute left-6 h-full w-0.5 bg-gray-300 md:hidden"></div>

          <div className="space-y-8 md:space-y-12">
            {timelineData.map((event: any, index: number) => {
              const Icon = paginaHistoria?.timeline
                ? getIconComponent(event.icone)
                : event.icon;
              const isLeft = index % 2 === 0;
              const year = paginaHistoria?.timeline ? event.ano : event.year;
              const title = paginaHistoria?.timeline
                ? event.titulo
                : event.title;
              const description = paginaHistoria?.timeline
                ? event.descricao
                : event.description;
              const color = paginaHistoria?.timeline
                ? 'bg-orange-500'
                : event.color;

              return (
                <div
                  key={index}
                  className={`flex items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}
                >
                  {/* Layout Mobile */}
                  <div className="w-full md:hidden md:w-1/2">
                    <div className="flex items-start gap-4">
                      {/* Ícone mobile */}
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-gray-300 bg-white">
                        <Icon className="h-6 w-6 text-gray-600" />
                      </div>

                      {/* Conteúdo mobile */}
                      <Card className="flex-1">
                        <CardContent className="p-4">
                          <div className="mb-3 flex flex-col gap-2">
                            <Badge className={`${color} w-fit text-white`}>
                              {year}
                            </Badge>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {title}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-600">
                            {description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Layout Desktop */}
                  <div
                    className={`hidden w-1/2 md:block ${isLeft ? 'pr-8' : 'pl-8'}`}
                  >
                    <Card className={`${isLeft ? 'text-right' : 'text-left'}`}>
                      <CardContent className="p-6">
                        <div
                          className={`mb-3 flex items-center gap-3 ${isLeft ? 'justify-end' : 'justify-start'}`}
                        >
                          <Badge className={`${color} text-white`}>
                            {year}
                          </Badge>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Ícone central desktop */}
                  <div className="absolute left-1/2 hidden h-12 w-12 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-gray-300 bg-white md:flex">
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
        <SectionTitle
          title="Principais Técnicas"
          subtitle="Arte e Maestria"
          description="Conheça as técnicas tradicionais que dão vida às peças de Renda de Filé"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tecnicasData.map((technique: any, index: number) => {
            const name = paginaHistoria?.tecnicas
              ? technique.nome
              : technique.name;
            const description = paginaHistoria?.tecnicas
              ? technique.descricao
              : technique.description;
            const difficulty = paginaHistoria?.tecnicas
              ? technique.dificuldade
              : technique.difficulty;

            return (
              <AnimatedCard key={index} delay={index * 0.1}>
                <CardContent className="p-6">
                  {paginaHistoria?.tecnicas && technique.imagem && (
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={
                          urlForImage(technique.imagem, {
                            width: 300,
                            height: 200,
                            quality: 85,
                          }) ||
                          technique.imagem?.asset?.url ||
                          ''
                        }
                        alt={technique.imagem?.alt || name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">{description}</p>
                  <Badge
                    variant={
                      difficulty === 'Básico' || difficulty === 'basico'
                        ? 'default'
                        : difficulty === 'Intermediário' ||
                            difficulty === 'intermediario'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {difficulty}
                  </Badge>
                </CardContent>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      {/* Impacto Social */}
      <section className="mb-16 rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Impacto Social e Econômico
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600">
            {paginaHistoria?.impacto?.texto ||
              'A Renda de Filé vai muito além da arte: é uma fonte vital de renda para centenas de famílias em Jaguaribe e região'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {paginaHistoria?.impacto?.estatisticas &&
          paginaHistoria.impacto.estatisticas.length > 0 ? (
            paginaHistoria.impacto.estatisticas.map((stat, index) => {
              const Icon = getIconComponent(stat.icone);
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                    <Icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {stat.numero}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <CallToActionSection
        subtitle="Faça Parte Desta História"
        title="Preserve uma Tradição Centenária"
        description="Ao adquirir uma peça de Renda de Filé, você não apenas leva para casa uma obra de arte única, mas também contribui para a preservação desta tradição centenária e fortalece a economia das comunidades locais."
        variant="geometric"
        buttons={[
          {
            text: 'Explorar Catálogo',
            href: '/catalogo',
            variant: 'secondary',
            icon: ShoppingBag,
          },
          {
            text: 'Conhecer Rendeiras',
            href: '/associacoes',
            variant: 'outline',
            icon: Users,
          },
        ]}
      />
    </>
  );
}

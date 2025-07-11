'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { StatsCard } from '@/components/ui/stats-card';
import { SectionTitle } from '@/components/ui/section-title';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import {
  MapPin,
  Phone,
  Users,
  Package,
  MessageCircle,
  Building,
  Mail,
  Instagram,
  Facebook,
  Globe,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';

interface AssociacoesClientProps {
  associacoes: any[];
}

export function AssociacoesClient({ associacoes }: AssociacoesClientProps) {
  return (
    <>
      {/* Stats */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard
          icon={Building}
          value={associacoes.length}
          label="Associações Ativas"
          delay={0.1}
        />
        <StatsCard
          icon={Users}
          value={associacoes.reduce(
            (acc: number, assoc: any) => acc + (assoc.numeroRendeiras || 0),
            0
          )}
          suffix="+"
          label="Rendeiras Cadastradas"
          delay={0.2}
        />
        <StatsCard
          icon={Package}
          value={associacoes.reduce(
            (acc: number, assoc: any) => acc + (assoc.produtosCount || 0),
            0
          )}
          suffix="+"
          label="Produtos Cadastrados"
          delay={0.3}
        />
      </div>

      {/* Associações Grid */}
      <SectionTitle
        title="Conheça Nossas Associações"
        description="Cada associação representa décadas de tradição e dedicação à arte da Renda de Filé"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {associacoes.map((associacao: any, index: number) => (
          <AnimatedCard
            key={associacao._id}
            delay={index * 0.1}
            className="overflow-hidden"
          >
            {(associacao.banner || associacao.imagem) && (
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={
                    urlForImage(associacao.banner || associacao.imagem, {
                      width: 640,
                      height: 360,
                      quality: 85,
                    }) || (associacao.banner || associacao.imagem)?.asset?.url
                  }
                  alt={associacao.nome}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{associacao.nome}</CardTitle>
              {associacao.dataFundacao && (
                <p className="text-sm text-gray-500">
                  Fundada em {new Date(associacao.dataFundacao).getFullYear()}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {associacao.descricao && (
                <p className="mb-4 line-clamp-3 text-gray-600">
                  {associacao.descricao}
                </p>
              )}

              <div className="mb-4 space-y-3">
                {associacao.numeroRendeiras && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{associacao.numeroRendeiras} rendeiras</span>
                  </div>
                )}

                {associacao.produtosCount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{associacao.produtosCount} produtos</span>
                  </div>
                )}

                {associacao.endereco && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span className="line-clamp-2">
                      {typeof associacao.endereco === 'string'
                        ? associacao.endereco
                        : `${associacao.endereco.rua}, ${associacao.endereco.numero} - ${associacao.endereco.bairro}, ${associacao.endereco.cidade}/${associacao.endereco.estado}`}
                    </span>
                  </div>
                )}

                {associacao.telefone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{associacao.telefone}</span>
                  </div>
                )}

                {associacao.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{associacao.email}</span>
                  </div>
                )}
              </div>

              {associacao.especialidades &&
                associacao.especialidades.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                      <Award className="h-4 w-4" />
                      <span className="font-medium">Especialidades:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {associacao.especialidades.map(
                        (especialidade: string, index: number) => (
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

              {(associacao.instagram ||
                associacao.facebook ||
                associacao.website) && (
                <div className="mb-4 flex gap-3">
                  {associacao.instagram && (
                    <a
                      href={associacao.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {associacao.facebook && (
                    <a
                      href={associacao.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {associacao.website && (
                    <a
                      href={associacao.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                      aria-label="Website"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}

              {associacao.presidente && (
                <p className="mb-4 text-sm text-gray-500">
                  Presidente: {associacao.presidente}
                </p>
              )}

              <div className="flex gap-2">
                {associacao.whatsapp && (
                  <Button size="sm" className="flex-1 gap-2" asChild>
                    <a
                      href={`https://wa.me/55${associacao.whatsapp.replace(/\D/g, '')}?text=Olá! Vi a associação ${associacao.nome} no site da Renda de Filé.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                )}
                <Link href={`/catalogo?associacao=${associacao._id}`}>
                  <Button size="sm" variant="outline">
                    Ver Produtos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16">
        <CallToActionSection
          subtitle="Seja Nossa Parceira"
          title="Quer se tornar uma associação parceira?"
          description="Se você faz parte de uma associação de rendeiras e deseja fazer parte da nossa plataforma, entre em contato conosco para saber mais sobre como participar e expandir seu alcance no mercado digital."
          variant="minimal"
          buttons={[
            {
              text: 'Entrar em Contato',
              href: 'mailto:contato@rendadefile.com.br',
              variant: 'default',
              icon: Mail,
            },
          ]}
        />
      </div>
    </>
  );
}

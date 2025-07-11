import { sanityClient } from '@/lib/sanity/client';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';
import type { Produto, Noticia } from '@/types/sanity';
import { Metadata } from 'next';
import ClientHomePage from './ClientHomePage';

export const metadata: Metadata = {
  title: 'Renda de Filé - Artesanato Tradicional de Jaguaribe',
  description:
    'Conheça a Renda de Filé, patrimônio cultural de mais de 300 anos. Produtos artesanais feitos pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará.',
};

const HOME_QUERY = `{
  "paginaInicial": *[_type == "paginaInicial"][0] {
    hero {
      titulo,
      subtitulo,
      imagem {
        asset->{
          _id,
          _type,
          url,
          metadata
        }
      },
      cta {
        texto,
        link
      }
    },
    sobre {
      titulo,
      texto,
      imagem {
        asset->{
          _id,
          _type,
          url,
          metadata
        }
      }
    },
    estatisticas[]{
      numero,
      label,
      icone
    }
  },
  "produtos": *[_type == "produto" && destaque == true] | order(_createdAt desc) [0...4] {
    _id,
    nome,
    slug,
    descricao,
    descricaoBreve,
    "imagens": imagens[]{
      _type,
      _key,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    categoria,
    disponibilidade,
    preco,
    precoPromocional,
    destaque,
    associacao->{
      _id,
      nome,
      slug,
      whatsapp,
      telefone
    }
  },
  "stats": {
    "rendeiras": count(*[_type == "associacao"]),
    "produtos": count(*[_type == "produto"]),
    "anos": 300
  },
  "noticias": *[_type == "noticia"] | order(dataPublicacao desc) [0...3] {
    _id,
    titulo,
    slug,
    resumo,
    "imagemPrincipal": imagemPrincipal{
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    categoria,
    dataPublicacao
  },
  "configuracoes": *[_type == "configuracoes"][0] {
    titulo,
    descricao,
    logo {
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    favicon {
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    contato {
      email,
      telefone,
      whatsapp,
      endereco {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep
      }
    },
    redesSociais {
      facebook,
      instagram,
      twitter,
      youtube
    }
  }
}`;

async function getHomeData() {
  try {
    const data = await sanityClient.fetch(
      HOME_QUERY,
      {},
      {
        next: { revalidate: 300 }, // Cache por 5 minutos
      }
    );
    return data;
  } catch (error) {
    console.error('[HOME] Erro ao buscar dados:', error);
    return {
      produtos: [],
      stats: { rendeiras: 0, produtos: 0, anos: 300 },
      noticias: [],
      paginaInicial: null,
      configuracoes: null,
    };
  }
}

export default async function HomePage() {
  const homeData = await getHomeData();
  return <ClientHomePage homeData={homeData} />;
}

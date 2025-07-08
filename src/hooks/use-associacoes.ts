import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '@/lib/sanity/client';
import { ASSOCIACOES_QUERY } from '@/lib/sanity/queries';
import { Associacao } from '@/lib/sanity/types';

export function useAssociacoes() {
  return useQuery({
    queryKey: ['associacoes'],
    queryFn: async () => {
      const associacoes = await sanityClient.fetch(ASSOCIACOES_QUERY);
      return associacoes as Associacao[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useAssociacaoBySlug(slug: string) {
  return useQuery({
    queryKey: ['associacao', slug],
    queryFn: async () => {
      const associacao = await sanityClient.fetch(
        `
        *[_type == "associacao" && slug.current == $slug][0] {
          _id,
          nome,
          slug,
          descricao,
          historia,
          logo,
          banner,
          endereco,
          cidade,
          estado,
          telefone,
          email,
          whatsapp,
          instagram,
          facebook,
          website,
          numeroMembros,
          especialidades,
          "produtos": *[_type == "produto" && references(^._id)] | order(_createdAt desc) [0...12] {
            _id,
            nome,
            slug,
            imagemPrincipal,
            preco,
            disponibilidade
          }
        }
      `,
        { slug }
      );
      return associacao as Associacao;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useAssociacaoStats() {
  return useQuery({
    queryKey: ['associacao-stats'],
    queryFn: async () => {
      const stats = await sanityClient.fetch(`
        {
          "totalAssociacoes": count(*[_type == "associacao" && ativo == true]),
          "totalMembros": sum(*[_type == "associacao" && ativo == true].numeroMembros),
          "totalProdutos": count(*[_type == "produto"]),
          "produtosDisponiveis": count(*[_type == "produto" && disponibilidade == "DISPONIVEL"])
        }
      `);
      return stats;
    },
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
}

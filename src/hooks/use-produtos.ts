import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sanityClient } from '@/lib/sanity/client';
import { PRODUTOS_QUERY, PRODUTO_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { Produto } from '@/lib/sanity/types';

export function useProdutos() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const produtos = await sanityClient.fetch(PRODUTOS_QUERY);
      return produtos as Produto[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useProdutoBySlug(slug: string) {
  return useQuery({
    queryKey: ['produto', slug],
    queryFn: async () => {
      const produto = await sanityClient.fetch(PRODUTO_BY_SLUG_QUERY, { slug });
      return produto as Produto;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProdutosMaisVistos() {
  return useQuery({
    queryKey: ['produtos-mais-vistos'],
    queryFn: async () => {
      const produtos = await sanityClient.fetch(`
        *[_type == "produto" && destaque == true] | order(_createdAt desc) [0...8] {
          _id,
          nome,
          slug,
          imagemPrincipal,
          preco,
          disponibilidade,
          associacao->{
            _id,
            nome,
            whatsapp
          }
        }
      `);
      return produtos as Produto[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useProdutosByCategoria(categoria: string) {
  return useQuery({
    queryKey: ['produtos-categoria', categoria],
    queryFn: async () => {
      const produtos = await sanityClient.fetch(
        `
        *[_type == "produto" && categoria == $categoria] | order(_createdAt desc) {
          _id,
          nome,
          slug,
          imagemPrincipal,
          preco,
          disponibilidade,
          categoria,
          associacao->{
            _id,
            nome,
            whatsapp
          }
        }
      `,
        { categoria }
      );
      return produtos as Produto[];
    },
    enabled: !!categoria,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProdutoRelacionados(produtoId: string, categoria: string) {
  return useQuery({
    queryKey: ['produtos-relacionados', produtoId, categoria],
    queryFn: async () => {
      const produtos = await sanityClient.fetch(
        `
        *[_type == "produto" && categoria == $categoria && _id != $produtoId] | order(_createdAt desc) [0...4] {
          _id,
          nome,
          slug,
          imagemPrincipal,
          preco,
          disponibilidade,
          associacao->{
            _id,
            nome,
            whatsapp
          }
        }
      `,
        { categoria, produtoId }
      );
      return produtos as Produto[];
    },
    enabled: !!produtoId && !!categoria,
    staleTime: 10 * 60 * 1000,
  });
}

// Mutation para favoritar produto
export function useFavoriteProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (produtoId: string) => {
      const response = await fetch('/api/v1/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao favoritar produto');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoritos'] });
    },
  });
}

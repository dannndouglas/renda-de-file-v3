import { useQuery } from '@tanstack/react-query';
import { sanityClientPublic } from '@/lib/sanity/client';
import { PRODUTO_BY_SLUG_QUERY } from '@/lib/sanity/queries';
import { Produto } from '@/lib/sanity/types';

export function useProdutos() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const response = await fetch('/api/v1/produtos');

      if (!response.ok) {
        throw new Error('Falha ao carregar produtos');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Erro ao carregar produtos');
      }

      return result.data as Produto[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useProdutoBySlug(slug: string) {
  return useQuery({
    queryKey: ['produto', slug],
    queryFn: async () => {
      const produto = await sanityClientPublic.fetch(PRODUTO_BY_SLUG_QUERY, {
        slug,
      });
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
      const response = await fetch('/api/v1/produtos?destaque=true&limit=8');

      if (!response.ok) {
        throw new Error('Falha ao carregar produtos em destaque');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || 'Erro ao carregar produtos em destaque'
        );
      }

      return result.data as Produto[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useProdutosByCategoria(categoria: string) {
  return useQuery({
    queryKey: ['produtos-categoria', categoria],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/produtos?categoria=${encodeURIComponent(categoria)}`
      );

      if (!response.ok) {
        throw new Error('Falha ao carregar produtos da categoria');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || 'Erro ao carregar produtos da categoria'
        );
      }

      return result.data as Produto[];
    },
    enabled: !!categoria,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProdutoRelacionados(produtoId: string, categoria: string) {
  return useQuery({
    queryKey: ['produtos-relacionados', produtoId, categoria],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/produtos?categoria=${encodeURIComponent(categoria)}&limit=4`
      );

      if (!response.ok) {
        throw new Error('Falha ao carregar produtos relacionados');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || 'Erro ao carregar produtos relacionados'
        );
      }

      // Filtrar o produto atual no frontend
      const produtos = result.data.filter(
        (produto: Produto) => produto._id !== produtoId
      );

      return produtos as Produto[];
    },
    enabled: !!produtoId && !!categoria,
    staleTime: 10 * 60 * 1000,
  });
}

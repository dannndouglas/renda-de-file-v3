/**
 * React hooks simplificados para busca
 * Hooks compatíveis que funcionam com ou sem Algolia
 */

import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  searchProdutosSimple,
  searchAssociacoesSimple,
  getMockFacets,
  buildSimpleFilters,
} from './simple-client';
import type { SimpleSearchResult, SimpleSearchOptions } from './simple-client';
import { useDebounce } from '@/hooks/useDebounce';

// Interface simplificada para filtros
export interface SimpleSearchFilters {
  categoria?: string[];
  disponibilidade?: string[];
  associacao?: string[];
  cidade?: string[];
  preco_min?: number;
  preco_max?: number;
}

/**
 * Hook simplificado para busca de produtos
 */
export function useSimpleSearchProdutos(
  query: string = '',
  filters: SimpleSearchFilters = {}
) {
  const debouncedQuery = useDebounce(query, 300);
  const [page, setPage] = useState(0);

  const searchQuery = useQuery({
    queryKey: ['simple-search-produtos', debouncedQuery, filters, page],
    queryFn: async () => {
      const filterString = buildSimpleFilters(filters);
      return searchProdutosSimple({
        query: debouncedQuery,
        filters: filterString || undefined,
        page,
        hitsPerPage: 20,
        facets: ['categoria', 'disponibilidade', 'associacao.nome'],
      });
    },
    enabled: !!debouncedQuery || Object.keys(filters).length > 0,
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const updateQuery = useCallback((newQuery: string) => {
    setPage(0); // Reset page when query changes
  }, []);

  const updatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    ...searchQuery,
    query: debouncedQuery,
    page,
    updateQuery,
    updatePage,
    hasQuery: !!debouncedQuery,
    hasResults: (searchQuery.data?.nbHits || 0) > 0,
  };
}

/**
 * Hook simplificado para busca de associações
 */
export function useSimpleSearchAssociacoes(
  query: string = '',
  filters: SimpleSearchFilters = {}
) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['simple-search-associacoes', debouncedQuery, filters],
    queryFn: async () => {
      const filterString = buildSimpleFilters(filters);
      return searchAssociacoesSimple({
        query: debouncedQuery,
        filters: filterString || undefined,
        hitsPerPage: 20,
        facets: ['cidade', 'ativa'],
      });
    },
    enabled: !!debouncedQuery || Object.keys(filters).length > 0,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook simplificado para facetas
 */
export function useSimpleFacets(facetName: string) {
  return useQuery({
    queryKey: ['simple-facets', facetName],
    queryFn: () => Promise.resolve(getMockFacets(facetName)),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para gerenciar filtros
 */
export function useSimpleFilters(initialFilters: SimpleSearchFilters = {}) {
  const [filters, setFilters] = useState<SimpleSearchFilters>(initialFilters);

  const updateFilter = useCallback(
    (key: keyof SimpleSearchFilters, value: any) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const toggleArrayFilter = useCallback(
    (key: keyof SimpleSearchFilters, value: string) => {
      setFilters((prev) => {
        const currentArray = (prev[key] as string[]) || [];
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];

        return {
          ...prev,
          [key]: newArray.length > 0 ? newArray : undefined,
        };
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearFilter = useCallback((key: keyof SimpleSearchFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const activeFiltersCount = Object.values(filters).reduce((acc, value) => {
    if (Array.isArray(value)) {
      return acc + value.length;
    }
    if (typeof value === 'number' && value > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return {
    filters,
    activeFiltersCount,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    clearFilter,
    hasActiveFilters: activeFiltersCount > 0,
  };
}

/**
 * Hook para histórico de busca
 */
export function useSimpleSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('search-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }
  }, []);

  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      const newHistory = [
        query,
        ...prev.filter((item) => item !== query),
      ].slice(0, 10);
      localStorage.setItem('search-history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('search-history');
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
  };
}

/**
 * Hook para sugestões mock
 */
export function useSimpleSuggestions(query: string) {
  return useQuery({
    queryKey: ['simple-suggestions', query],
    queryFn: async () => {
      // Mock suggestions baseadas na query
      if (!query || query.length < 2) return [];

      const mockSuggestions = [
        'renda de filé',
        'toalha de mesa',
        'vestido',
        'bolsa',
        'colcha',
        'cortina',
        'caminho de mesa',
        'sousplat',
      ];

      return mockSuggestions
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map((suggestion) => ({
          query: suggestion,
          highlighted: suggestion.replace(
            new RegExp(`(${query})`, 'gi'),
            '<mark>$1</mark>'
          ),
          nbHits: Math.floor(Math.random() * 20) + 1,
        }));
    },
    enabled: !!query && query.length >= 2,
    staleTime: 10 * 60 * 1000,
  });
}

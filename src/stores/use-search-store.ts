import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  query: string;
  sugestoes: string[];
  historicoRecente: string[];
  resultados: any[];
  loading: boolean;

  // Ações
  setQuery: (query: string) => void;
  setSugestoes: (sugestoes: string[]) => void;
  setResultados: (resultados: any[]) => void;
  setLoading: (loading: boolean) => void;
  adicionarAoHistorico: (query: string) => void;
  limparHistorico: () => void;
  buscar: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      sugestoes: [],
      historicoRecente: [],
      resultados: [],
      loading: false,

      setQuery: (query) => {
        set({ query });
      },

      setSugestoes: (sugestoes) => {
        set({ sugestoes });
      },

      setResultados: (resultados) => {
        set({ resultados });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      adicionarAoHistorico: (query) => {
        if (!query.trim()) return;

        set((state) => {
          const historicoFiltrado = state.historicoRecente.filter(
            (item) => item !== query
          );
          return {
            historicoRecente: [query, ...historicoFiltrado].slice(0, 10), // Manter apenas 10 itens
          };
        });
      },

      limparHistorico: () => {
        set({ historicoRecente: [] });
      },

      buscar: async (query) => {
        if (!query.trim()) {
          set({ resultados: [], loading: false });
          return;
        }

        set({ loading: true, query });

        try {
          // Aqui será implementada a busca real com Algolia/MeiliSearch
          // Por enquanto, simulação
          await new Promise((resolve) => setTimeout(resolve, 500));

          const { adicionarAoHistorico } = get();
          adicionarAoHistorico(query);

          set({
            resultados: [], // Resultados virão da API
            loading: false,
          });
        } catch (error) {
          console.error('Erro na busca:', error);
          set({ loading: false });
        }
      },
    }),
    {
      name: 'search-store',
      partialize: (state) => ({
        historicoRecente: state.historicoRecente,
      }),
    }
  )
);

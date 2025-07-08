import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Categoria =
  | 'DECORACAO'
  | 'VESTUARIO'
  | 'RELIGIOSO'
  | 'BEBE'
  | 'ACESSORIOS'
  | 'PERSONALIZADO';
export type Disponibilidade = 'DISPONIVEL' | 'SOB_ENCOMENDA';
export type Tamanho = 'PEQUENO' | 'MEDIO' | 'GRANDE' | 'SOB_MEDIDA';
export type Cor = 'BRANCO' | 'CRU' | 'COLORIDO';
export type TempoProducao =
  | 'PRONTA_ENTREGA'
  | 'ATE_7_DIAS'
  | 'ATE_15_DIAS'
  | 'ATE_30_DIAS';
export type Ordenacao =
  | 'MAIS_RECENTE'
  | 'MAIS_ANTIGO'
  | 'MENOR_PRECO'
  | 'MAIOR_PRECO'
  | 'ALFABETICO';
export type Visualizacao = 'GRID' | 'LISTA';

interface FiltrosProduto {
  categoria?: Categoria;
  disponibilidade?: Disponibilidade;
  precoMin?: number;
  precoMax?: number;
  tamanho?: Tamanho;
  cor?: Cor;
  tempoProducao?: TempoProducao;
  associacaoId?: string;
  busca?: string;
}

interface FilterState {
  filtros: FiltrosProduto;
  ordenacao: Ordenacao;
  visualizacao: Visualizacao;

  // Ações
  setFiltro: <K extends keyof FiltrosProduto>(
    key: K,
    value: FiltrosProduto[K]
  ) => void;
  removeFiltro: (key: keyof FiltrosProduto) => void;
  limparFiltros: () => void;
  setOrdenacao: (ordenacao: Ordenacao) => void;
  setVisualizacao: (visualizacao: Visualizacao) => void;

  // Computed
  getFiltrosAtivos: () => string[];
  getQuantidadeFiltros: () => number;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      filtros: {},
      ordenacao: 'MAIS_RECENTE',
      visualizacao: 'GRID',

      setFiltro: (key, value) => {
        set((state) => ({
          filtros: {
            ...state.filtros,
            [key]: value,
          },
        }));
      },

      removeFiltro: (key) => {
        set((state) => {
          const { [key]: _, ...filtros } = state.filtros;
          return { filtros };
        });
      },

      limparFiltros: () => {
        set({ filtros: {} });
      },

      setOrdenacao: (ordenacao) => {
        set({ ordenacao });
      },

      setVisualizacao: (visualizacao) => {
        set({ visualizacao });
      },

      getFiltrosAtivos: () => {
        const { filtros } = get();
        return Object.keys(filtros).filter(
          (key) => filtros[key as keyof FiltrosProduto] !== undefined
        );
      },

      getQuantidadeFiltros: () => {
        const { filtros } = get();
        return Object.keys(filtros).filter(
          (key) => filtros[key as keyof FiltrosProduto] !== undefined
        ).length;
      },
    }),
    {
      name: 'filter-store',
      partialize: (state) => ({
        filtros: state.filtros,
        ordenacao: state.ordenacao,
        visualizacao: state.visualizacao,
      }),
    }
  )
);

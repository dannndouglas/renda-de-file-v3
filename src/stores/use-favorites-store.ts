import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: string;
  nome: string;
  imagemPrincipal: string;
  preco?: number;
  associacao: {
    id: string;
    nome: string;
  };
  adicionadoEm: Date;
}

interface FavoritesState {
  items: FavoriteItem[];

  // Ações
  adicionarFavorito: (item: Omit<FavoriteItem, 'adicionadoEm'>) => void;
  removerFavorito: (id: string) => void;
  limparFavoritos: () => void;
  isFavorito: (id: string) => boolean;
  toggleFavorito: (item: Omit<FavoriteItem, 'adicionadoEm'>) => void;

  // Computed
  getQuantidadeFavoritos: () => number;
  getFavoritosOrdenados: () => FavoriteItem[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      adicionarFavorito: (item) => {
        set((state) => {
          const jaExiste = state.items.some((fav) => fav.id === item.id);
          if (jaExiste) return state;

          return {
            items: [...state.items, { ...item, adicionadoEm: new Date() }],
          };
        });
      },

      removerFavorito: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      limparFavoritos: () => {
        set({ items: [] });
      },

      isFavorito: (id) => {
        return get().items.some((item) => item.id === id);
      },

      toggleFavorito: (item) => {
        const { isFavorito, adicionarFavorito, removerFavorito } = get();

        if (isFavorito(item.id)) {
          removerFavorito(item.id);
        } else {
          adicionarFavorito(item);
        }
      },

      getQuantidadeFavoritos: () => {
        return get().items.length;
      },

      getFavoritosOrdenados: () => {
        return get().items.sort(
          (a, b) =>
            new Date(b.adicionadoEm).getTime() -
            new Date(a.adicionadoEm).getTime()
        );
      },
    }),
    {
      name: 'favorites-store',
      version: 1,
    }
  )
);

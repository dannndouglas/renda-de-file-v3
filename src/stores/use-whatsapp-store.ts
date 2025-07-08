import { create } from 'zustand';

export type TipoConsulta = 'COMPRA' | 'ENCOMENDA' | 'DUVIDA' | 'ORCAMENTO';

interface WhatsAppClick {
  produtoId: string;
  produtoNome: string;
  associacaoId: string;
  associacaoNome: string;
  tipo: TipoConsulta;
  origem: string;
  timestamp: Date;
}

interface WhatsAppState {
  cliques: WhatsAppClick[];

  // Ações
  registrarClique: (clique: Omit<WhatsAppClick, 'timestamp'>) => void;
  getCliquesRecentes: (limite?: number) => WhatsAppClick[];
  getTotalCliques: () => number;
  getCliquePorProduto: (produtoId: string) => WhatsAppClick[];
  getCliquePorAssociacao: (associacaoId: string) => WhatsAppClick[];
  getEstatisticasTipo: () => Record<TipoConsulta, number>;
}

export const useWhatsAppStore = create<WhatsAppState>((set, get) => ({
  cliques: [],

  registrarClique: (clique) => {
    set((state) => ({
      cliques: [...state.cliques, { ...clique, timestamp: new Date() }],
    }));

    // Enviar para API de analytics
    try {
      fetch('/api/v1/whatsapp/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clique),
      });
    } catch (error) {
      console.error('Erro ao enviar analytics:', error);
    }
  },

  getCliquesRecentes: (limite = 10) => {
    return get()
      .cliques.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, limite);
  },

  getTotalCliques: () => {
    return get().cliques.length;
  },

  getCliquePorProduto: (produtoId) => {
    return get().cliques.filter((clique) => clique.produtoId === produtoId);
  },

  getCliquePorAssociacao: (associacaoId) => {
    return get().cliques.filter(
      (clique) => clique.associacaoId === associacaoId
    );
  },

  getEstatisticasTipo: () => {
    const cliques = get().cliques;
    const estatisticas: Record<TipoConsulta, number> = {
      COMPRA: 0,
      ENCOMENDA: 0,
      DUVIDA: 0,
      ORCAMENTO: 0,
    };

    cliques.forEach((clique) => {
      estatisticas[clique.tipo]++;
    });

    return estatisticas;
  },
}));

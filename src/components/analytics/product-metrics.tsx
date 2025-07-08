'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ProductMetrics() {
  const metricas = {
    totalProdutos: 245,
    produtosAtivos: 198,
    categorias: [
      { nome: 'Decoração', produtos: 89, cliques: 456 },
      { nome: 'Vestuário', produtos: 67, cliques: 234 },
      { nome: 'Bebê', produtos: 45, cliques: 189 },
      { nome: 'Religioso', produtos: 34, cliques: 123 },
      { nome: 'Acessórios', produtos: 23, cliques: 89 },
    ],
    disponibilidade: {
      DISPONIVEL: 156,
      SOB_ENCOMENDA: 89,
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metricas.totalProdutos}</div>
            <p className="text-xs text-gray-600">
              {metricas.produtosAtivos} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metricas.disponibilidade.DISPONIVEL}
            </div>
            <p className="text-xs text-gray-600">
              {(
                (metricas.disponibilidade.DISPONIVEL / metricas.totalProdutos) *
                100
              ).toFixed(1)}
              % do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sob Encomenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {metricas.disponibilidade.SOB_ENCOMENDA}
            </div>
            <p className="text-xs text-gray-600">
              {(
                (metricas.disponibilidade.SOB_ENCOMENDA /
                  metricas.totalProdutos) *
                100
              ).toFixed(1)}
              % do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.categorias.length}
            </div>
            <p className="text-xs text-gray-600">categorias ativas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance por Categoria</CardTitle>
          <CardDescription>
            Produtos e engajamento por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metricas.categorias.map((categoria, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{categoria.nome}</Badge>
                  <div>
                    <p className="font-medium">{categoria.produtos} produtos</p>
                    <p className="text-sm text-gray-600">
                      {categoria.cliques} cliques no WhatsApp
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    {(categoria.cliques / categoria.produtos).toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500">cliques/produto</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

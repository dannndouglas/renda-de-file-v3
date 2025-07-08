'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Produtos Mais Visualizados</CardTitle>
          <CardDescription>
            Top 5 produtos com mais visualizações nos últimos 30 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                nome: 'Toalha de Mesa Retangular',
                visualizacoes: 145,
                cliques: 23,
              },
              {
                nome: 'Colcha de Casal Personalizada',
                visualizacoes: 132,
                cliques: 19,
              },
              { nome: 'Cortina para Sala', visualizacoes: 98, cliques: 15 },
              { nome: 'Caminho de Mesa', visualizacoes: 87, cliques: 12 },
              { nome: 'Almofada Decorativa', visualizacoes: 76, cliques: 10 },
            ].map((produto, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <p className="font-medium">{produto.nome}</p>
                  <p className="text-sm text-gray-600">
                    {produto.visualizacoes} visualizações • {produto.cliques}{' '}
                    cliques no WhatsApp
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    {((produto.cliques / produto.visualizacoes) * 100).toFixed(
                      1
                    )}
                    %
                  </p>
                  <p className="text-xs text-gray-500">conversão</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associações Mais Procuradas</CardTitle>
          <CardDescription>
            Associações com mais cliques no WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                nome: 'Associação das Rendeiras do Centro',
                cliques: 89,
                produtos: 24,
              },
              { nome: 'Artesãs do Bairro São João', cliques: 67, produtos: 18 },
              {
                nome: 'Grupo de Renda Filé Tradicional',
                cliques: 45,
                produtos: 15,
              },
              { nome: 'Rendeiras da Praça', cliques: 34, produtos: 12 },
              { nome: 'Artesanato Dona Maria', cliques: 28, produtos: 9 },
            ].map((associacao, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <p className="font-medium">{associacao.nome}</p>
                  <p className="text-sm text-gray-600">
                    {associacao.produtos} produtos cadastrados
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {associacao.cliques}
                  </p>
                  <p className="text-xs text-gray-500">cliques</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

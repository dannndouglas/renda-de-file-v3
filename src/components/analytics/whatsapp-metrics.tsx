'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function WhatsAppMetrics() {
  const metricas = {
    totalCliques: 2345,
    crescimento: 25.4,
    conversaoPorTipo: {
      COMPRA: 1456,
      ENCOMENDA: 678,
      DUVIDA: 145,
      ORCAMENTO: 66,
    },
    horariosPico: [
      { horario: '09:00-10:00', cliques: 234 },
      { horario: '14:00-15:00', cliques: 189 },
      { horario: '19:00-20:00', cliques: 156 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Cliques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.totalCliques.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +{metricas.crescimento}% este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Compras Diretas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.conversaoPorTipo.COMPRA}
            </div>
            <p className="text-xs text-gray-600">
              {(
                (metricas.conversaoPorTipo.COMPRA / metricas.totalCliques) *
                100
              ).toFixed(1)}
              % do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Encomendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.conversaoPorTipo.ENCOMENDA}
            </div>
            <p className="text-xs text-gray-600">
              {(
                (metricas.conversaoPorTipo.ENCOMENDA / metricas.totalCliques) *
                100
              ).toFixed(1)}
              % do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dúvidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metricas.conversaoPorTipo.DUVIDA}
            </div>
            <p className="text-xs text-gray-600">
              {(
                (metricas.conversaoPorTipo.DUVIDA / metricas.totalCliques) *
                100
              ).toFixed(1)}
              % do total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Horários de Pico</CardTitle>
            <CardDescription>
              Horários com mais cliques no WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metricas.horariosPico.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{item.horario}</Badge>
                    <span className="text-sm">{item.cliques} cliques</span>
                  </div>
                  <div className="h-2 w-32 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${(item.cliques / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
            <CardDescription>Tipos de consulta mais frequentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metricas.conversaoPorTipo).map(
                ([tipo, valor]) => (
                  <div key={tipo} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={tipo === 'COMPRA' ? 'default' : 'secondary'}
                      >
                        {tipo}
                      </Badge>
                      <span className="text-sm">{valor} cliques</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {((valor / metricas.totalCliques) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

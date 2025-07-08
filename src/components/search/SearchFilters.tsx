/**
 * Componente de filtros de busca
 * Filtros avançados para refinar resultados de busca
 */

'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { useSimpleFacets } from '@/lib/algolia/simple-hooks';
import type { SimpleSearchFilters } from '@/lib/algolia/simple-hooks';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filters: SimpleSearchFilters;
  onUpdateFilter: (key: keyof SimpleSearchFilters, value: any) => void;
  onToggleArrayFilter: (key: keyof SimpleSearchFilters, value: string) => void;
  onClearFilters: () => void;
  onClearFilter: (key: keyof SimpleSearchFilters) => void;
  activeFiltersCount: number;
  className?: string;
  compact?: boolean;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
  collapsible = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium">{title}</h4>
        {children}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto w-full justify-between p-0 text-sm font-medium"
        >
          {title}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface CheckboxFilterProps {
  options: Record<string, number>;
  selectedValues: string[];
  onToggle: (value: string) => void;
  maxVisible?: number;
}

function CheckboxFilter({
  options,
  selectedValues,
  onToggle,
  maxVisible = 8,
}: CheckboxFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const sortedOptions = Object.entries(options)
    .sort(([, a], [, b]) => b - a) // Ordenar por quantidade (mais populares primeiro)
    .slice(0, showAll ? undefined : maxVisible);

  const hasMore = Object.keys(options).length > maxVisible;

  return (
    <div className="space-y-2">
      {sortedOptions.map(([value, count]) => (
        <div key={value} className="flex items-center space-x-2">
          <Checkbox
            id={value}
            checked={selectedValues.includes(value)}
            onCheckedChange={() => onToggle(value)}
          />
          <Label
            htmlFor={value}
            className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
          >
            <span>{value}</span>
            <Badge variant="secondary" className="text-xs">
              {count}
            </Badge>
          </Label>
        </div>
      ))}

      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
        >
          {showAll
            ? 'Ver menos'
            : `Ver mais (${Object.keys(options).length - maxVisible})`}
        </Button>
      )}
    </div>
  );
}

export function SearchFilters({
  filters,
  onUpdateFilter,
  onToggleArrayFilter,
  onClearFilters,
  onClearFilter,
  activeFiltersCount,
  className,
  compact = false,
}: SearchFiltersProps) {
  // Buscar facetas disponíveis
  const { data: categoriaFacets = {} } = useSimpleFacets('categoria');
  const { data: disponibilidadeFacets = {} } =
    useSimpleFacets('disponibilidade');
  const { data: associacaoFacets = {} } = useSimpleFacets('associacao.nome');
  const { data: cidadeFacets = {} } = useSimpleFacets('associacao.cidade');
  // Facetas adicionais podem ser adicionadas no futuro
  // const { data: tecnicaFacets = {} } = useSimpleFacets('tecnica');
  // const { data: materialFacets = {} } = useSimpleFacets('material');

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    onUpdateFilter('preco_min', min > 0 ? min : undefined);
    onUpdateFilter('preco_max', max < 1000 ? max : undefined);
  };

  const clearPriceFilter = () => {
    onUpdateFilter('preco_min', undefined);
    onUpdateFilter('preco_max', undefined);
  };

  if (compact) {
    return (
      <div className={cn('space-y-4', className)}>
        {/* Header compacto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto p-1 text-xs"
            >
              Limpar
            </Button>
          )}
        </div>

        {/* Filtros ativos */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-1">
            {filters.categoria?.map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleArrayFilter('categoria', cat)}
                  className="ml-1 h-auto w-auto p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {filters.disponibilidade?.map((disp) => (
              <Badge key={disp} variant="outline" className="text-xs">
                {disp}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleArrayFilter('disponibilidade', disp)}
                  className="ml-1 h-auto w-auto p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {(filters.preco_min || filters.preco_max) && (
              <Badge variant="outline" className="text-xs">
                R$ {filters.preco_min || 0} - R$ {filters.preco_max || 1000}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearPriceFilter}
                  className="ml-1 h-auto w-auto p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpar todos
          </Button>
        )}
      </div>

      <Separator />

      {/* Categoria */}
      {Object.keys(categoriaFacets).length > 0 && (
        <FilterSection title="Categoria">
          <CheckboxFilter
            options={categoriaFacets}
            selectedValues={filters.categoria || []}
            onToggle={(value) => onToggleArrayFilter('categoria', value)}
          />
        </FilterSection>
      )}

      {/* Disponibilidade */}
      {Object.keys(disponibilidadeFacets).length > 0 && (
        <FilterSection title="Disponibilidade">
          <CheckboxFilter
            options={disponibilidadeFacets}
            selectedValues={filters.disponibilidade || []}
            onToggle={(value) => onToggleArrayFilter('disponibilidade', value)}
          />
        </FilterSection>
      )}

      {/* Preço */}
      <FilterSection title="Faixa de preço">
        <div className="space-y-4">
          <Slider
            min={0}
            max={1000}
            step={10}
            value={[filters.preco_min || 0, filters.preco_max || 1000]}
            onValueChange={handlePriceChange}
            className="w-full"
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>R$ {filters.preco_min || 0}</span>
            <span>R$ {filters.preco_max || 1000}</span>
          </div>

          {(filters.preco_min || filters.preco_max) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearPriceFilter}
              className="h-auto p-0 text-xs"
            >
              Remover filtro de preço
            </Button>
          )}
        </div>
      </FilterSection>

      {/* Associação */}
      {Object.keys(associacaoFacets).length > 0 && (
        <FilterSection title="Associação">
          <CheckboxFilter
            options={associacaoFacets}
            selectedValues={filters.associacao || []}
            onToggle={(value) => onToggleArrayFilter('associacao', value)}
            maxVisible={5}
          />
        </FilterSection>
      )}

      {/* Cidade */}
      {Object.keys(cidadeFacets).length > 0 && (
        <FilterSection title="Cidade">
          <CheckboxFilter
            options={cidadeFacets}
            selectedValues={filters.cidade || []}
            onToggle={(value) => onToggleArrayFilter('cidade', value)}
            maxVisible={5}
          />
        </FilterSection>
      )}

      {/* Outros filtros podem ser adicionados aqui no futuro */}
    </div>
  );
}

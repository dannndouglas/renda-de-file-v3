'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  DollarSign,
  Palette,
  Building,
} from 'lucide-react';
import { useFilterStore } from '@/stores/use-filter-store';
import { cn } from '@/lib/utils';

const categorias = [
  { value: 'todos', label: 'Todos', icon: Package },
  { value: 'decoracao', label: 'Decoração', icon: Palette },
  { value: 'vestuario', label: 'Vestuário', icon: Package },
  { value: 'acessorios', label: 'Acessórios', icon: Package },
  { value: 'mesa', label: 'Mesa', icon: Package },
];

const disponibilidades = [
  { value: 'todos', label: 'Todos' },
  { value: 'DISPONIVEL', label: 'Disponível' },
  { value: 'SOB_ENCOMENDA', label: 'Sob Encomenda' },
];

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-left hover:text-orange-600"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductFilters() {
  const { filtros, setFiltro, limparFiltros } = useFilterStore();
  const [priceRange, setPriceRange] = useState([0, 500]);

  const hasActiveFilters =
    filtros.categoria ||
    filtros.disponibilidade ||
    (filtros.precoMin && filtros.precoMin > 0) ||
    (filtros.precoMax && filtros.precoMax < 500);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setFiltro('precoMin', value[0]);
    setFiltro('precoMax', value[1]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 space-y-6"
    >
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={limparFiltros}
              className="text-sm hover:text-orange-600"
            >
              <X className="mr-1 h-3 w-3" />
              Limpar
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Categoria */}
          <FilterSection
            title="Categoria"
            icon={<Package className="h-4 w-4 text-orange-600" />}
          >
            <RadioGroup
              value={filtros.categoria || 'todos'}
              onValueChange={(value: string) =>
                setFiltro(
                  'categoria',
                  value === 'todos' ? undefined : (value as any)
                )
              }
            >
              {categorias.map((cat) => (
                <div
                  key={cat.value}
                  className="flex items-center space-x-2 py-2"
                >
                  <RadioGroupItem value={cat.value} id={cat.value} />
                  <Label
                    htmlFor={cat.value}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterSection>

          {/* Disponibilidade */}
          <FilterSection
            title="Disponibilidade"
            icon={<Package className="h-4 w-4 text-orange-600" />}
          >
            <RadioGroup
              value={filtros.disponibilidade || 'todos'}
              onValueChange={(value: string) =>
                setFiltro(
                  'disponibilidade',
                  value === 'todos' ? undefined : (value as any)
                )
              }
            >
              {disponibilidades.map((disp) => (
                <div
                  key={disp.value}
                  className="flex items-center space-x-2 py-2"
                >
                  <RadioGroupItem value={disp.value} id={disp.value} />
                  <Label
                    htmlFor={disp.value}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {disp.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FilterSection>

          {/* Faixa de Preço */}
          <FilterSection
            title="Faixa de Preço"
            icon={<DollarSign className="h-4 w-4 text-orange-600" />}
          >
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                min={0}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}+</span>
              </div>
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Filtros Ativos */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-orange-50 p-4"
        >
          <p className="mb-2 text-sm font-medium text-orange-900">
            Filtros ativos:
          </p>
          <div className="flex flex-wrap gap-2">
            {filtros.categoria && (
              <Badge variant="secondary" className="gap-1">
                {categorias.find((c) => c.value === filtros.categoria)?.label}
                <button
                  onClick={() => setFiltro('categoria', undefined)}
                  className="ml-1 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filtros.disponibilidade && (
              <Badge variant="secondary" className="gap-1">
                {
                  disponibilidades.find(
                    (d) => d.value === filtros.disponibilidade
                  )?.label
                }
                <button
                  onClick={() => setFiltro('disponibilidade', undefined)}
                  className="ml-1 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(filtros.precoMin || filtros.precoMax) && (
              <Badge variant="secondary" className="gap-1">
                R$ {filtros.precoMin || 0} - R$ {filtros.precoMax || 500}+
                <button
                  onClick={() => {
                    setFiltro('precoMin', undefined);
                    setFiltro('precoMax', undefined);
                    setPriceRange([0, 500]);
                  }}
                  className="ml-1 hover:text-orange-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

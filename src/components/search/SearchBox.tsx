/**
 * Componente de caixa de busca com autocomplete
 * Campo de busca inteligente com sugestões
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSimpleSuggestions } from '@/lib/algolia/simple-hooks';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  searchHistory?: string[];
  onClearHistory?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

export function SearchBox({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar produtos, associações...',
  className,
  showSuggestions = true,
  searchHistory = [],
  onClearHistory,
  size = 'md',
  variant = 'default',
}: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Buscar sugestões apenas quando necessário
  const { data: suggestions = [], isFetching } = useSimpleSuggestions(
    showSuggestions && isFocused && value.length >= 2 ? value : ''
  );

  // Fechar popover quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (showSuggestions && newValue.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (showSuggestions && (value.length >= 2 || searchHistory.length > 0)) {
      setIsOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit?.(value.trim());
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    onSubmit?.(suggestion);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
  };

  const variantClasses = {
    default: 'border-input bg-background',
    ghost: 'border-transparent bg-muted/50',
    outline: 'border-2 border-input',
  };

  const showContent =
    isOpen &&
    showSuggestions &&
    (suggestions.length > 0 || searchHistory.length > 0);

  return (
    <div className={cn('relative w-full', className)}>
      <Popover open={showContent} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />

              <Input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder={placeholder}
                className={cn(
                  'pl-10 pr-10 transition-all duration-200',
                  sizeClasses[size],
                  variantClasses[variant],
                  isFocused && 'ring-2 ring-ring ring-offset-2'
                )}
              />

              {value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="absolute right-1 h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </form>
        </PopoverTrigger>

        <PopoverContent
          className="mt-1 w-full border p-0 shadow-lg"
          align="start"
          sideOffset={4}
        >
          <div className="max-h-96 overflow-y-auto">
            {/* Sugestões */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  Sugestões
                </div>

                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.query)}
                    className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <Search className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                    <span
                      className="flex-1 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: suggestion.highlighted,
                      }}
                    />
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.nbHits}
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {/* Histórico */}
            {searchHistory.length > 0 && (
              <div className="border-t p-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Buscas recentes
                  </div>

                  {onClearHistory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearHistory}
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Limpar
                    </Button>
                  )}
                </div>

                {searchHistory.slice(0, 5).map((historyItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(historyItem)}
                    className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <Clock className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm text-muted-foreground">
                      {historyItem}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Loading */}
            {isFetching && (
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-foreground" />
                  Buscando...
                </div>
              </div>
            )}

            {/* Empty state */}
            {value.length >= 2 && suggestions.length === 0 && !isFetching && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Nenhuma sugestão encontrada
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * Hook useDebounce para otimizar performance de busca
 * Atrasa a execução de uma função até que pare de ser chamada
 */

import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * @param value - Valor a ser debounced
 * @param delay - Delay em milliseconds
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar timer que atualiza o valor debounced após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpar timeout se value mudar (também na cleanup)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para debounce de callbacks
 * @param callback - Função a ser debounced
 * @param delay - Delay em milliseconds
 * @param deps - Dependências do callback
 * @returns Função debounced
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const [debouncedCallback, setDebouncedCallback] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, delay, ...deps]);

  return (debouncedCallback || callback) as T;
}

/**
 * Hook para controlar quando um valor está "estável" (parou de mudar)
 * @param value - Valor a ser observado
 * @param delay - Delay em milliseconds
 * @returns Objeto com valor estável e flag indicando se está estável
 */
export function useStableValue<T>(value: T, delay: number = 500) {
  const [stableValue, setStableValue] = useState<T>(value);
  const [isStable, setIsStable] = useState(true);

  useEffect(() => {
    setIsStable(false);

    const handler = setTimeout(() => {
      setStableValue(value);
      setIsStable(true);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    stableValue,
    isStable,
    isChanging: !isStable,
  };
}

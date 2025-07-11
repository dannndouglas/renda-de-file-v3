'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'minimal' | 'elegant' | 'soft';
  pattern?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  description,
  children,
  className,
  variant = 'default',
  pattern = false,
}: PageHeaderProps) {
  // Definir estilos base por variante
  const variantStyles = {
    default: {
      container:
        'py-12 md:py-16 text-center bg-gradient-to-br from-renda-800 to-renda-900',
      subtitle: 'text-renda-200/90',
      title: 'text-white',
      description: 'text-renda-100/90',
    },
    centered: {
      container:
        'py-12 md:py-16 text-center bg-gradient-to-br from-renda-700 via-renda-800 to-renda-900',
      subtitle: 'text-renda-200/90',
      title: 'text-white',
      description: 'text-renda-100/90',
    },
    minimal: {
      container:
        'py-8 md:py-12 text-center bg-renda-800 border-b border-renda-700',
      subtitle: 'text-renda-200',
      title: 'text-white',
      description: 'text-renda-100',
    },
    elegant: {
      container:
        'py-16 md:py-20 text-center bg-gradient-to-br from-renda-900 to-black',
      subtitle: 'text-renda-200/90',
      title: 'text-white',
      description: 'text-renda-100/90',
    },
    soft: {
      container:
        'py-12 md:py-16 text-center bg-gradient-to-br from-renda-600 to-renda-800',
      subtitle: 'text-renda-100/90',
      title: 'text-white',
      description: 'text-renda-50/90',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        currentVariant.container,
        className
      )}
    >
      {/* Pattern Background - mais sutil para tema escuro */}
      {pattern && (
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm10 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* Decorative Elements - ajustado para tema escuro */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-renda-300/20 blur-xl" />
        <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-white/15 blur-lg" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mx-auto',
            variant === 'centered' || variant === 'elegant'
              ? 'max-w-4xl'
              : 'max-w-6xl'
          )}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'mb-4 text-sm font-semibold uppercase tracking-wider',
                currentVariant.subtitle
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'font-bold leading-tight tracking-tight',
              variant === 'minimal'
                ? 'mb-4 text-3xl md:text-4xl'
                : variant === 'elegant'
                  ? 'mb-6 text-4xl md:text-5xl lg:text-7xl'
                  : 'mb-6 text-4xl md:text-5xl lg:text-6xl',
              currentVariant.title
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'text-lg leading-relaxed',
                variant === 'centered' || variant === 'elegant'
                  ? 'mx-auto max-w-3xl'
                  : 'max-w-4xl',
                children ? 'mb-8' : '',
                currentVariant.description
              )}
            >
              {description}
            </motion.p>
          )}

          {/* Additional Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                'mt-8',
                (variant === 'centered' || variant === 'elegant') &&
                  'flex justify-center'
              )}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

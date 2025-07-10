'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'minimal';
  gradientFrom?: string;
  gradientTo?: string;
  pattern?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  description,
  children,
  className,
  variant = 'default',
  gradientFrom = 'from-orange-500',
  gradientTo = 'to-red-600',
  pattern = true,
}: PageHeaderProps) {
  const variants = {
    default: 'py-12 md:py-16 text-center',
    centered: 'py-12 md:py-16 text-center',
    minimal: 'py-12 md:py-16 text-center',
  };

  return (
    <section
      className={cn(
        'relative bg-gradient-to-r',
        gradientFrom,
        gradientTo,
        variants[variant],
        className
      )}
    >
      {/* Pattern Background */}
      {pattern && (
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            'mx-auto',
            variant === 'centered' ? 'max-w-4xl' : 'max-w-6xl'
          )}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 text-sm font-medium uppercase tracking-wider text-white/80"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              'font-bold text-white',
              variant === 'minimal'
                ? 'text-3xl md:text-4xl'
                : 'text-4xl md:text-5xl lg:text-6xl',
              variant === 'centered' ? 'mb-6' : 'mb-4'
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn(
                'text-lg text-white/90',
                variant === 'centered' ? 'mx-auto max-w-3xl' : 'max-w-3xl',
                children ? 'mb-8' : ''
              )}
            >
              {description}
            </motion.p>
          )}

          {/* Additional Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn(
                'mt-8',
                variant === 'centered' && 'flex justify-center'
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

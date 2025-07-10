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
    default: 'py-16 md:py-20 text-center',
    centered: 'py-20 md:py-24 text-center',
    minimal: 'py-12 md:py-16 text-center',
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-br',
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

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 48L48 53.3C96 59 192 69 288 74.7C384 80 480 80 576 74.7C672 69 768 59 864 48C960 37 1056 27 1152 26.7C1248 27 1344 37 1392 42.7L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V48Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M0 64L48 64C96 64 192 64 288 69.3C384 75 480 85 576 85.3C672 85 768 75 864 69.3C960 64 1056 64 1152 64C1248 64 1344 64 1392 64L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V64Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

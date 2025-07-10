'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  suffix?: string;
  delay?: number;
  className?: string;
  iconColor?: string;
}

export function StatsCard({
  icon: Icon,
  value,
  label,
  suffix = '',
  delay = 0,
  className,
  iconColor = 'text-orange-600',
}: StatsCardProps) {
  const [isInView, setIsInView] = useState(false);
  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      const animation = animate(count, numericValue, {
        duration: 2,
        delay,
      });
      return animation.stop;
    }
  }, [isInView, numericValue, count, delay, value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => setIsInView(true)}
    >
      <Card className={cn('transition-all hover:shadow-lg', className)}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: delay + 0.2,
                type: 'spring',
                stiffness: 200,
              }}
              className={cn(
                'mb-4 flex h-16 w-16 items-center justify-center rounded-full',
                iconColor === 'text-orange-600' ? 'bg-orange-100' : 'bg-gray-100'
              )}
            >
              <Icon className={cn('h-8 w-8', iconColor)} />
            </motion.div>

            <div className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? (
                <motion.span>{rounded}</motion.span>
              ) : (
                value
              )}
              {suffix}
            </div>

            <p className="mt-2 text-sm text-gray-600">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

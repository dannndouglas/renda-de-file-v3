'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
}

export function AnimatedCard({
  children,
  delay = 0,
  hover = true,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      <Card
        className={cn(
          'transition-shadow duration-300',
          hover && 'hover:shadow-xl',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
}

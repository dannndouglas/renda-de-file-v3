'use client';

import { useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 100,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useScrollReveal({
    threshold,
    once,
    className: 'revealed',
  });

  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'scroll-reveal';
      case 'down':
        return 'scroll-reveal-down';
      case 'left':
        return 'scroll-reveal-left';
      case 'right':
        return 'scroll-reveal-right';
      case 'scale':
        return 'scroll-reveal-scale';
      default:
        return 'scroll-reveal';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}s`,
        '--animation-distance': `${distance}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
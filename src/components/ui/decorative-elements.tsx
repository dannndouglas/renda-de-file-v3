'use client';

import { cn } from '@/lib/utils';

interface DecorativeElementProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
}

// Geometric Elements
export function GeometricCircles({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity}
        />
        <circle
          cx="150"
          cy="50"
          r="20"
          fill="currentColor"
          opacity={opacity * 0.5}
        />
        <circle
          cx="100"
          cy="150"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity * 0.8}
        />
        <circle
          cx="50"
          cy="150"
          r="15"
          fill="currentColor"
          opacity={opacity * 0.6}
        />
        <circle
          cx="150"
          cy="150"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity={opacity * 0.4}
        />
      </svg>
    </div>
  );
}

export function GeometricShapes({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <polygon
          points="50,30 80,70 20,70"
          fill="currentColor"
          opacity={opacity}
        />
        <rect
          x="120"
          y="20"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity * 0.8}
        />
        <polygon
          points="100,90 130,140 70,140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity * 0.6}
        />
        <rect
          x="30"
          y="120"
          width="30"
          height="30"
          fill="currentColor"
          opacity={opacity * 0.4}
          transform="rotate(45 45 135)"
        />
        <polygon
          points="150,100 180,130 150,160 120,130"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3,3"
          opacity={opacity * 0.5}
        />
      </svg>
    </div>
  );
}

export function DotPattern({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <pattern
            id="dot-pattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <circle
              cx="10"
              cy="10"
              r="1.5"
              fill="currentColor"
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}

// Organic Elements
export function OrganicWaves({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M0,100 Q50,50 100,100 T200,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity}
        />
        <path
          d="M0,120 Q50,80 100,120 T200,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity * 0.6}
        />
        <path
          d="M0,80 Q50,40 100,80 T200,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity={opacity * 0.4}
        />
      </svg>
    </div>
  );
}

export function OrganicBlobs({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M50,50 Q80,30 110,50 Q130,80 110,110 Q80,130 50,110 Q30,80 50,50 Z"
          fill="currentColor"
          opacity={opacity}
        />
        <path
          d="M120,30 Q150,20 170,40 Q180,70 160,90 Q140,100 120,80 Q110,50 120,30 Z"
          fill="currentColor"
          opacity={opacity * 0.6}
        />
        <path
          d="M30,120 Q60,110 80,130 Q90,160 70,180 Q40,190 20,170 Q10,140 30,120 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity * 0.8}
        />
        <path
          d="M140,120 Q170,110 190,130 Q200,160 180,180 Q150,190 130,170 Q120,140 140,120 Z"
          fill="currentColor"
          opacity={opacity * 0.4}
        />
      </svg>
    </div>
  );
}

// Lace-inspired Elements
export function LacePattern({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <pattern
            id="lace-pattern"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
          >
            <path
              d="M0,20 Q10,10 20,20 Q30,30 40,20 M20,0 Q20,10 20,20 Q20,30 20,40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity}
            />
            <circle
              cx="20"
              cy="20"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={opacity * 0.5}
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#lace-pattern)" />
      </svg>
    </div>
  );
}

export function LaceMotifs({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <g opacity={opacity}>
          <path
            d="M50,50 Q60,40 70,50 Q80,40 90,50 Q80,60 70,50 Q60,60 50,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="70"
            cy="50"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M40,50 L50,50 M90,50 L100,50"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
        <g opacity={opacity * 0.7} transform="translate(50,50)">
          <path
            d="M50,50 Q60,40 70,50 Q80,40 90,50 Q80,60 70,50 Q60,60 50,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="70"
            cy="50"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M40,50 L50,50 M90,50 L100,50"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
        <g opacity={opacity * 0.5} transform="translate(0,100)">
          <path
            d="M50,50 Q60,40 70,50 Q80,40 90,50 Q80,60 70,50 Q60,60 50,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="70"
            cy="50"
            r="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M40,50 L50,50 M90,50 L100,50"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

// Abstract Elements
export function AbstractLines({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M20,20 Q100,80 180,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity}
        />
        <path
          d="M20,60 Q100,120 180,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity * 0.6}
        />
        <path
          d="M20,100 Q100,160 180,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity={opacity * 0.4}
        />
        <path
          d="M20,140 Q100,200 180,140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity={opacity * 0.8}
        />
      </svg>
    </div>
  );
}

export function AbstractSpirals({
  className,
  size = 'md',
  opacity = 0.1,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div
      className={cn('pointer-events-none absolute', sizeMap[size], className)}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          d="M100,100 Q110,90 120,100 Q130,110 120,120 Q110,130 100,120 Q90,110 100,100 Q105,95 110,100 Q115,105 110,110 Q105,115 100,110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity={opacity}
        />
        <path
          d="M50,50 Q60,40 70,50 Q80,60 70,70 Q60,80 50,70 Q40,60 50,50 Q55,45 60,50 Q65,55 60,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity * 0.6}
        />
        <path
          d="M150,150 Q160,140 170,150 Q180,160 170,170 Q160,180 150,170 Q140,160 150,150 Q155,145 160,150 Q165,155 160,160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={opacity * 0.4}
        />
      </svg>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  GeometricCircles,
  GeometricShapes,
  DotPattern,
  OrganicWaves,
  OrganicBlobs,
  LacePattern,
  LaceMotifs,
  AbstractLines,
  AbstractSpirals,
} from '@/components/ui/decorative-elements';

export interface CTAButton {
  text: string;
  href: string;
  variant?: 'default' | 'secondary' | 'outline';
  icon?: LucideIcon;
}

interface CallToActionSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttons: CTAButton[];
  variant?:
    | 'default'
    | 'gradient'
    | 'minimal'
    | 'geometric'
    | 'organic'
    | 'minimal-modern'
    | 'bold';
  className?: string;
  animated?: boolean;
}

export function CallToActionSection({
  title,
  subtitle,
  description,
  buttons,
  variant = 'default',
  className,
  animated = true,
}: CallToActionSectionProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-renda-500 to-renda-600 text-white';
      case 'minimal':
        return 'bg-white border border-renda-200 shadow-sm';
      case 'geometric':
        return 'bg-gradient-to-br from-renda-500 via-renda-600 to-renda-700 text-white overflow-hidden';
      case 'organic':
        return 'bg-gradient-to-br from-renda-400 via-renda-500 to-renda-600 text-white overflow-hidden';
      case 'minimal-modern':
        return 'bg-white border border-renda-200 shadow-xl';
      case 'bold':
        return 'bg-gradient-to-r from-renda-600 via-renda-700 to-renda-800 text-white overflow-hidden';
      default:
        return 'bg-gradient-to-r from-renda-50 to-areia-50 border border-renda-200';
    }
  };

  const getTextColor = () => {
    return ['gradient', 'geometric', 'organic', 'bold'].includes(variant)
      ? 'text-white'
      : 'text-renda-900';
  };

  const getDescriptionColor = () => {
    return ['gradient', 'geometric', 'organic', 'bold'].includes(variant)
      ? 'text-white/90'
      : 'text-renda-700';
  };

  const getDecorativeElements = () => {
    switch (variant) {
      case 'geometric':
        return (
          <>
            <GeometricCircles
              className="right-0 top-0 text-white"
              size="lg"
              opacity={0.1}
            />
            <GeometricShapes
              className="bottom-0 left-0 text-white"
              size="md"
              opacity={0.08}
            />
            <DotPattern
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
              size="lg"
              opacity={0.05}
            />
          </>
        );
      case 'organic':
        return (
          <>
            <OrganicWaves
              className="left-0 top-0 text-white"
              size="lg"
              opacity={0.15}
            />
            <OrganicBlobs
              className="bottom-0 right-0 text-white"
              size="md"
              opacity={0.1}
            />
            <LacePattern
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
              size="lg"
              opacity={0.05}
            />
          </>
        );
      case 'minimal-modern':
        return (
          <>
            <AbstractLines
              className="right-0 top-0 text-gray-300"
              size="lg"
              opacity={0.3}
            />
            <DotPattern
              className="bottom-0 left-0 text-gray-200"
              size="md"
              opacity={0.2}
            />
          </>
        );
      case 'bold':
        return (
          <>
            <AbstractSpirals
              className="left-0 top-0 text-white"
              size="lg"
              opacity={0.12}
            />
            <AbstractLines
              className="bottom-0 right-0 text-white"
              size="md"
              opacity={0.08}
            />
            <LaceMotifs
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
              size="lg"
              opacity={0.06}
            />
          </>
        );
      default:
        return null;
    }
  };

  // Animation variants (disabled for now due to Next.js 15 compatibility)
  // const containerVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.4 },
  //   },
  // };

  const getShadowClass = () => {
    switch (variant) {
      case 'geometric':
        return 'shadow-2xl shadow-renda-500/20';
      case 'organic':
        return 'shadow-2xl shadow-renda-400/20';
      case 'minimal-modern':
        return 'shadow-xl';
      case 'bold':
        return 'shadow-2xl shadow-renda-600/20';
      default:
        return 'shadow-lg';
    }
  };

  const getButtonStyles = (button: CTAButton) => {
    const isGradientVariant = [
      'gradient',
      'geometric',
      'organic',
      'bold',
    ].includes(variant);

    if (isGradientVariant && button.variant === 'outline') {
      return 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 backdrop-blur-sm';
    }

    if (isGradientVariant && button.variant === 'secondary') {
      return 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-white/20';
    }

    return '';
  };

  const Content = () => (
    <section
      className={cn(
        'relative rounded-xl p-6 text-center md:p-8',
        getVariantClasses(),
        getShadowClass(),
        className
      )}
    >
      {getDecorativeElements()}

      <div className="relative z-10">
        {subtitle && (
          <p
            className={cn(
              'mb-2 text-sm font-medium uppercase tracking-wide',
              ['gradient', 'geometric', 'organic', 'bold'].includes(variant)
                ? 'text-white/80'
                : 'text-renda-600'
            )}
          >
            {subtitle}
          </p>
        )}

        <h2
          className={cn(
            'mb-3 text-2xl font-bold md:text-3xl lg:text-4xl',
            getTextColor()
          )}
        >
          {title}
        </h2>

        <p
          className={cn(
            'mx-auto mb-6 max-w-2xl text-base md:text-lg',
            getDescriptionColor()
          )}
        >
          {description}
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {buttons.map((button, index) => {
            const Icon = button.icon;
            return (
              <div
                key={index}
                className="group transition-transform duration-200 hover:scale-105"
              >
                <Button
                  size="default"
                  variant={button.variant || 'default'}
                  className={cn(
                    'gap-2 px-6 py-2 text-sm font-medium',
                    getButtonStyles(button),
                    'transition-all duration-200 hover:shadow-lg'
                  )}
                  asChild
                >
                  <Link href={button.href}>
                    {Icon && <Icon className="h-4 w-4" />}
                    {button.text}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Animation disabled for Next.js 15 compatibility
  // if (animated) {
  //   return (
  //     <motion.div
  //       initial="hidden"
  //       whileInView="visible"
  //       viewport={{ once: true, margin: '-50px' }}
  //       variants={containerVariants}
  //     >
  //       <Content />
  //     </motion.div>
  //   );
  // }

  return <Content />;
}

// Export individual variant components for easier usage
export const GeometricCTA = (
  props: Omit<CallToActionSectionProps, 'variant'>
) => <CallToActionSection {...props} variant="geometric" />;

export const OrganicCTA = (
  props: Omit<CallToActionSectionProps, 'variant'>
) => <CallToActionSection {...props} variant="organic" />;

export const MinimalModernCTA = (
  props: Omit<CallToActionSectionProps, 'variant'>
) => <CallToActionSection {...props} variant="minimal-modern" />;

export const BoldCTA = (props: Omit<CallToActionSectionProps, 'variant'>) => (
  <CallToActionSection {...props} variant="bold" />
);

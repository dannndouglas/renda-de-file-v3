import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function HeroSection({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-renda-50 via-areia-50 to-renda-100 section-padding">
      <div className="container">
        <div className="text-center">
          <h1 className="heading-1 mb-6 text-balance">
            {title}
          </h1>
          <p className="body-large mx-auto max-w-3xl mb-8 text-balance">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-renda-600 hover:bg-renda-700 px-8"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-renda-600 text-renda-600 hover:bg-renda-50 px-8"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
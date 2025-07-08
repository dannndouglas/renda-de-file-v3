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
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <section className="section-padding relative bg-gradient-to-br from-renda-50 via-areia-50 to-renda-100">
      <div className="container">
        <div className="text-center">
          <h1 className="heading-1 mb-6 text-balance">{title}</h1>
          <p className="body-large mx-auto mb-8 max-w-3xl text-balance">
            {subtitle}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-renda-600 px-8 hover:bg-renda-700"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-renda-600 px-8 text-renda-600 hover:bg-renda-50"
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

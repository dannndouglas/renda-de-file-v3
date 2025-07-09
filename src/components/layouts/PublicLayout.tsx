import { ReactNode } from 'react';
import { Footer } from '@/components/navigation/Footer';

interface PublicLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PublicLayout({ children, className = '' }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content with padding for fixed header */}
      <main className={`pt-16 ${className}`}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Início', href: '/' },
  { name: 'História', href: '/historia' },
  { name: 'Associações', href: '/associacoes' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Notícias', href: '/noticias' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Favoritos', href: '/favoritos' },
];

export function MainNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
              Renda de Filé
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-200 hover:text-amber-600 relative',
                  isActive(item.href)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50"
              asChild
            >
              <Link href="/catalogo">
                <Search className="h-4 w-4" />
                <span className="text-sm">Buscar</span>
              </Link>
            </Button>

            {/* Favorites - Desktop */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50"
              asChild
            >
              <Link href="/favoritos">
                <Heart className="h-4 w-4" />
                <span className="text-sm">Favoritos</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left text-amber-600">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8">
                  <div className="space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block py-2 px-3 text-base font-medium rounded-md transition-colors',
                          isActive(item.href)
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="space-y-4">
                      <Link
                        href="/catalogo"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Search className="h-4 w-4" />
                        <span>Buscar Produtos</span>
                      </Link>
                      <Link
                        href="/favoritos"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Meus Favoritos</span>
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'border-b border-gray-200/50 bg-white/95 shadow-lg backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-amber-600 transition-colors hover:text-amber-700">
              Renda de Filé
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-all duration-200 hover:text-amber-600',
                  isActive(item.href)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 rounded-full bg-amber-600" />
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
              className="hidden items-center space-x-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 md:flex"
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
              className="hidden items-center space-x-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 md:flex"
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
                  className="text-gray-700 hover:bg-amber-50 hover:text-amber-600 md:hidden"
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
                          'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                          isActive(item.href)
                            ? 'bg-amber-50 text-amber-600'
                            : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="space-y-4">
                      <Link
                        href="/catalogo"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Search className="h-4 w-4" />
                        <span>Buscar Produtos</span>
                      </Link>
                      <Link
                        href="/favoritos"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-amber-50 hover:text-amber-600"
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

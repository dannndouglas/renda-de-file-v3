import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400">
              Renda de Filé de Jaguaribe
            </h3>
            <p className="text-gray-300 text-sm">
              Preservando a tradição da Renda de Filé há mais de 300 anos. 
              Artesanato autêntico feito à mão pelas artesãs de Jaguaribe, Ceará.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Navegação</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Início
              </Link>
              <Link href="/historia" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                História
              </Link>
              <Link href="/associacoes" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Associações
              </Link>
              <Link href="/catalogo" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Catálogo
              </Link>
              <Link href="/noticias" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Notícias
              </Link>
              <Link href="/eventos" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Eventos
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Produtos</h4>
            <nav className="space-y-2">
              <Link href="/catalogo?categoria=decoracao" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Decoração
              </Link>
              <Link href="/catalogo?categoria=vestuario" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Vestuário
              </Link>
              <Link href="/catalogo?categoria=acessorios" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Acessórios
              </Link>
              <Link href="/catalogo?categoria=brinquedos" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Brinquedos
              </Link>
              <Link href="/favoritos" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">
                Meus Favoritos
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Jaguaribe, Ceará<br />
                  Brasil
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <a 
                  href="mailto:contato@rendadefile.com.br" 
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  contato@rendadefile.com.br
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <a 
                  href="tel:+5588999999999" 
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  (88) 99999-9999
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Renda de Filé de Jaguaribe. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Desenvolvido com ❤️ para preservar a tradição artesanal do Ceará
          </p>
        </div>
      </div>
    </footer>
  );
}
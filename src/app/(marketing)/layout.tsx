import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation - será implementado posteriormente */}
      <header className="border-b border-gray-200">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-renda-600">
                Renda de Filé
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <Link href="/" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Início
              </Link>
              <Link href="/historia" className="cursor-pointer text-gray-700 hover:text-renda-600">
                História
              </Link>
              <Link href="/associacoes" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Associações
              </Link>
              <Link href="/catalogo" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Catálogo
              </Link>
              <Link href="/noticias" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Notícias
              </Link>
              <Link href="/eventos" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Eventos
              </Link>
              <Link href="/favoritos" className="cursor-pointer text-gray-700 hover:text-renda-600">
                Favoritos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {children}

      {/* Footer - será implementado posteriormente */}
      <footer className="bg-gray-900 text-white">
        <div className="section-padding container">
          <div className="text-center">
            <h3 className="mb-4 text-lg font-semibold">
              Renda de Filé de Jaguaribe
            </h3>
            <p className="mb-4 text-gray-400">
              Preservando a tradição da Renda de Filé há mais de 300 anos
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Renda de Filé de Jaguaribe. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

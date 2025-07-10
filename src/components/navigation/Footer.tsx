import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from 'lucide-react';
import { getConfiguracoesGlobais } from '@/lib/sanity/config';

export async function Footer() {
  const config = await getConfiguracoesGlobais();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400">
              {config?.titulo || 'Renda de Filé de Jaguaribe'}
            </h3>
            <p className="text-sm text-gray-300">
              {config?.descricao || 'Preservando a tradição da Renda de Filé há mais de 300 anos. Artesanato autêntico feito à mão pelas artesãs de Jaguaribe, Ceará.'}
            </p>
            <div className="flex space-x-4">
              {config?.redesSociais?.facebook && (
                <a
                  href={config.redesSociais.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {config?.redesSociais?.instagram && (
                <a
                  href={config.redesSociais.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {config?.redesSociais?.twitter && (
                <a
                  href={config.redesSociais.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {config?.redesSociais?.youtube && (
                <a
                  href={config.redesSociais.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-amber-400"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Navegação</h4>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Início
              </Link>
              <Link
                href="/historia"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                História
              </Link>
              <Link
                href="/associacoes"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Associações
              </Link>
              <Link
                href="/catalogo"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Catálogo
              </Link>
              <Link
                href="/noticias"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Notícias
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Produtos</h4>
            <nav className="space-y-2">
              <Link
                href="/catalogo?categoria=decoracao"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Decoração
              </Link>
              <Link
                href="/catalogo?categoria=vestuario"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Vestuário
              </Link>
              <Link
                href="/catalogo?categoria=acessorios"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Acessórios
              </Link>
              <Link
                href="/catalogo?categoria=brinquedos"
                className="block text-sm text-gray-300 transition-colors hover:text-amber-400"
              >
                Brinquedos
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                <span className="text-sm text-gray-300">
                  {config?.contato?.endereco ? (
                    <>
                      {config.contato.endereco.rua && `${config.contato.endereco.rua}, `}
                      {config.contato.endereco.numero && `${config.contato.endereco.numero}`}
                      {config.contato.endereco.bairro && <><br />{config.contato.endereco.bairro}</>}
                      {(config.contato.endereco.cidade || config.contato.endereco.estado) && (
                        <><br />{config.contato.endereco.cidade}{config.contato.endereco.cidade && config.contato.endereco.estado && ', '}{config.contato.endereco.estado}</>
                      )}
                      {config.contato.endereco.cep && <><br />CEP: {config.contato.endereco.cep}</>}
                    </>
                  ) : (
                    <>Jaguaribe, Ceará<br />Brasil</>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href={`mailto:${config?.contato?.email || 'contato@rendadefile.com.br'}`}
                  className="text-sm text-gray-300 transition-colors hover:text-amber-400"
                >
                  {config?.contato?.email || 'contato@rendadefile.com.br'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-amber-400" />
                <a
                  href={`tel:+55${config?.contato?.telefone?.replace(/\D/g, '') || '88999999999'}`}
                  className="text-sm text-gray-300 transition-colors hover:text-amber-400"
                >
                  {config?.contato?.telefone || '(88) 99999-9999'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Renda de Filé de Jaguaribe. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Desenvolvido com ❤️ para preservar a tradição artesanal do Ceará
          </p>
        </div>
      </div>
    </footer>
  );
}

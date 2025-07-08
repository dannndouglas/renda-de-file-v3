import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Erro de Autenticação - Renda de Filé',
  description: 'Erro ao fazer login',
};

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Erro de Autenticação
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ocorreu um erro ao fazer login. Tente novamente.
          </p>
        </div>
        <div className="mt-6">
          <Link href="/auth/login">
            <Button className="w-full">Voltar ao Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

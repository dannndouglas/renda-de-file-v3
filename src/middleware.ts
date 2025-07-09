import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import {
  addSecurityHeaders,
  addAPISecurityHeaders,
} from '@/lib/security/headers';

// Middleware principal
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Aplicar headers de segurança a todas as respostas
  const response = NextResponse.next();

  // Headers específicos para APIs
  if (pathname.startsWith('/api/')) {
    return addAPISecurityHeaders(response);
  }

  // Headers gerais de segurança para páginas
  return addSecurityHeaders(response);
}

// Middleware de autenticação para rotas protegidas
export const authMiddleware = withAuth(
  function middleware(req) {
    // Middleware personalizado para rotas autenticadas
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Rotas que requerem admin
        if (pathname.startsWith('/analytics')) {
          return token?.role === 'admin' || token?.role === 'editor';
        }

        // Outras rotas protegidas
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
    '/api/(.*)',
    '/analytics/(.*)',
  ],
};

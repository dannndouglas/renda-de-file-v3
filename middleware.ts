import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Proteger rotas de analytics
      if (req.nextUrl.pathname.startsWith('/analytics')) {
        return token?.role === 'ADMIN' || token?.role === 'EDITOR';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/analytics/:path*'],
};

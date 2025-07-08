import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/config';
import { AnalyticsNavbar } from '@/components/analytics/analytics-navbar';

interface AnalyticsLayoutProps {
  children: ReactNode;
}

export default async function AnalyticsLayout({
  children,
}: AnalyticsLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsNavbar user={session.user} />
      <main className="pt-16">{children}</main>
    </div>
  );
}

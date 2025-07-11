import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function AssociacaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}

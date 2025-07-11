export interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  productData?: {
    price?: number;
    currency?: string;
    availability?: 'in stock' | 'out of stock' | 'preorder';
  };
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  canonicalUrl,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  productData,
}: SEOMetadataProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rendadefile.org.br';
  const fullTitle = `${title} | Renda de Filé`;

  const metadata: any = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      siteName: 'Renda de Filé',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`],
    },
    alternates: {
      canonical: canonicalUrl || undefined,
    },
  };

  // Adicionar metadados específicos para artigos
  if (ogType === 'article' && author) {
    metadata.openGraph.article = {
      publishedTime,
      modifiedTime,
      author,
      section,
      tag: tags,
    };
  }

  // Adicionar metadados específicos para produtos (usando type website)
  if (productData) {
    metadata.openGraph.price = {
      amount: productData.price,
      currency: productData.currency || 'BRL',
    };
    metadata.openGraph.availability = productData.availability;
  }

  // Schema.org structured data
  metadata.other = {
    'application-name': 'Renda de Filé',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Renda de Filé',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#f59e0b',
  };

  return metadata;
}

// Helper para gerar JSON-LD structured data
export function generateJsonLd(type: string, data: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return JSON.stringify({ ...baseData, ...data });
}

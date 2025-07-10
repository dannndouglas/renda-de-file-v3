import { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity/client';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rendadefile.org.br';

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/associacoes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    },
  ];

  try {
    // Buscar produtos
    const produtos = await sanityClient.fetch<
      { slug: { current: string }; _updatedAt: string }[]
    >(
      `*[_type == "produto"] {
        slug,
        _updatedAt
      }`
    );

    const produtoPages: MetadataRoute.Sitemap = produtos.map((produto) => ({
      url: `${baseUrl}/produto/${produto.slug.current}`,
      lastModified: new Date(produto._updatedAt),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    }));

    // Buscar notícias
    const noticias = await sanityClient.fetch<
      { slug: { current: string }; _updatedAt: string }[]
    >(
      `*[_type == "noticia"] {
        slug,
        _updatedAt
      }`
    );

    const noticiaPages: MetadataRoute.Sitemap = noticias.map((noticia) => ({
      url: `${baseUrl}/noticias/${noticia.slug.current}`,
      lastModified: new Date(noticia._updatedAt),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    }));

    // Buscar associações
    const associacoes = await sanityClient.fetch<
      { slug: { current: string }; _updatedAt: string }[]
    >(
      `*[_type == "associacao"] {
        slug,
        _updatedAt
      }`
    );

    const associacaoPages: MetadataRoute.Sitemap = associacoes.map(
      (associacao) => ({
        url: `${baseUrl}/associacoes/${associacao.slug.current}`,
        lastModified: new Date(associacao._updatedAt),
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.7,
      })
    );

    return [
      ...staticPages,
      ...produtoPages,
      ...noticiaPages,
      ...associacaoPages,
    ];
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    // Retornar apenas páginas estáticas em caso de erro
    return staticPages;
  }
}

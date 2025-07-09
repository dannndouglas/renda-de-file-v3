import { defineField, defineType } from 'sanity';
import { Home } from 'lucide-react';

export default defineType({
  name: 'paginaInicial',
  title: 'Página Inicial',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitulo',
          title: 'Subtítulo',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'imagem',
          title: 'Imagem de Fundo',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            {
              name: 'texto',
              title: 'Texto do Botão',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'sobre',
      title: 'Seção Sobre',
      type: 'object',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título',
          type: 'string',
        }),
        defineField({
          name: 'texto',
          title: 'Texto',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'imagem',
          title: 'Imagem',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'estatisticas',
      title: 'Estatísticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'numero',
              title: 'Número',
              type: 'string',
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'descricao',
              title: 'Descrição',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'produtosDestaque',
      title: 'Produtos em Destaque',
      type: 'object',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Produtos em Destaque',
        }),
        defineField({
          name: 'mostrarAutomatico',
          title: 'Mostrar produtos marcados como destaque automaticamente',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'produtos',
          title: 'Produtos Selecionados',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'produto' }] }],
          hidden: ({ parent }) => parent?.mostrarAutomatico === true,
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Página Inicial',
      };
    },
  },
});

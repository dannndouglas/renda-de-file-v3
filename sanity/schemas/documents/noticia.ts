import { defineField, defineType } from 'sanity';
import { Newspaper } from 'lucide-react';

export default defineType({
  name: 'noticia',
  title: 'Notícia',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo',
      type: 'text',
      rows: 3,
      description: 'Breve resumo para listagens',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'conteudo',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagemPrincipal',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Novidades', value: 'novidades' },
          { title: 'Eventos', value: 'eventos' },
          { title: 'Institucional', value: 'institucional' },
          { title: 'Artesanato', value: 'artesanato' },
          { title: 'Cultura', value: 'cultura' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      initialValue: 'Equipe Renda de Filé',
    }),
    defineField({
      name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destaque',
      title: 'Notícia em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria',
      media: 'imagemPrincipal',
      data: 'dataPublicacao',
      destaque: 'destaque',
    },
    prepare(selection) {
      const { title, subtitle, media, data, destaque } = selection;
      const date = new Date(data).toLocaleDateString('pt-BR');
      const star = destaque ? '⭐' : '';
      return {
        title: `${star} ${title}`,
        subtitle: `${subtitle} - ${date}`,
        media,
      };
    },
  },
});

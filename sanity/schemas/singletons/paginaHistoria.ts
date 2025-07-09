import { defineField, defineType } from 'sanity';
import { BookOpen } from 'lucide-react';

export default defineType({
  name: 'paginaHistoria',
  title: 'Página História',
  type: 'document',
  icon: () => <BookOpen size={20} />,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título da Página',
      type: 'string',
      initialValue: 'Nossa História',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introducao',
      title: 'Introdução',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagemPrincipal',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'timeline',
      title: 'Linha do Tempo',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ano',
              title: 'Ano',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'titulo',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'descricao',
              title: 'Descrição',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'imagem',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'titulo',
              subtitle: 'ano',
              media: 'imagem',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tecnicas',
      title: 'Técnicas',
      type: 'object',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Técnicas Tradicionais',
        }),
        defineField({
          name: 'lista',
          title: 'Lista de Técnicas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'nome',
                  title: 'Nome da Técnica',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'descricao',
                  title: 'Descrição',
                  type: 'text',
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'imagem',
                  title: 'Imagem',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'impacto',
      title: 'Impacto Social',
      type: 'object',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Impacto Social e Econômico',
        }),
        defineField({
          name: 'texto',
          title: 'Texto',
          type: 'array',
          of: [{ type: 'block' }],
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
              ],
            },
          ],
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
        title: 'Página História',
      };
    },
  },
});
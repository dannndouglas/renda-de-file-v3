import { defineField, defineType } from 'sanity';

export const produto = defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Produto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'nome',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricaoBreve',
      title: 'Descrição Breve',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'imagens',
      title: 'Imagens',
      type: 'array',
      of: [
        {
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
        },
      ],
      validation: (Rule) => Rule.min(1).error('Adicione pelo menos uma imagem'),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Decoração', value: 'decoracao' },
          { title: 'Vestuário', value: 'vestuario' },
          { title: 'Religioso', value: 'religioso' },
          { title: 'Bebê', value: 'bebe' },
          { title: 'Acessórios', value: 'acessorios' },
          { title: 'Personalizado', value: 'personalizado' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disponibilidade',
      title: 'Disponibilidade',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'disponivel' },
          { title: 'Sob Encomenda', value: 'sob-encomenda' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'precoPromocional',
      title: 'Preço Promocional (R$)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'tempoProducao',
      title: 'Tempo de Produção (dias)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'associacao',
      title: 'Associação',
      type: 'reference',
      to: [{ type: 'associacao' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destaque',
      title: 'Produto em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'personalizavel',
      title: 'Produto Personalizável',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'associacao.nome',
      media: 'imagens.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Sem associação',
        media,
      };
    },
  },
});

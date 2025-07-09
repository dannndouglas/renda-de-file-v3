import { defineField, defineType } from 'sanity';
import { ShoppingBag } from 'lucide-react';

export default defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  icon: ShoppingBag,
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricaoBreve',
      title: 'Descrição Breve',
      type: 'string',
      description: 'Usado em cards e listagens',
      validation: (Rule) => Rule.required().max(150),
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
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'preco',
      title: 'Preço',
      type: 'number',
      description: 'Preço em reais',
    }),
    defineField({
      name: 'precoPromocional',
      title: 'Preço Promocional',
      type: 'number',
      description: 'Deixe vazio se não houver promoção',
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
      initialValue: 'disponivel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tempoProducao',
      title: 'Tempo de Produção',
      type: 'number',
      description: 'Tempo em dias para produção sob encomenda',
    }),
    defineField({
      name: 'destaque',
      title: 'Produto em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'personalizavel',
      title: 'Personalizável',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'associacao',
      title: 'Associação',
      type: 'reference',
      to: [{ type: 'associacao' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'especificacoes',
      title: 'Especificações',
      type: 'especificacoes',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'categoria',
      media: 'imagens.0',
      disponibilidade: 'disponibilidade',
    },
    prepare(selection) {
      const { title, subtitle, media, disponibilidade } = selection;
      const status = disponibilidade === 'disponivel' ? '✅' : '⏳';
      return {
        title,
        subtitle: `${status} ${subtitle}`,
        media,
      };
    },
  },
});

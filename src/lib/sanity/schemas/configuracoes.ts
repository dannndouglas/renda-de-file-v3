import { defineField, defineType } from 'sanity'

export const configuracoes = defineType({
  name: 'configuracoes',
  title: 'Configurações Gerais',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título do Site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição do Site',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        accept: '.ico,.png',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem de Compartilhamento (Open Graph)',
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
    }),
    defineField({
      name: 'heroSection',
      title: 'Seção Hero',
      type: 'object',
      fields: [
        {
          name: 'titulo',
          title: 'Título',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitulo',
          title: 'Subtítulo',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'botaoPrimario',
          title: 'Botão Primário',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'botaoSecundario',
          title: 'Botão Secundário',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'imagemFundo',
          title: 'Imagem de Fundo',
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
    }),
    defineField({
      name: 'estatisticas',
      title: 'Estatísticas',
      type: 'object',
      fields: [
        {
          name: 'titulo',
          title: 'Título da Seção',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitulo',
          title: 'Subtítulo',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'itens',
          title: 'Itens',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'valor',
                  title: 'Valor',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        },
      ],
    }),
    defineField({
      name: 'contato',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'telefone',
          title: 'Telefone',
          type: 'string',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'endereco',
          title: 'Endereço',
          type: 'string',
        },
        {
          name: 'horarioFuncionamento',
          title: 'Horário de Funcionamento',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'redesSociais',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'descricao',
      media: 'logo',
    },
  },
})
import { defineField, defineType } from 'sanity';

export const associacao = defineType({
  name: 'associacao',
  title: 'Associação',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome da Associação',
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
      name: 'historia',
      title: 'História',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
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
      name: 'banner',
      title: 'Banner',
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
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
      initialValue: 'Jaguaribe',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estado',
      title: 'Estado',
      type: 'string',
      initialValue: 'CE',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cep',
      title: 'CEP',
      type: 'string',
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número no formato: (85) 99999-9999',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'numeroMembros',
      title: 'Número de Membros',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'especialidades',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: Toalhas de mesa, Cortinas, Produtos religiosos',
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'cidade',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Jaguaribe',
        media,
      };
    },
  },
});

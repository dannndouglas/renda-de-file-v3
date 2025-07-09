import { defineField, defineType } from 'sanity';
import { Users } from 'lucide-react';

export default defineType({
  name: 'associacao',
  title: 'Associação',
  type: 'document',
  icon: () => <Users size={20} />,
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
      name: 'historia',
      title: 'História',
      type: 'text',
      rows: 6,
      description: 'História da associação (opcional)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'endereco',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número com DDD',
    }),
    defineField({
      name: 'redesSociais',
      title: 'Redes Sociais',
      type: 'redesSociais',
    }),
    defineField({
      name: 'numeroMembros',
      title: 'Número de Membros',
      type: 'number',
    }),
    defineField({
      name: 'especialidades',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      subtitle: 'endereco.cidade',
      media: 'logo',
      ativo: 'ativo',
    },
    prepare(selection) {
      const { title, subtitle, media, ativo } = selection;
      const status = ativo ? '✅' : '❌';
      return {
        title: `${status} ${title}`,
        subtitle,
        media,
      };
    },
  },
});
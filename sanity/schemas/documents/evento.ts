import { defineField, defineType } from 'sanity';
import { Calendar } from 'lucide-react';

export default defineType({
  name: 'evento',
  title: 'Evento',
  type: 'document',
  icon: () => <Calendar size={20} />,
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Evento',
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
      name: 'tipo',
      title: 'Tipo de Evento',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Feira', value: 'feira' },
          { title: 'Exposição', value: 'exposicao' },
          { title: 'Curso', value: 'curso' },
          { title: 'Encontro', value: 'encontro' },
          { title: 'Outro', value: 'outro' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataInicio',
      title: 'Data de Início',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataFim',
      title: 'Data de Término',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'horario',
      title: 'Horário',
      type: 'string',
      description: 'Ex: 14h às 18h',
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço Completo',
      type: 'endereco',
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem do Evento',
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
    }),
    defineField({
      name: 'organizador',
      title: 'Organizador',
      type: 'string',
    }),
    defineField({
      name: 'telefoneContato',
      title: 'Telefone de Contato',
      type: 'string',
    }),
    defineField({
      name: 'linkInscricao',
      title: 'Link para Inscrição',
      type: 'url',
    }),
    defineField({
      name: 'gratuito',
      title: 'Evento Gratuito',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'valor',
      title: 'Valor da Inscrição',
      type: 'number',
      hidden: ({ parent }) => parent?.gratuito === true,
    }),
    defineField({
      name: 'vagas',
      title: 'Número de Vagas',
      type: 'number',
    }),
    defineField({
      name: 'destaque',
      title: 'Evento em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'tipo',
      media: 'imagem',
      data: 'dataInicio',
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
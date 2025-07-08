import { defineField, defineType } from 'sanity';

export const evento = defineType({
  name: 'evento',
  title: 'Evento',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'titulo',
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
      name: 'imagemDestaque',
      title: 'Imagem de Destaque',
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
      name: 'dataInicio',
      title: 'Data de Início',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataFim',
      title: 'Data de Fim',
      type: 'datetime',
    }),
    defineField({
      name: 'horario',
      title: 'Horário',
      type: 'string',
      placeholder: 'Ex: 08:00 às 17:00',
    }),
    defineField({
      name: 'local',
      title: 'Local',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de Evento',
      type: 'string',
      options: {
        list: [
          { title: 'Festival', value: 'festival' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Exposição', value: 'exposicao' },
          { title: 'Feira', value: 'feira' },
          { title: 'Curso', value: 'curso' },
          { title: 'Encontro', value: 'encontro' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preco',
      title: 'Preço',
      type: 'number',
      description: 'Deixe em branco se for gratuito',
    }),
    defineField({
      name: 'gratuito',
      title: 'Evento Gratuito',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'linkInscricao',
      title: 'Link de Inscrição',
      type: 'url',
    }),
    defineField({
      name: 'telefoneContato',
      title: 'Telefone de Contato',
      type: 'string',
    }),
    defineField({
      name: 'whatsappContato',
      title: 'WhatsApp de Contato',
      type: 'string',
    }),
    defineField({
      name: 'emailContato',
      title: 'Email de Contato',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'organizador',
      title: 'Organizador',
      type: 'string',
    }),
    defineField({
      name: 'capacidade',
      title: 'Capacidade',
      type: 'number',
      description: 'Número máximo de participantes',
    }),
    defineField({
      name: 'destaque',
      title: 'Evento em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Programado', value: 'programado' },
          { title: 'Inscrições Abertas', value: 'inscricoes-abertas' },
          { title: 'Lotado', value: 'lotado' },
          { title: 'Em Andamento', value: 'em-andamento' },
          { title: 'Finalizado', value: 'finalizado' },
          { title: 'Cancelado', value: 'cancelado' },
        ],
      },
      initialValue: 'programado',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'tipo',
      media: 'imagemDestaque',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Evento',
        media,
      };
    },
  },
});

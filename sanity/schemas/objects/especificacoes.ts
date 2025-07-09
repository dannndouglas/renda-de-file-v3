import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'especificacoes',
  title: 'Especificações',
  type: 'object',
  fields: [
    defineField({
      name: 'materiais',
      title: 'Materiais',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'tecnica',
      title: 'Técnica Utilizada',
      type: 'string',
      options: {
        list: [
          { title: 'Renda de Bilro', value: 'bilro' },
          { title: 'Renda Filé', value: 'file' },
          { title: 'Labirinto', value: 'labirinto' },
          { title: 'Mista', value: 'mista' },
        ],
      },
    }),
    defineField({
      name: 'dimensoes',
      title: 'Dimensões',
      type: 'dimensoes',
    }),
    defineField({
      name: 'cuidados',
      title: 'Cuidados e Manutenção',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'observacoes',
      title: 'Observações',
      type: 'text',
      rows: 3,
    }),
  ],
});
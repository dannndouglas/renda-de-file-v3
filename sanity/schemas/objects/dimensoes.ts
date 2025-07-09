import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dimensoes',
  title: 'Dimensões',
  type: 'object',
  fields: [
    defineField({
      name: 'altura',
      title: 'Altura (cm)',
      type: 'number',
    }),
    defineField({
      name: 'largura',
      title: 'Largura (cm)',
      type: 'number',
    }),
    defineField({
      name: 'profundidade',
      title: 'Profundidade (cm)',
      type: 'number',
    }),
    defineField({
      name: 'peso',
      title: 'Peso (g)',
      type: 'number',
    }),
  ],
});

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'redesSociais',
  title: 'Redes Sociais',
  type: 'object',
  fields: [
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      description: 'Apenas o @username',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      description: 'URL completa da página',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'string',
      description: 'URL do canal',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
  ],
});

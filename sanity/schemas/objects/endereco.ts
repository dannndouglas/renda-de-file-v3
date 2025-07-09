import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'endereco',
  title: 'Endereço',
  type: 'object',
  fields: [
    defineField({
      name: 'rua',
      title: 'Rua',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numero',
      title: 'Número',
      type: 'string',
    }),
    defineField({
      name: 'complemento',
      title: 'Complemento',
      type: 'string',
    }),
    defineField({
      name: 'bairro',
      title: 'Bairro',
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
  ],
});
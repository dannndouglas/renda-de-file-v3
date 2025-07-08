import { defineType } from 'sanity';

export default defineType({
  name: 'usuario',
  title: 'Usuário',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'password',
      title: 'Senha',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'papel',
      title: 'Papel',
      type: 'string',
      options: {
        list: [
          { title: 'Administrador', value: 'ADMIN' },
          { title: 'Editor', value: 'EDITOR' },
          { title: 'Associação', value: 'ASSOCIACAO' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'associacao',
      title: 'Associação',
      type: 'reference',
      to: [{ type: 'associacao' }],
      hidden: ({ document }: { document: any }) =>
        document?.papel !== 'ASSOCIACAO',
    },
    {
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'email',
    },
  },
});

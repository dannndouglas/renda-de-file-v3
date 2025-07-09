import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export default defineType({
  name: 'configuracoes',
  title: 'Configurações',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título do Site',
      type: 'string',
      initialValue: 'Renda de Filé',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição do Site',
      type: 'text',
      rows: 3,
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contato',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email Principal',
          type: 'string',
        }),
        defineField({
          name: 'telefone',
          title: 'Telefone Principal',
          type: 'string',
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp Principal',
          type: 'string',
        }),
        defineField({
          name: 'endereco',
          title: 'Endereço Principal',
          type: 'endereco',
        }),
      ],
    }),
    defineField({
      name: 'redesSociais',
      title: 'Redes Sociais',
      type: 'redesSociais',
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        defineField({
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Padrão',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações Gerais',
      };
    },
  },
});

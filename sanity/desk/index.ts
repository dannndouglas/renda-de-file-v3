import { StructureBuilder } from 'sanity/structure';
import { ShoppingBag, Users, Newspaper, Calendar, Settings, FileText } from 'lucide-react';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Produtos')
        .icon(ShoppingBag)
        .child(
          S.documentTypeList('produto')
            .title('Produtos')
            .defaultOrdering([{ field: 'nome', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Associações')
        .icon(Users)
        .child(
          S.documentTypeList('associacao')
            .title('Associações')
            .defaultOrdering([{ field: 'nome', direction: 'asc' }]),
        ),

      S.divider(),

      S.listItem()
        .title('Notícias')
        .icon(Newspaper)
        .child(
          S.documentTypeList('noticia')
            .title('Notícias')
            .defaultOrdering([{ field: 'dataPublicacao', direction: 'desc' }]),
        ),

      S.listItem()
        .title('Eventos')
        .icon(Calendar)
        .child(
          S.documentTypeList('evento')
            .title('Eventos')
            .defaultOrdering([{ field: 'dataInicio', direction: 'desc' }]),
        ),

      S.divider(),

      S.listItem()
        .title('Páginas')
        .icon(FileText)
        .child(
          S.list()
            .title('Páginas')
            .items([
              S.listItem()
                .title('Página Inicial')
                .child(S.document().schemaType('paginaInicial').documentId('paginaInicial')),
              S.listItem()
                .title('História')
                .child(S.document().schemaType('paginaHistoria').documentId('paginaHistoria')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Configurações')
        .icon(Settings)
        .child(S.document().schemaType('configuracoes').documentId('configuracoes')),
    ]);

// Documents
import produto from './documents/produto';
import associacao from './documents/associacao';
import noticia from './documents/noticia';
import evento from './documents/evento';

// Singletons
import configuracoes from './singletons/configuracoes';
import paginaInicial from './singletons/paginaInicial';
import paginaHistoria from './singletons/paginaHistoria';

// Objects
import endereco from './objects/endereco';
import redesSociais from './objects/redesSociais';
import dimensoes from './objects/dimensoes';
import especificacoes from './objects/especificacoes';
import seo from './objects/seo';

export const schemaTypes = [
  // Documents
  produto,
  associacao,
  noticia,
  evento,

  // Singletons
  configuracoes,
  paginaInicial,
  paginaHistoria,

  // Objects
  endereco,
  redesSociais,
  dimensoes,
  especificacoes,
  seo,
];
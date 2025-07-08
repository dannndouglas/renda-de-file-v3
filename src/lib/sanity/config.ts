import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Schemas
import { produto } from './schemas/produto'
import { associacao } from './schemas/associacao'
import { noticia } from './schemas/noticia'
import { evento } from './schemas/evento'
import { configuracoes } from './schemas/configuracoes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const config = defineConfig({
  name: 'renda-de-file-studio',
  title: 'Renda de Filé CMS',
  projectId,
  dataset,
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [
      // Documents
      produto,
      associacao,
      noticia,
      evento,
      configuracoes,
    ],
  },
})

export default config
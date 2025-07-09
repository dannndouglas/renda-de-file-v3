import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './desk';

export default defineConfig({
  name: 'default',
  title: 'Renda de Filé CMS',

  projectId: 'rsgezubm',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://rendadefile.vercel.app', 'https://www.rendadefile.com.br', 'https://rendadefile.com.br']
      : ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  },

  api: {
    projectId: 'rsgezubm',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});

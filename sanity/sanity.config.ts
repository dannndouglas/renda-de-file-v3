import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './desk';

export default defineConfig({
  name: 'default',
  title: 'Renda de Filé CMS',

  projectId: 'rsgezubm',
  dataset: 'development',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
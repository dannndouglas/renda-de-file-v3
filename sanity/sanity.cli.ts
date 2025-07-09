import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'rsgezubm',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'renda-de-file',
});

// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Endereço final no GitHub Pages: https://heliastorres.github.io/manocchio/
  // `site` é o domínio (usado no canonical e na prévia do link); `base` é a subpasta do projeto.
  site: 'https://heliastorres.github.io',
  base: '/manocchio',
  // A página é uma só e o CSS tem ~18 KB: embutir no HTML evita um arquivo que bloqueia a primeira exibição
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()]
  }
});
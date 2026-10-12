import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://deriveddatakiller.com',
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.emmnezwater.com',
  output: 'static',
  build: { format: 'file' }
});

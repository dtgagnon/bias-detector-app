import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import type { Config } from '@sveltejs/kit';

const config: Config = {
  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: true
    }
  },
  preprocess: vitePreprocess()
};

export default config;

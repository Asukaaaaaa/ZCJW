import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

import PostCSS_Config from './rsbuild.postcss';

export default defineConfig({
  source: {
    entry: {
      popup: './src/popup.tsx',
      background: './src/background.tsx',
      'task-listener': './src/task-listener.tsx',
      'task-dispatcher': './src/task-dispatcher.tsx',
    },
  },
  html: {
    template: 'popup.html',
  },
  output: {
    filenameHash: false,
    minify: false,
  },
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  tools: {
    htmlPlugin: false,
    postcss: PostCSS_Config,
    rspack: {},
  },
});

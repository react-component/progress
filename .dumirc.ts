// more config: https://d.umijs.org/config
import { defineConfig } from 'dumi';

const basePath = process.env.GH_PAGES ? '/progress/' : '/';
const publicPath = process.env.GH_PAGES ? '/progress/' : '/';

export default defineConfig({
  favicons: ['https://avatars0.githubusercontent.com/u/9441414?s=200&v=4'],
  themeConfig: {
    name: '@rc-component/progress',
    logo: 'https://avatars0.githubusercontent.com/u/9441414?s=200&v=4',
  },
  base: basePath,
  publicPath,
  exportStatic: {},
  styles: [
    `
      .markdown table {
        width: auto !important;
      }
    `,
  ],
});

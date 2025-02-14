import { defineConfig } from '@rspack/cli';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import RefreshPlugin from '@rspack/plugin-react-refresh'; // Import it as default
import rspack from '@rspack/core';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    path: resolve(__dirname, 'public'), // Ensure output goes to the "public" directory
    filename: '[name].js', // Use entry name for output file names
    publicPath: 'auto', // Ensure proper public path for static files
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp', // Name of the host app
      remotes: {
        headerBarApp:
          'headerBarApp@https://appointment-tool-header-mhwec5146-popovici-rauls-projects.vercel.app/headerBarRemote.js',
      },

      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.CssExtractRspackPlugin({}),
    isDev ? new RefreshPlugin() : null, // Properly call RefreshPlugin as a function
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: false,
  },
});

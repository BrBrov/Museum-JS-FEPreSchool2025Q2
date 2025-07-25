import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { merge } from 'webpack-merge';
import devConfig from './webpack.development.js';
import prodConfig from './webpack.production.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isMode = process.argv[3] === 'development' ? true : false;

const defaultConfig = {
  entry: './src/script.js',
  mode: isMode ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              { tag: 'img', attribute: 'src', type: 'src' },
              { tag: 'link', attribute: 'href', type: 'src' },
              { tag: 'video', attribute: 'poster', type: 'src' },
              { tag: 'source', attribute: 'src', type: 'src' }
            ]
          }
        }
      },
      {
        test: /\.(svg|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/video/[name][ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico'
    })
  ],
  performance: {
    hints: false,
    maxAssetSize: 500000, // 500 KiB
    maxEntrypointSize: 500000, // 500 KiB
  },
};

function createConfig(mode = true) {
  if (mode) return merge(defaultConfig, devConfig);
  return merge(defaultConfig, prodConfig);
}

export default createConfig(isMode);
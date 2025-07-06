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
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      template: './src/index.html'
    })
  ]
};

function createConfig(mode = true) {
  if (mode) return merge(defaultConfig, devConfig);
  if (!mode) return merge(defaultConfig, prodConfig);
}

export default createConfig(isMode);
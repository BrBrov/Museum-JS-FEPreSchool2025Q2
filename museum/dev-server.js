import path from 'path';
import { fileURLToPath } from 'url';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config.js';
import { debug } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configDevServer = {
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath: '/',
    },
    compress: false,
    port: 3000,
    watchFiles: ['src/**/*'],
    open: true
};

const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(configDevServer, compiler);

async function serverStart() {
  console.log('Starting server...');
  await server.start();
};

serverStart();
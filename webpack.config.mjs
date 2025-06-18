import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import RefreshBabelPlugin from 'react-refresh/babel';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  performance: {
    maxAssetSize: 5 * 1024 * 1024, // 5MB
    maxEntrypointSize: 5 * 1024 * 1024, // 5MB
    hints: isDevelopment ? false : 'warning',
  },
  output: {
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  devServer: {
    port: 3001,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  cache: isDevelopment
    ? {
        type: 'filesystem',
        name: 'development-cache',
        cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
        compression: 'brotli',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }
    : false,
  snapshot: {
    managedPaths: [path.resolve(__dirname, 'node_modules')],
    immutablePaths: [],
    buildDependencies: {
      hash: true,
      timestamp: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // отключаем SVGO если нужно сохранить оригинальные атрибуты
              titleProp: true,
              ref: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10 KB
          },
        },
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
        exclude: /\.svg$/i, // исключаем svg из этого правила
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                  helpers: true,
                },
              ],
              isDevelopment && RefreshBabelPlugin,
            ].filter(Boolean),
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
  ].filter(Boolean),
  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
};

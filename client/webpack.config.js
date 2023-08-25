// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const FileManagerPlugin = require('filemanager-webpack-plugin');
// eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line no-undef
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    // eslint-disable-next-line no-undef
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        // eslint-disable-next-line no-undef
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
       rules: [
           {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
           },
           {
             test: /\.(png|jpg|jpeg|gif)$/i,
             type: 'asset/resource',
           },
           {
             test: /\.svg$/,
             type: 'asset/resource',
             generator: {
               filename: path.join('icons', '[name].[contenthash][ext]'),
             },
           },
           {
             test: /\.(woff2?|eot|ttf|otf)$/i,
             type: 'asset/resource',
           },
           {
            test: /\.(scss|css)$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader'
             ],
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // eslint-disable-next-line no-undef
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
    ],
    devServer: {
        // eslint-disable-next-line no-undef
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    optimization: {
     minimizer: [
       new ImageMinimizerPlugin({
         minimizer: {
           implementation: ImageMinimizerPlugin.imageminMinify,
           options: {
             plugins: [
               ['gifsicle', { interlaced: true }],
               ['jpegtran', { progressive: true }],
               ['optipng', { optimizationLevel: 5 }],
               ['svgo', { name: 'preset-default' }],
             ],
           },
         },
       }),
     ],
   },
};
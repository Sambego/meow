import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const createConfig = (env = 'development') => {
    return {
        entry: {
            script: './src/js/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: ['style-loader'],
                    use: ['css-loader?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader', 'sass-loader'],
                }),
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: ['style-loader'],
                    use: ['css-loader'],
                }),
            }, {
                test: /\.(woff|woff2)$/,
                use: 'file-loader?name=[name].[ext]',
            }, {
                test: /\.(xml|html|txt|md)$/,
                use: 'raw-loader',
            }, {
                test: /\.svg$/,
                use: 'svg-inline-loader',
            }],
        },
        devtool: 'source-map',
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true,
                disable: env !== 'production',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
        devServer: {
            port: process.env.PORT || 8080,
            host: 'localhost',
            publicPath: '/',
            contentBase: './src',
            historyApiFallback: true,
            https: true,
        },
    };
};

module.exports = createConfig;

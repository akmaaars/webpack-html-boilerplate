const path = require("path");
const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',

    target: 'web',

    entry: {
        index: path.resolve(__dirname, 'src/js', 'main.js')
    },
    
    output: {
        filename: isProduction ? 'js/bundle-[hash].js' : 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },

    devtool: isProduction ? false : 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                            plugins: [["autoprefixer"]]
                            },
                        }
                    }
                ]
            },
            { test: /\.js$/, use: ['babel-loader'] },
          
            { 
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                    }
                ]
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                    }
                }
                ]
            }

        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/public'),
                    to: 'public',
                    noErrorOnMissing: true,
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            title: 'Webpack simple boilerplate with jquery and sass',
            meta: {
                'description': { name: 'description', contnet: 'Enter your description here' },
                'keyword': { name: 'keywords', content: 'webpack, babel, jquery, sass, autoprefixer' },
                'og:title': { property: 'og:title', content: 'Webpack simple boilerplate with jquery and sass' },
                'og:description': { property: 'og:description', content: 'Enter your description here' },
                'og:type': { property: 'og:type', content: 'website' },
                'og:url': { property: 'og:url', content: 'Link to your web project' },
                'og:image': { property: 'og:image', content: '/public/cookie.jpg' },
                'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
                'twitter:title': { name: 'twitter:title', content: 'Webpack simple boilerplate with jquery and sass' },
                'twitter:description': { name: 'twitter:description', content: 'Enter your description here' },
                'twitter:image': { name: 'twitter:image', content: '/public/cookie.jpg' }
            }            
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? "css/[name]-[hash].css" : 'css/[name].css'
        }),
    ]
}
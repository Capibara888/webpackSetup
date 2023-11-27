import webpack, { Configuration, DefinePlugin } from "webpack";

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'

import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import path from "path";

export function buildPlugins (options: BuildOptions): Configuration['plugins'] {
    const {mode,paths, analyzer, platform} = options;
    const isDev = mode == 'development';
    const isProd = mode == 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin(
            {
                template:paths.html,
                favicon: path.resolve(paths.public, 'favicon.ico')
            }
                ),
        new DefinePlugin(
            {
                __PLATFORM__: JSON.stringify(platform),
        }
        ),
        // выносит отдельно от сборки проверку типов (ускоряет сборку проектаы, смотри options в ts-loader)
        new ForkTsCheckerWebpackPlugin(),
]

    if(isDev) {
 plugins.push(new webpack.ProgressPlugin())
 plugins.push(new ReactRefreshWebpackPlugin())
 
    }
    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }))
        plugins.push( new CopyPlugin({
            patterns: [
              { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
                         
            ],
          }),)
        
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }


    return plugins
}
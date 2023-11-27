import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "../types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from "./babel/buildBabelLoader";




export function buildLoaders(options:BuildOptions): ModuleOptions["rules"] {
  const {mode} = options;
  const isDev = mode == 'development';

  const cssLoaderWithModules = {
        
    loader: "css-loader",
    options: {
      modules: {
        
        localIdentName: isDev ? "[path][name]__[local]__[hash:base64:8]" : "[hash:base64:8]",
        
      }
    }
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
    
  }

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         // отключает проверку типов на этапе сборки, 
  //         // p.s оно выносится другим процессом в ForkTsCheckerWebpackPlugin)
  //         transpileOnly: isDev,
  //       }
  //     }
  //   ],
  //   exclude: /node_modules/,
  // }

    const babelLoader = buildBabelLoader({mode});


  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      { 
        loader: '@svgr/webpack', 
        options: { 
          icon: true ,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                }
              }
            ]
          }
        } 
      }
    ],
  }

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

    return [scssLoader,babelLoader, assetLoader, fontLoader, svgLoader]
}
const webpack = require( 'webpack' )
const path = require( 'path' )
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin
const ImageminWebpWebpackPlugin = require( 'imagemin-webp-webpack-plugin' )

const plugins = ( () => {
  const analyzer = false
  const plugins = [
    new webpack.ProvidePlugin( {
      'window.Quill': 'quill/dist/quill.js',
      Quill: 'quill/dist/quill.js'
    } ),
    new ImageminWebpWebpackPlugin( {
      config: [ {
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75
        }
      } ],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    } ),
  ]

  if ( analyzer ) {
    plugins.push( new BundleAnalyzerPlugin() )
  }

  return plugins
} )()

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variables.scss";',
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'src' ),
        '@images': path.resolve( __dirname, 'src', 'assets', 'images' ),
        '@icons': path.resolve( __dirname, 'src', 'assets', 'icons' ),
        '@scss': path.resolve( __dirname, 'src', 'assets', 'scss' ),
        '@components': path.resolve( __dirname, 'src', 'components' ),
        '@enums': path.resolve( __dirname, 'src', 'enums' ),
        '@classes': path.resolve( __dirname, 'src', 'helpers', 'classes' ),
        '@directives': path.resolve( __dirname, 'src', 'helpers', 'directives' ),
        '@filters': path.resolve( __dirname, 'src', 'helpers', 'filters' ),
        '@functions': path.resolve( __dirname, 'src', 'helpers', 'functions' ),
        '@mixins': path.resolve( __dirname, 'src', 'helpers', 'mixins' ),
        '@validators': path.resolve( __dirname, 'src', 'helpers', 'validators' ),
        '@layouts': path.resolve( __dirname, 'src', 'layouts' ),
        '@services': path.resolve( __dirname, 'src', 'services' ),
        '@views': path.resolve( __dirname, 'src', 'views' ),
      },
    },
    plugins,
    performance: {
      hints: false
    },
    devServer: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },

  chainWebpack ( config ) {
    config.module
      .rule( 'images' )
      .test( /\.(gif|png|jpe?g)$/i )
      .use( 'url-loader' ).tap( options => {
        return {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        }
      } )
      .end()
    config.module
      .rule( 'images' )
      .test( /\.(gif|png|jpe?g)$/i )
      .use( 'image-webpack-loader' )
      .loader( 'image-webpack-loader' ).tap( options => {
        return {
          pngquant: {
            enabled: false
          },
        }
      } )
      .end()
    config.plugins.delete( 'prefetch' )
  }
}

const tailwindConfig = require( './tailwind.config' )
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

function generateSCSSVars ( themeColors ) {
  let SCSSVars = ''
  const varName = ( string, key ) => string.length > 0 ? string + '-' + key : key

  const proccess = ( themeColors, string = '' ) => {
    for ( const key of Object.keys( themeColors ) ) {
      if ( typeof themeColors[ key ] === 'string' ) {
        SCSSVars += `$${ varName( string, key ) }:${ themeColors[ key ] };`
      } else proccess( themeColors[ key ], varName( string, key ) )
    }
  }

  proccess( themeColors, '' )

  return SCSSVars
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lena-fitness-competition/'
    : '/',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variables.scss";@import "@/assets/scss/_mixins.scss";' + generateSCSSVars( tailwindConfig.theme.colors ),
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'src' ),
        '@images': path.resolve( __dirname, 'src', 'assets', 'images' ),
        '@scss': path.resolve( __dirname, 'src', 'assets', 'scss' ),
        '@components': path.resolve( __dirname, 'src', 'components' ),
        '@icons': path.resolve( __dirname, 'src', 'components', 'icons' ),
        '@enums': path.resolve( __dirname, 'src', 'enums' ),
        '@classes': path.resolve( __dirname, 'src', 'helpers', 'classes' ),
        '@commands': path.resolve( __dirname, 'src', 'helpers', 'command' ),
        '@composable': path.resolve( __dirname, 'src', 'helpers', 'composable' ),
        '@directives': path.resolve( __dirname, 'src', 'helpers', 'directives' ),
        '@errors': path.resolve( __dirname, 'src', 'helpers', 'errors' ),
        '@filters': path.resolve( __dirname, 'src', 'helpers', 'filters' ),
        '@functions': path.resolve( __dirname, 'src', 'helpers', 'functions' ),
        '@js_utils': path.resolve( __dirname, 'src', 'helpers', 'js_utils' ),
        '@mixins': path.resolve( __dirname, 'src', 'helpers', 'mixins' ),
        '@plugins': path.resolve( __dirname, 'src', 'helpers', 'plugins' ),
        '@validators': path.resolve( __dirname, 'src', 'helpers', 'validators' ),
        '@layouts': path.resolve( __dirname, 'src', 'layouts' ),
        '@services': path.resolve( __dirname, 'src', 'services' ),
        '@views': path.resolve( __dirname, 'src', 'views' ),
        '#TailwindColors': path.resolve( __dirname, 'src', 'enums', 'tailwind.colors.js' ),
        consts: path.resolve( __dirname, 'src', 'enums', 'consts.js' )
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

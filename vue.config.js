const tailwindConfig = require( './tailwind.config' )

const path = require( 'path' )

const plugins = ( () => {
  const plugins = []

  return plugins
} )()

function generateSCSSVars ( themeColors ) {
  let SCSSVars = ''
  const varName = ( string, key ) => string.length > 0 ? string + '-' + key : key

  const proccess = ( themeColors, string = '' ) => {
    for ( const key of Object.keys( themeColors ) ) {
      if ( typeof themeColors[ key ] === 'string' ) {
        SCSSVars += `$${ varName( string, key ) }:${ themeColors[ key ] };`
      } else {proccess( themeColors[ key ], varName( string, key ) )}
    }
  }

  proccess( themeColors, '' )

  return SCSSVars
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ffbc-development/'
    : '/',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/_variables.scss";@import "@/assets/scss/_mixins.scss";' + generateSCSSVars( tailwindConfig.theme.colors ),
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'src' ),

        '@images': path.resolve( __dirname, 'src', 'assets', 'images' ),
        '@scss': path.resolve( __dirname, 'src', 'assets', 'scss' ),

        '@general_components': path.resolve( __dirname, 'src', 'components', 'general' ),
        '@shop_components': path.resolve( __dirname, 'src', 'components', 'shop' ),
        '@competition_components': path.resolve( __dirname, 'src', 'components', 'competitions' ),

        '@enums': path.resolve( __dirname, 'src', 'enums' ),
        '@icons': path.resolve( __dirname, 'src', 'components', 'icons' ),

        '@classes': path.resolve( __dirname, 'src', 'helpers', 'classes' ),
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
  },

}

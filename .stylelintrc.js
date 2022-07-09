const bemMatching = /^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/

module.exports = {
  'overrides': [
       
    {
      'files': [ '**/*.(html|vue)' ],
      'customSyntax': 'postcss-html'
    }
  ],
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-hudochenkov/dollar-variables',
    'stylelint-config-hudochenkov/order'
  ],
  'rules': {
    // DEFAULT
    'indentation': 2,
    'no-empty-source': null,
    'function-no-unknown': [
      true,
      {
        'ignoreFunctions': [ 
          'em', 'rem', 'theme'
        ]
      }
    ],
    'selector-class-pattern': bemMatching,
    'max-nesting-depth': 2,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        'ignorePseudoElements': [
          'v-deep'
        ]
      }
    ],
    // ORDER
    'order/properties-alphabetical-order': null,
    // SCSS
    'scss/at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'tailwind',
          'layer',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    
  }
}
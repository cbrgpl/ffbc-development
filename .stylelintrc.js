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
        ignoreFunctions: [ 'em', 'rem' ]
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
    ]
  }
}

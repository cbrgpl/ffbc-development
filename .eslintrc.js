module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
    'node': true
  },
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
    'parser': '@babel/eslint-parser'
  },
  'plugins': [ 'promise' ],
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],
  'rules': {
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'no-async-promise-executor': 'off',
    'import/named': 'off',
    'template-curly-spacing': [
      'error',
      'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'curly': 2,
    'indent': [
      'error',
      2
    ],
    'no-throw-literal': 'off',
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true
      }
    ],
    'camelcase': [
      'error',
      {
        'properties': 'always'
      }
    ],
    'comma-dangle': [
      1,
      'only-multiline'
    ],
    'space-in-parens': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'computed-property-spacing': [
      'error',
      'always'
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true
      }
    ],
    'vue/html-self-closing': 0,
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        'ignoreWhenNoAttributes': true,
        'ignoreWhenEmpty': true,
        'ignores': [
          'b-col'
        ]
      }
    ],
    'vue/no-multiple-template-root': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        'singleline': 'never',
        'multiline': 'never'
      }
    ],
    'vue/no-v-for-template-key': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 1,
        'multiline': {
          'max': 1
        }
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        'registeredComponentsOnly': true
      }
    ],
    'vue/attribute-hyphenation': [
      'error',
      'always'
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        'startTag': 'always',
        'selfClosingTag': 'always'
      }
    ],
    'vue/mustache-interpolation-spacing': [
      'error',
      'always'
    ],
    'vue/no-v-model-argument': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}

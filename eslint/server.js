'use strict';
const
  es_2015_server = require('eslint-config-es/2015/server');

const ecmaFeatures = {
  blockBindings: true,                     // enable let and const (aka block bindings)
  classes: true,                           // enable classes
  forOf: true
};
const rules = {
  'spaced-comment': 0,
  'no-inline-comments': 0,
  'no-mixed-requires': 0,
  'no-multi-spaces': [2, {
    exceptions: {VariableDeclarator: true, VariableDeclaration: true }
  }],
  indent: [2, 2],
  camelcase: 0,
  'func-style': [2, 'declaration'],
  'newline-after-var': 0,
  'array-bracket-spacing': 0,
  'object-curly-spacing': 0,
  'padded-blocks': 0,
  'vars-on-top': 0,
  'sort-vars': 0,
  'no-extend-native': [2, {exceptions: ['Object', 'String']}],
  'handle-callback-err': 0,
  'no-process-env': 0,
  'operator-assignment': [2, 'never'],
  'lines-around-comment': 0,
  'no-underscore-dangle': 0,      // disallow dangling underscores in identifiers
  'no-shadow': 0,
  'no-catch-shadow': 0,
  'no-warning-comments': 0,
  'new-cap': 0,
  'no-nested-ternary': 0,
  'newline-before-return': 0,
  'id-length': 0,
  'callback-return': 0,
  'prefer-reflect': 0,
  'prefer-arrow-callback': 0,
  'no-implicit-globals': 0,
  'global-require': 0,
  'no-useless-escape': 0,
  'no-extra-parens': [ 2, 'all', { nestedBinaryExpressions: false, returnAssign: false }],
  'spellcheck/spell-checker': [0, {
    comments: true,
    strings: true,
    identifiers: true,
    lang: 'en_US',
    skipWords: [
      'asparts',
      'redis',
      'dict',
      'aff',
      'hunspellchecker',
      'hunspell',
      'utils'
    ],
    skipIfMatch: [
      'http://[^s]*'
    ]
  }],
  'class-methods-use-this': 0
};
module.exports = Object.assign(es_2015_server, {
  ecmaFeatures: Object.assign(es_2015_server.ecmaFeatures || {}, ecmaFeatures),
  rules: Object.assign(es_2015_server.rules || {}, rules)
});

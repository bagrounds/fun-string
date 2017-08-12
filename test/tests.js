;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')

  function upper (string) {
    return string.toUpperCase()
  }

  var equalityTests = [
    [
      [[/[0-9]+ */, /\(/, /\)/], '(1 2 (3))'],
      ['(', '1 ', '2 ', '(', '3', ')', ')'],
      'tokenize'
    ],
    [[[/[0-9]+ */, /\(/, /\)/], '(1 23)'], ['(', '1 ', '23', ')'], 'tokenize'],
    [[[/[5-9]+/, /[0-4]+/, /[a-z]+/], 'ab;cef'], 'ab', 'matchAny'],
    [[[/[5-9]+/, /[0-4]+/], 'abcef'], '', 'matchAny'],
    [[[/[5-9]+/, /[0-4]+/], 'ab89cef'], '89', 'matchAny'],
    [[[/[5-9]+/, /[0-4]+/], 'ab32cef'], '32', 'matchAny'],
    [[/[5-9]+/, /[0-4]+/, 'abcef'], '', 'matchOr'],
    [[/[5-9]+/, /[0-4]+/, 'ab89cef'], '89', 'matchOr'],
    [[/[5-9]+/, /[0-4]+/, 'ab32cef'], '32', 'matchOr'],
    [[/[0-9]+/, 'abcef'], '', 'match'],
    [[/[0-9]+/, 'abc343ef4'], '343', 'match'],
    [[/[0-9]+/, 'abc343ef'], '343', 'match'],
    [[/[0-9a-z]+/, '93hello'], ['93hello', ''], 'splitPrefix'],
    [[/[0-9]+/, '93hello'], ['93', 'hello'], 'splitPrefix'],
    [[/[0-9]+/, 'hello'], ['', 'hello'], 'splitPrefix'],
    [[1, upper, 'hello'], 'hEllo', 'update'],
    [[1, 'x', 'hello'], 'hxllo', 'set'],
    [[1, 'hello'], 'e', 'get'],
    [[['HeLlo', 'ThEre', 'woRld!']], 'HelloThereWorld!', 'pascalCase'],
    [[['HeLlo', 'ThEre', 'woRld!']], 'helloThereWorld!', 'camelCase'],
    [['HelloWorld!'], 'HELLOWORLD!', 'upperCase'],
    [['HelloWorld!'], 'helloworld!', 'lowerCase'],
    [[], '', 'empty'],
    [['_', 5, 'abcdef'], 'abcdef', 'rightPad'],
    [['_', 5, 'abc'], 'abc__', 'rightPad'],
    [[' ', 5, 'abcdef'], 'abcdef', 'leftPad'],
    [[' ', 5, 'abc'], '  abc', 'leftPad'],
    [['pre', 'string'], 'prestring', 'prepend'],
    [['post', 'string'], 'stringpost', 'append']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  /* exports */
  module.exports = equalityTests.map(funTest.sync)
})()


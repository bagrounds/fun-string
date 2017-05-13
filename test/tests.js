;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')

  var equalityTests = [
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


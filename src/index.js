/**
 *
 * @module fun-string
 */
;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var fn = require('fun-function')
  var array = require('fun-array')
  var guarded = require('guarded')

  var isString = predicate.type('String')

  var stringsIn = guarded(array.all(isString))
  var stringsToString = stringsIn(isString)
  var stringNumberStringIn = guarded(predicate.type('(String, Number, String)'))
  var snsToString = stringNumberStringIn(isString)

  /* exports */
  module.exports = {
    prepend: fn.curry(stringsToString(prepend)),
    append: fn.curry(stringsToString(append)),
    empty: empty,
    leftPad: fn.curry(snsToString(leftPad)),
    rightPad: fn.curry(snsToString(rightPad))
  }

  /**
   *
   * @function module:fun-string.empty
   *
   * @return {String} the empty string
   */
  function empty () {
    return ''
  }

  /**
   *
   * @function module:fun-string.rightPad
   *
   * @param {String} value - to pad with
   * @param {Number} length - of the resulting string
   * @param {String} s - to pad
   *
   * @return {String} padded with value to length
   */
  function rightPad (value, length, s) {
    return array.rightPad(value, length, s.split('')).reduceRight(append, '')
  }

  /**
   *
   * @function module:fun-string.leftPad
   *
   * @param {String} value - to pad with
   * @param {Number} length - of the resulting string
   * @param {String} s - to pad
   *
   * @return {String} padded with value to length
   */
  function leftPad (value, length, s) {
    return array.leftPad(value, length, s.split('')).reduce(prepend, '')
  }

  /**
   *
   * @function module:fun-string.prepend
   *
   * @param {String} prefix - to prepend to string
   * @param {String} string - to prepend to
   *
   * @return {String} prefix + string
   */
  function prepend (prefix, string) {
    return prefix + string
  }

  /**
   *
   * @function module:fun-string.append
   *
   * @param {String} suffix - to append to string
   * @param {String} string - to append to
   *
   * @return {String} prefix + string
   */
  function append (suffix, string) {
    return string + suffix
  }
})()


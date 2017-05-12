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

  var stringsIn = guarded(array.all(predicate.type('String')))
  var stringsToString = stringsIn(predicate.type('String'))

  /* exports */
  module.exports = {
    prepend: fn.curry(stringsToString(prepend)),
    append: fn.curry(stringsToString(append))
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


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
  var object = require('fun-object')

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
    rightPad: fn.curry(snsToString(rightPad)),
    set: fn.curry(set),
    get: fn.curry(get),
    update: fn.curry(update),
    camelCase: camelCase,
    pascalCase: pascalCase,
    upperCase: upperCase,
    lowerCase: lowerCase,
    splitPrefix: fn.curry(splitPrefix),
    tokenize: fn.curry(tokenize),
    match: fn.curry(match),
    matchOr: fn.curry(matchOr),
    matchAny: fn.curry(matchAny),
    lex: fn.curry(lex)
  }

  /**
   *
   * @function module:fun-string.lex
   *
   * @param {Object} regexes - to match tokens
   * @param {String} subject - to lex
   *
   * @return {Array<String>} tokens
   */
  function lex (regexes, subject) {
    var matchers = Object.keys(regexes)

    return tokenize(object.values(regexes), subject)
      .map(function (token) {
        return [
          token,
          matchers.filter(function (matcher) {
            return regexes[matcher].test(token)
          })[0]
        ]
      })
  }

  /**
   *
   * @function module:fun-string.tokenize
   *
   * @param {Array<RegExp>} regexes - to match tokens
   * @param {String} subject - to split prefix on
   *
   * @return {Array<String>} tokens
   */
  function tokenize (regexes, subject) {
    var matchToken = fn.curry(matchAny)(
      regexes.map(function (r) {
        return RegExp('^' + r.source)
      })
    )

    var m = matchToken(subject)
    var result = []
    while (m) {
      result.push(m)
      subject = subject.slice(m.length)
      m = matchToken(subject)
    }

    return result
  }

  /**
   *
   * @function module:fun-string.matchAny
   *
   * @param {RegExp} regexes - regexes to match
   * @param {String} subject - to match from
   *
   * @return {String} first that matched regex | ''
   */
  function matchAny (regexes, subject) {
    return regexes.reduce(function (result, regex) {
      return result || match(regex, subject)
    }, '')
  }

  /**
   *
   * @function module:fun-string.matchOr
   *
   * @param {RegExp} regex1 - a regex to match
   * @param {RegExp} regex2 - a regex to match
   * @param {String} subject - to match from
   *
   * @return {String} first that matched regex | ''
   */
  function matchOr (regex1, regex2, subject) {
    return match(regex1, subject) || match(regex2, subject)
  }

  /**
   *
   * @function module:fun-string.match
   *
   * @param {RegExp} regex - match to match
   * @param {String} subject - to match from
   *
   * @return {String} first that matched regex | ''
   */
  function match (regex, subject) {
    var result = subject.match(regex)

    return result ? result[0] : ''
  }

  /**
   *
   * @function module:fun-string.splitPrefix
   *
   * @param {RegExp} regex - prefix to match
   * @param {String} subject - to split prefix on
   *
   * @return {Array<String>} [prefix, suffix]
   */
  function splitPrefix (regex, subject) {
    var match = subject.match(RegExp('^' + regex.source))

    return match
      ? [match[0], subject.slice(match[0].length)]
      : ['', subject]
  }

  /**
   *
   * @function module:fun-string.set
   *
   * @param {Number} index - to set
   * @param {String} value - to set index to
   * @param {String} subject - to set index of
   *
   * @return {String} subject with index set to value
   */
  function set (index, value, subject) {
    return array.set(index, value, subject.split('')).join('')
  }

  /**
   *
   * @function module:fun-string.get
   *
   * @param {Number} index - to set
   * @param {String} subject - to set index of
   *
   * @return {String} the character from subject at index
   */
  function get (index, subject) {
    return subject[index]
  }

  /**
   *
   * @function module:fun-string.update
   *
   * @param {Number} index - to set
   * @param {Function} f - String -> String
   * @param {String} subject - to set index of
   *
   * @return {String} subject with index set to f(subject[index])
   */
  function update (index, f, subject) {
    return set(index, f(subject[index]), subject)
  }

  /**
   *
   * @function module:fun-string.pascalCase
   *
   * @param {Array<String>} strings to camel case
   *
   * @return {String} APascalCasedString
   */
  function pascalCase (strings) {
    return update(0, upperCase, camelCase(strings))
  }

  /**
   *
   * @function module:fun-string.camelCase
   *
   * @param {Array<String>} strings to camel case
   *
   * @return {String} aCamelCasedString
   */
  function camelCase (strings) {
    return strings.map(lowerCase).map(function (string, i) {
      return i === 0
        ? string
        : array.ap([upperCase], string.split('')).join('')
    }).join('')
  }

  /**
   *
   * @function module:fun-string.upperCase
   *
   * @param {String} string - to upper case
   *
   * @return {String} string in upper case
   */
  function upperCase (string) {
    return string.toUpperCase()
  }

  /**
   *
   * @function module:fun-string.lowerCase
   *
   * @param {String} string - to lower case
   *
   * @return {String} string in lower case
   */
  function lowerCase (string) {
    return string.toLowerCase()
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


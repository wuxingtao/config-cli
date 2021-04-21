/**
 * @Desc: environment
 * @Author: wu xingtao
 * @Date: 2021/4/14
 */
const EventEmitter = require('events')
const memFs = require('mem-fs')
const TerminalAdapter = require('./adapter')

/**
 * Two-step argument splitting function that first splits arguments in quotes,
 * and then splits up the remaining arguments if they are not part of a quote.
 */
function splitArgsFromString(argsString) {
  let result = []
  const quoteSeparatedArgs = argsString.split(/(\x22[^\x22]*\x22)/).filter(x => x)
  quoteSeparatedArgs.forEach(arg => {
    if (arg.match('\x22')) {
      result.push(arg.replace(/\x22/g, ''))
    } else {
      result = result.concat(arg.trim().split(' '))
    }
  })
  return result
}

/**
 * `Environment` object is responsible of handling the lifecyle and bootstrap
 * of generators in a specific environment (your app).
 *
 * It provides a high-level API to create and run generators, as well as further
 * tuning where and how a generator is resolved.
 *
 * An environment is created using a list of `arguments` and a Hash of
 * `options`. Usually, this is the list of arguments you get back from your CLI
 * options parser.
 *
 * An optional adapter can be passed to provide interaction in non-CLI environment
 * (e.g. IDE plugins), otherwise a `TerminalAdapter` is instantiated by default
 *
 * @constructor
 * @mixes env/resolver
 * @param {String|Array} args
 * @param {Object} opts
 * @param {TerminalAdapter} [adaper] - A TerminalAdapter instance or another object
 *                                     implementing this adapter interface. This is how
 *                                     you'd interface Yeoman with a GUI or an editor.
 */
class Environment extends EventEmitter {
  static get queues() {
    return ['initializing', 'prompting', 'configuring', 'default', 'writing', 'conflicts', 'install', 'end']
  }
  /**
   * Make sure the Environment present expected methods if an old version is
   * passed to a Generator.
   * @param  {Environment} env
   * @return {Environment} The updated env
   */
  static enforceUpdate(env = {}) {
    if (!env.adapter) {
      env.adapter = new TerminalAdapter()
    }
    if (!env.sharedFs) {
      env.sharedFs = memFs.create()
    }
    return env
  }

  constructor(args, opts, adapter) {
    super()
    args = args || []
    this.arguments = Array.isArray(args) ? args : splitArgsFromString(args)
    this.options = opts || {}
    this.adapter = adapter || new TerminalAdapter()
  }
}

module.exports = Environment

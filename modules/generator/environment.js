/**
 * @Desc: environment
 * @Author: wu xingtao
 * @Date: 2021/4/14
 */
const EventEmitter = require('events')
const memFs = require('mem-fs')

class Environment extends EventEmitter {
  static enforceUpdate(env = {}) {
    if (!env.sharedFs) {
      env.sharedFs = memFs.create()
    }
    return env
  }
}

module.exports = Environment

/**
 * @Desc: utils
 * @Author: wu xingtao
 * @Date: 2021/4/21
 */
const EventEmitter = require('events')

module.exports = param => {
  function log(msg, ctx) {
    msg = msg || ''
    if (typeof ctx === 'object' && !Array.isArray(ctx)) {
      console.error(1)
    } else {
      console.error.apply(console, arguments)
    }
    return log
  }
  return log
}

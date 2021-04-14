/**
 * @Desc: app 执行generator生成命令行实例
 * @Author: wu xingtao
 * @Date: 2021/4/14
 */
const Generator = require('../modules/generator/generator')
const options = require('./options')

module.exports = async classFn => {
  const instance = new classFn(options)
  if (instance.prompting) {
    await instance.prompting()
  }
  if (instance.writing) {
    await instance.writing()
  }
}

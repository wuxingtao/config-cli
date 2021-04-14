/**
 * @Desc: app 执行generator命令行实例
 * @Author: wu xingtao
 * @Date: 2021/4/14
 */
const Generator = require('../modules/generator/generator')
const options = require('./options')

const ora = require('ora')
const chalk = require('chalk')
const warning = chalk.keyword('orange')
const success = chalk.greenBright
const error = chalk.red

module.exports = async classFn => {
  const instance = new classFn(options)
  if (instance.prompting) {
    await instance.prompting()
  }
  const spinner = ora(warning('loading'))
  spinner.start()
  if (instance.writing) {
    await instance.writing()
  }
  spinner.succeed(success('项目创建成功'))
}

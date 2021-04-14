/**
 * @Desc: initFormat
 * @Author: wu xingtao
 * @Date: 2021/4/13
 */
const path = require('path')
const ora = require('ora')
const ncp = require('ncp')
const generator = require('../utils/generator')
const Generator = require('../modules/generator/generator')

const chalk = require('chalk')
const warning = chalk.keyword('orange')
const success = chalk.greenBright
const error = chalk.red

module.exports = class extends Generator {
  async prompting() {
    const result = await this.prompt([
      {
        type: 'checkbox',
        message: '选择格式化类型',
        name: 'typeList',
        choices: [
          {
            name: 'eslint',
            checked: true
          },
          {
            name: 'prettier'
          }
        ]
      },
      {
        type: 'list',
        message: '选择应用框架',
        name: 'mvvm',
        choices: ['vue', 'react']
      }
    ])
    this.props = Object.assign({}, result)
    return result
  }
  async writing() {
    const templateDir = path.resolve(__dirname, '../templates/format/')
    const projectDir = process.cwd()

    const spinner = ora(warning('loading'))
    spinner.start()
    const ignoreList = {
      eslint: '.eslintrc.js',
      prettier: '.prettierrc'
    }
    const ncpOptions = {
      // 只支持忽略文件夹
      // filter: /format/g
    }

    // 逻辑执行
    ncp(templateDir, projectDir, ncpOptions, async err => {
      if (err) {
        error(err)
      }
      await generator({ ...this.props }, projectDir)
      spinner.succeed(success('项目创建成功'))
    })
  }
}

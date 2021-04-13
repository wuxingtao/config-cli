/**
 * @Desc: initFormat
 * @Author: wu xingtao
 * @Date: 2021/4/13
 */
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const ncp = require('ncp')
const generator = require('../utils/generator')

const chalk = require('chalk')
const warning = chalk.keyword('orange')
const success = chalk.greenBright
const error = chalk.red

module.exports = async () => {
  const templateDir = path.resolve(__dirname, '../templates/format/')
  const projectDir = process.cwd()
  const prompts = await inquirer.prompt([
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
  const spinner = ora(warning('loading'))
  spinner.start()
  ncp(templateDir, projectDir, async err => {
    if (err) {
      error(err)
    }
    await generator({ ...prompts }, projectDir)
    spinner.succeed(success('项目创建成功'))
  })
}

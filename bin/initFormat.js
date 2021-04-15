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
    const projectDir = path.join(process.cwd(), '/format/')
    this.fs.copy(this.templatePath('format/'), projectDir)
  }
}

/**
 * @Desc: initFormat
 * @Author: wu xingtao
 * @Date: 2021/4/13
 */
const path = require('path')
const ora = require('ora')
const ncp = require('ncp')
const Generator = require('../modules/generator/generator')

module.exports = class extends Generator {
  async prompting() {
    const result = await this.prompt([
      {
        type: 'checkbox',
        // message: '选择格式化类型',
        name: 'typeList',
        choices: [
          {
            name: 'eslint',
            checked: true
          },
          {
            name: 'prettier'
          },
          {
            name: 'tsConfig'
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
    const projectDir = path.join(process.cwd(), '/')
    if (this.props.typeList.includes('eslint')) {
      this.fs.copy(this.templatePath('format/.eslintrc.js'), path.join(projectDir, '.eslintrc.js'))
      this.fs.copy(this.templatePath('format/.eslintignore'), path.join(projectDir, '.eslintignore'))
    }
    if (this.props.typeList.includes('prettier')) {
      this.fs.copy(this.templatePath('format/.prettierrc'), path.join(projectDir, '.prettierrc'))
    }
    if (this.props.typeList.includes('tsConfig')) {
      this.fs.copy(this.templatePath('format/tsConfig.json'), path.join(projectDir, 'tsConfig.json'))
    }
  }
  install() {}
  end() {
    this.log('配置成功')
  }
}

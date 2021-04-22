/**
 * @Desc: initFormat
 * @Author: wu xingtao
 * @Date: 2021/4/13
 */
const path = require('path')
const chalk = require('chalk')
const Generator = require('../modules/generator/generator')

module.exports = class extends Generator {
  async prompting() {
    const result = await this.prompt([
      {
        type: 'checkbox',
        message: 'check the configuration you need',
        name: 'typeList',
        choices: [
          {
            name: 'prettier',
            checked: true
          },
          {
            name: 'eslint'
          },
          {
            name: 'tsConfig'
          }
        ]
      },
      {
        type: 'list',
        message: 'pick one mvvm frame',
        name: 'mvvm',
        choices: ['vue', 'react']
      }
    ])
    this.props = Object.assign({}, result)
    return result
  }
  async writing() {
    const projectDir = path.join(process.cwd(), '/')

    const writeConfig = {
      eslint: [
        {
          file: '.eslintrc.js',
          relativePath: 'format/.eslintrc.js'
        },
        {
          file: '.eslintignore',
          relativePath: 'format/.eslintignore'
        }
      ],
      prettier: [
        {
          file: '.prettierrc',
          relativePath: 'format/.prettierrc'
        }
      ],
      tsConfig: [
        {
          file: 'tsConfig.json',
          relativePath: 'format/tsConfig.json'
        }
      ]
    }
    const loopWrite = () => {
      Object.keys(writeConfig).forEach(item => {
        if (this.props.typeList.includes(item)) {
          writeConfig[item].forEach(file => {
            this.fs.copy(this.templatePath(file.relativePath), path.join(projectDir, file.file))
          })
        }
      })
    }
    loopWrite()

    // if (this.props.typeList.includes('eslint')) {
    //   this.fs.copy(this.templatePath('format/.eslintrc.js'), path.join(projectDir, '.eslintrc.js'))
    //   this.fs.copy(this.templatePath('format/.eslintignore'), path.join(projectDir, '.eslintignore'))
    // }
    // if (this.props.typeList.includes('prettier')) {
    //   this.fs.copy(this.templatePath('format/.prettierrc'), path.join(projectDir, '.prettierrc'))
    // }
    // if (this.props.typeList.includes('tsConfig')) {
    //   this.fs.copy(this.templatePath('format/tsConfig.json'), path.join(projectDir, 'tsConfig.json'))
    // }
  }
  install() {}
  end() {
    this.log(`${chalk.greenBright('success')} Configuration`)
  }
}

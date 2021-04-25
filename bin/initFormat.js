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
        message: 'Check the configuration you need',
        name: 'typeList',
        choices: [
          {
            name: 'prettier',
            checked: true
          },
          {
            name: 'eslint',
            checked: true
          },
          {
            name: 'tsConfig'
          }
        ]
      },
      {
        type: 'list',
        message: 'Pick a linter / formatter config',
        name: 'formatterConfig',
        choices: [
          {
            name: 'ESLint + Airbnb Config',
            value: 'Airbnb'
          },
          {
            name: 'ESLint + Standard Config',
            value: 'Standard'
          },
          {
            name: 'ESLint + Prettier',
            value: 'Prettier'
          }
        ],
        when: answers => {
          return answers.typeList && answers.typeList.indexOf('eslint') !== -1
        }
      },
      {
        type: 'list',
        message: 'Pick one mvvm frame',
        name: 'mvvm',
        choices: ['vue'],
        when: answers => {
          return answers.typeList && answers.typeList.indexOf('eslint') !== -1
        }
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
          relativePath: 'format/.eslintrc.js',
          type: 'tpl'
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
            if (file.type === 'tpl') {
              this.fs.copyTpl(this.templatePath(file.relativePath), path.join(projectDir, file.file), {
                props: this.props
              })
            } else {
              this.fs.copy(this.templatePath(file.relativePath), path.join(projectDir, file.file))
            }
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

/**
 * @Desc: initVue
 * @Author: wu xingtao
 * @Date: 2021/4/22
 */
const path = require('path')
const chalk = require('chalk')
const Generator = require('../modules/generator/generator')

const projectDir = path.join(process.cwd(), '/')
module.exports = class extends Generator {
  async prompting() {
    if (this.fs.exists(path.join(projectDir, './vue.config.js'))) {
      const existsPrompt = await this.prompt([
        {
          type: 'confirm',
          message: 'vue.config.js already exists, whether to overwrite',
          name: 'OverlayConfig'
        }
      ])
      if (!existsPrompt.OverlayConfig) {
        this.props = Object.assign({ breakWrite: true }, existsPrompt)
        return
      }
    }
    const result = await this.prompt([
      {
        type: 'confirm',
        message: 'Whether to open CSS SourceMap',
        name: 'cssMap'
      },
      {
        type: 'confirm',
        message: 'Whether to open devServer',
        name: 'devServer'
      }
    ])
    this.props = Object.assign({}, result)
    return result
  }
  async writing() {
    // break writing
    if (this.props.breakWrite) {
      return
    }
    // file writing
    this.fs.copyTpl(this.templatePath('vueConfig/vue.config.js'), path.join(projectDir, 'vue.config.js'), {
      props: this.props
    })
  }
  end() {
    this.log(`${chalk.greenBright('success')} Configuration`)
  }
}

/**
 * @Desc: initVue
 * @Author: wu xingtao
 * @Date: 2021/4/22
 */
const path = require('path')
const Generator = require('../modules/generator/generator')

const projectDir = path.join(process.cwd(), '/')
module.exports = class extends Generator {
  async prompting() {
    if (this.fs.exists(path.join(projectDir, './vue.config.js'))) {
      const existsPrompt = await this.prompt([
        {
          type: 'confirm',
          message: 'vue.config.js文件已存在是否覆盖',
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
        message: '是否开启CSS SourceMap',
        name: 'cssMap'
      },
      {
        type: 'confirm',
        message: '是否开启devServer',
        name: 'devServer'
      }
    ])
    this.props = Object.assign({}, result)
    return result
  }
  async writing() {
    // 终止写入
    if (this.props.breakWrite) {
      return
    }
    // 文件写入
    this.fs.copyTpl(this.templatePath('vueConfig/vue.config.js'), path.join(projectDir, 'vue.config.js'), {
      props: this.props
    })
  }
  end() {
    this.log('配置成功')
  }
}

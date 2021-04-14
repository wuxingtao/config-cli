/**
 * @Desc: Generator
 * @Author: wu xingtao
 * @Date: 2021/4/14
 */
const EventEmitter = require('events')
const FileEditor = require('mem-fs-editor')
const Environment = require('./environment')

/**
 * The `Generator` class provides the common API shared by all generators.
 * It define options, arguments, file, prompt, log, API, etc.
 *
 * It mixes into its prototype all the methods found in the `actions/` mixins.
 *
 * Every generator should extend this base class.
 *
 */
class Generator extends EventEmitter {
  constructor(args, options) {
    super()
    if (!Array.isArray(args)) {
      options = args
      args = []
    }

    this.options = options || {}
    // this._initOptions = _.clone(options)
    this._args = args || []
    this._options = {}
    this._arguments = []
    this._composedWith = []
    this._transformStreams = []

    this.props = []

    // this.option('help', {
    //   type: Boolean,
    //   alias: 'h',
    //   description: "Print the generator's options and usage"
    // })
    this.env = this.options.env || {}

    Environment.enforceUpdate(this.env)

    // 文件内存读取
    this.fs = FileEditor.create(this.env.sharedFs)
  }

  /**
   * Prompt user to answer questions. The signature of this method is the same as {@link https://github.com/SBoudrias/Inquirer.js Inquirer.js}
   *
   * On top of the Inquirer.js API, you can provide a `{cache: true}` property for
   * every question descriptor. When set to true, Yeoman will store/fetch the
   * user's answers as defaults.
   * @param  {array} questions  Array of question descriptor objects. See {@link https://github.com/SBoudrias/Inquirer.js/blob/master/README.md Documentation}
   * @param questions
   * @returns {PromiseLike<any> | Promise<any>}
   */
  prompt(questions) {
    return this.env.adapter.prompt(questions).then(answers => {
      return answers
    })
  }
  log() {}
}

module.exports = Generator

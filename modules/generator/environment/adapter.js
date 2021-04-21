/**
 * @Desc: adapter
 * @Author: wu xingtao
 * @Date: 2021/4/20
 */
const chalk = require('chalk')
const inquirer = require('inquirer')
const logger = require('./utils/log')

class TerminalAdapter {
  constructor() {
    this.promptModule = inquirer.createPromptModule()
  }
  prompt(questions, cb) {
    const promise = this.promptModule(questions)
    promise.then(cb || undefined)
    return promise
  }
}

/**
 * Logging utility
 * @type {env/log}
 */
TerminalAdapter.prototype.log = logger()

module.exports = TerminalAdapter

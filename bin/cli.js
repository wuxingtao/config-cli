#!/usr/bin/env node

const { program } = require('commander')
const app = require('../app')
const initFormat = require('./initFormat')
program.version(require('../package.json').version, '-v,--version').description('config cli program')

program
  .command('init-format')
  .description('初始化代码格式化')
  .action(() => app(initFormat))

program.parse(process.argv)

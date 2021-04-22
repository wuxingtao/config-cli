#!/usr/bin/env node

const { program } = require('commander')
const app = require('../app')
const initFormat = require('./initFormat')
const VueInit = require('./initVue')

program.version(require('../package.json').version, '-v,--version').description('config cli program')

program
  .command('init-format')
  .description('初始化代码格式化')
  .action(() => app(initFormat))

program
  .command('init-vue')
  .description('vue-cli初始化配置')
  .action(() => app(VueInit))

program.parse(process.argv)

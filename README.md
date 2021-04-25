# config-cli

[![NPM version][npm-image]][npm-url]
[![license status][license-image]][npm-url]
[![Coverage Status](https://coveralls.io/repos/github/wuxingtao/config-cli/badge.svg?branch=master)](https://coveralls.io/github/wuxingtao/config-cli?branch=master)


>person configuration with cli

>Lets you quickly get a default develop configuration
>* support eslint + prettier configuration
>* support typescript tsconfig.json
>* support vue-cli vue.config.js

## install
`yarn add @wuxingtao/config-cli`

`npm run @wuxingtao/config-cli`

## cli help
```
Usage: config [options] [command]

config cli program

Options:
-v,--version    output the version number
-h, --help      display help for command

Commands:
init-format     eslint+prettier+tsconfig default configuration
init-vue        vue-cli vue.config.js configuration
help [command]  display help for command
```

### cli demo
`config init-format`

```
~/test » config init-vue     
? vue.config.js already exists, whether to overwrite Yes
? Whether to open CSS SourceMap Yes
? Whether to open devServer Yes
Configuration successful
--------------------------------------------------------------------------------
~/test » config init-format
? Check the configuration you need prettier
success Configuration
--------------------------------------------------------------------------------
~/test » config init-format
? Check the configuration you need prettier, eslint
? Pick a linter / formatter config ESLint + Prettier
? Pick one mvvm frame vue
success Configuration
```

`config init-vue`

## TODOLIST
-[x] eslint+prettier+typescript config
-[x] vue-cli config
-[ ] rollup project config
-[ ] storybook config
-[ ] webpack config


## License

MIT © [xingtao](https://github.com/wuxingtao)


[npm-image]: https://badge.fury.io/js/config-cli.svg
[npm-url]: https://www.npmjs.com/package/config-cli
[travis-image]: https://travis-ci.com/config-cli.svg?branch=master
[travis-url]: https://travis-ci.com/config-cli
[daviddm-image]: https://david-dm.org/config-cli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/config-cli
[license-image]: https://img.shields.io/github/license/wuxingtao/config-cli

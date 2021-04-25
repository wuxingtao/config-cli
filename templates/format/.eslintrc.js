module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    <%_ if (props.formatterConfig === 'Prettier') { -%>
    'eslint:recommended',
    '@vue/prettier',
    <%_ } -%>
    <%_ if (props.formatterConfig === 'Standard') { -%>
    '@vue/standard'
    <%_ } -%>
    <%_ if (props.formatterConfig === 'Airbnb') { -%>
    '@vue/airbnb',
    <%_ } -%>
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

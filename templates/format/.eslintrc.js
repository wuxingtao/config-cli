module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    <% if(props.formatterConfig === 'Prettier') { -%>
    'eslint:recommended',
    '@vue/prettier',
    <% } %> else if (props.formatterConfig === 'Standard') { -%>
    '@vue/standard'
    <% } %> else if(props.formatterConfig === 'Airbnb') { -%>
    '@vue/airbnb',
    <% } %>
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

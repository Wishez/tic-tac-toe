const path = require('path')
const find = require('lodash/find')
const { addWebpackPlugin, addWebpackAlias } = require("customize-cra")
const flow = require("lodash/flow")
const StylelintPlugin = require('stylelint-webpack-plugin')

const enableEslintAutoFix = (config) => {
  const eslintPlugin = find(config.plugins, { key: 'ESLintWebpackPlugin' })
  eslintPlugin.options.fix = true

  return config
}

module.exports = function override(config, env) {
  const configTransformations = []
  if (env === 'development') {
    configTransformations.push(addWebpackPlugin(
      new StylelintPlugin({
        configFile: './.stylelintrc',
        failOnError: true,
        fix: true,
      })
    ))
  }

  configTransformations.push(
    addWebpackAlias({ '@': path.resolve(__dirname, './src/') }),
    enableEslintAutoFix,
  )

  return flow(configTransformations)(config)
}
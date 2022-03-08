const path = require('path')
const fs = require('fs')
const find = require('lodash/find')
const { addWebpackPlugin, addWebpackAlias } = require("customize-cra")
const flow = require("lodash/flow")
const StylelintPlugin = require('stylelint-webpack-plugin')

const addaddWebpackModuleRuleInBegin = (rule) => (config) => {
  config.module.rules.unshift(rule)

  return config
}

const enableEslintAutoFix = (config) => {
  const eslintPlugin = find(config.plugins, { key: 'ESLintWebpackPlugin' })
  eslintPlugin.options.fix = true

  return config
}

module.exports = {
  webpack: (config, env) => {
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
    if (!config.stats) {
      config.stats = {}
    }
    config.stats.children = true

    configTransformations.push(
      addWebpackAlias({ '@': path.resolve(__dirname, './src/') }),
      enableEslintAutoFix,
      addaddWebpackModuleRuleInBegin({ test: /\.worker\.ts$/, use: { loader: "worker-loader" } }),
    )

    return flow(configTransformations)(config)
  },
  jest: (config) => {
    config.transform = {
      ...config.transform,
      '^.+\\.worker.[t|j]sx?$': 'workerloader-jest-transformer',
    }

    return config
  }
}
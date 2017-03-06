const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const { configPath, pluginPath } = require('./path')
const zazuConfig = require(configPath)

module.exports = () => {
  return (value, env = {}) => {
    const updateConfig = new Promise((resolve, reject) => {
      zazuConfig.plugins = zazuConfig.plugins.filter((plugin) => {
        const name = typeof plugin === 'string' ? plugin : plugin.name
        return name !== value
      })
      const zazuValue = JSON.stringify(zazuConfig, null, 2)
      fs.writeFile(configPath, zazuValue, (err) => {
        err ? reject(err) : resolve()
      })
    })

    const deletePlugin = new Promise((resolve, reject) => {
      rimraf(path.join(pluginPath, value), (err) => {
        err ? reject(err) : resolve()
      })
    })

    return Promise.all([updateConfig, deletePlugin])
  }
}

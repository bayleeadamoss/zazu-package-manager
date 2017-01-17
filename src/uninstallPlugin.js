const fs = require('fs')
const configPath = require('./configPath')
const zazuConfig = require(configPath)

module.exports = () => {
  return (value, env = {}) => {
    return new Promise((resolve, reject) => {
      zazuConfig.plugins = zazuConfig.plugins.filter((plugin) => {
        const name = typeof plugin === 'string' ? plugin : plugin.name
        return name !== value
      })
      const zazuValue = JSON.stringify(zazuConfig, null, 2)
      fs.writeFile(configPath, zazuValue, (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}

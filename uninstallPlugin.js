const os = require('os')
const fs = require('fs')
const path = require('path')
const zazuPath = path.join(os.homedir(), '.zazurc.json')
const zazuConfig = require(zazuPath)

module.exports = () => {
  return (value, env = {}) => {
    return new Promise((resolve, reject) => {
      zazuConfig.plugins = zazuConfig.plugins.filter((plugin) => {
        const name = typeof plugin === 'string' ? plugin : plugin.name
        return name !== value
      })
      fs.writeFile(zazuPath, zazuConfig, (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}

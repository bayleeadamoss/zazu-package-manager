const fs = require('fs')
const packages = require('./packages')
const { configPath } = require('./path')
const zazuConfig = require(configPath)

module.exports = ({ cwd }) => {
  return (value, env = {}) => {
    return packages.get(cwd).then((allPackages) => {
      return allPackages.find((plugin) => {
        return plugin.githuburl === value
      })
    }).then((plugin) => {
      if (plugin) return plugin
      return {
        githuburl: value,
        type: 'package',
      }
    }).then((plugin) => {
      return new Promise((resolve, reject) => {
        if (plugin.type === 'theme') {
          zazuConfig.theme = plugin.githuburl
        } else {
          zazuConfig.plugins.push(plugin.githuburl)
        }
        const zazuValue = JSON.stringify(zazuConfig, null, 2)
        fs.writeFile(configPath, zazuValue, (err) => {
          err ? reject(err) : resolve()
        })
      })
    })
  }
}

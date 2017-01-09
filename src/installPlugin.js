const os = require('os')
const fs = require('fs')
const path = require('path')
const zazuPath = path.join(os.homedir(), '.zazurc.json')
const zazuConfig = require(zazuPath)
const packages = require('./packages')

module.exports = ({ cwd }) => {
  return (value, env = {}) => {
    return packages.get(cwd).then((allPackages) => {
      return allPackages.find((plugin) => {
        return plugin.githuburl === value
      })
    }).then((plugin) => {
      return new Promise((resolve, reject) => {
        if (plugin.type === 'theme') {
          zazuConfig.theme = plugin.githuburl
        } else {
          zazuConfig.plugins.push(plugin.githuburl)
        }
        const zazuValue = JSON.stringify(zazuConfig, null, 2)
        fs.writeFile(zazuPath, zazuValue, (err) => {
          err ? reject(err) : resolve()
        })
      })
    })
  }
}

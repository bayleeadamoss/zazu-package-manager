const os = require('os')
const path = require('path')
const home = os.homedir()
const zazu = require(path.join(home, '.zazurc.json'))

module.exports = () => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve(zazu.plugins.map((plugin) => {
        if (typeof plugin !== 'string') plugin = plugin.name
        return {
          icon: 'fa-plug',
          title: plugin,
          subtitle: 'Click to go to plugin homepage.',
          value: plugin,
        }
      }))
    })
  }
}

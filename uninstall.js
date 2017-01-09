const os = require('os')
const path = require('path')
const fuzzyfind = require('fuzzyfind')
const zazu = require(path.join(os.homedir(), '.zazurc.json'))

module.exports = () => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve(fuzzyfind(query, zazu.plugins, {
        accessor: (plugin) => {
          return plugin.title + plugin.description
        },
      }).map((plugin) => {
        if (typeof plugin !== 'string') plugin = plugin.name
        return {
          icon: 'fa-plug',
          title: plugin,
          subtitle: 'Click to uninstall plugin',
          value: plugin,
        }
      }))
    })
  }
}

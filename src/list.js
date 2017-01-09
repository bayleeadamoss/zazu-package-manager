const os = require('os')
const path = require('path')
const fuzzyfind = require('fuzzyfind')
const packages = require('./packages')

module.exports = ({ cwd }) => {
  const zazuConfig = require(path.join(os.homedir(), '.zazurc.json'))

  return (query, env = {}) => {
    return packages.get(cwd).then((allPackages) => {
      return zazuConfig.plugins.map((plugin) => {
        const name = typeof plugin === 'string' ? plugin : plugin.name
        return allPackages.find((pack) => {
          return pack.githuburl === name
        }) || {
          title: name,
          githuburl: name,
        }
      })
    }).then((installedPlugins) => {
      return fuzzyfind(query.trim(), installedPlugins, {
        accessor: (plugin) => {
          return plugin.githuburl + plugin.title + plugin.description
        },
      }).map((plugin) => {
        const same = plugin.title === plugin.githuburl
        return {
          icon: 'fa-plug',
          title: same ? plugin.title : `${plugin.title} - ${plugin.githuburl}`,
          value: plugin.githuburl,
        }
      })
    })
  }
}

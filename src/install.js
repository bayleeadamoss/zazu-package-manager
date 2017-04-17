const fuzzyfind = require('fuzzyfind')
const packages = require('./packages')
const { configPath } = require('./path')

module.exports = ({ cwd }) => {
  const zazuConfig = require(configPath)
  const installedPlugins = zazuConfig.plugins.map((plugin) => {
    return typeof plugin === 'string' ? plugin : plugin.name
  })

  return (query, env = {}) => {
    return packages.get(cwd).then((allPackages) => {
      return allPackages.filter((plugin) => {
        return !installedPlugins.includes(plugin.githuburl)
      })
    }).then((newPackages) => {
      return fuzzyfind(query, newPackages, {
        accessor: (plugin) => {
          return plugin.githuburl + plugin.title + plugin.description
        },
      }).map((plugin) => {
        return {
          icon: plugin.type === 'plugin' ? 'fa-plug' : 'fa-paint-brush',
          id: plugin.title,
          title: plugin.title,
          subtitle: plugin.description,
          value: plugin.githuburl,
        }
      })
    })
  }
}

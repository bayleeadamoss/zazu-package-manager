const fs = require('fs')
const json = require('relaxed-json')
const fuzzyfind = require('fuzzyfind')
const packages = require('./packages')
const { configPath } = require('./path')

module.exports = function install ({ cwd }) {
  const zazuConfig = json.parse(fs.readFileSync(configPath, 'utf-8'))
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

const fs = require('fs')
const json = require('relaxed-json')
const { configPath } = require('./path')

module.exports = function installDirect () {
  const zazuConfig = json.parse(fs.readFileSync(configPath, 'utf-8'))
  const installedPlugins = zazuConfig.plugins.map((plugin) => {
    return typeof plugin === 'string' ? plugin : plugin.name
  })

  const hasGitHubLikeName = (query) => !!query.match(/.\/./)
  const isInstalled = (query) => !!installedPlugins.find((p) => p === query)

  return (query, env = {}) => {
    if (hasGitHubLikeName(query) && !isInstalled(query)) {
      return Promise.resolve([
        {
          icon: 'fa-plug',
          title: `Install package '${query}' from GitHub`,
          value: query,
        },
      ])
    }
    return Promise.resolve([])
  }
}

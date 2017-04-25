const { configPath } = require('./path')

module.exports = () => {
  const zazuConfig = require(configPath)
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

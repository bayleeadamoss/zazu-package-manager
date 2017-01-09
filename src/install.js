const fuzzyfind = require('fuzzyfind')

module.exports = (pluginContext) => {
  const { cwd } = pluginContext
  const data = require(cwd, 'data', 'packages.json')
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve(fuzzyfind(query, data.packages, {
        accessor: (plugin) => {
          return plugin.title + plugin.description
        },
      }).map((plugin) => {
        return {
          icon: plugin.type === 'plugin' ? 'fa-plug' : 'fa-paint-brush',
          title: plugin.title,
          subtitle: plugin.description,
          value: plugin.title,
        }
      }))
    })
  }
}

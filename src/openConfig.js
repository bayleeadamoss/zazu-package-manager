const { configPath } = require('./path')

module.exports = (pluginContext) => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve([
        {
          icon: 'fa-file-text',
          title: 'Open Zazu Configuration',
          value: configPath,
        },
      ])
    })
  }
}

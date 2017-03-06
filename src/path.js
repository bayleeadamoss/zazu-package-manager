const os = require('os')
const path = require('path')
const home = process.env.ZAZU_HOME || os.homedir()

module.exports = {
  configPath: path.join(home, '.zazurc.json'),
  pluginPath: path.join(home, '.zazu', 'plugins'),
}

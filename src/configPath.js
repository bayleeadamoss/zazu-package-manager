const os = require('os')
const path = require('path')
const home = process.env.ZAZU_HOME || os.homedir()

module.exports = path.join(home, '.zazurc.json')

const fetch = require('node-fetch')

const packageUrl = 'http://zazuapp.org/api/packages.json'
let packages = null

const self = {
  refresh: cwd => {
    return fetch(packageUrl)
      .then(res => res.json())
      .then(result => result.packages)
      .catch(() => [])
  },
  get: cwd => {
    return packages ? Promise.resolve(packages) : self.refresh(cwd)
  },
}

module.exports = self

const http = require('http')

const packageUrl = 'http://zazuapp.org/api/packages.json'
let packages = null

const self = {
  refresh: (cwd) => {
    return new Promise((resolve, reject) => {
      http.get(packageUrl, (response) => {
        const chunks = []
        response.on('data', (chunk) => {
          chunks.push(chunk.toString())
        })
        response.on('end', () => {
          packages = JSON.parse(chunks.join('')).packages
          resolve(packages)
        })
      })
    })
  },
  get: (cwd) => {
    return packages ? Promise.resolve(packages) : self.refresh(cwd)
  },
}

module.exports = self

const packages = require('./packages')

module.exports = ({ cwd }) => {
  return () => {
    return packages.refresh(cwd)
  }
}

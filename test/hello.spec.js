const expect = require('chai').expect
const hello = require('../install')()

describe('Install', () => {
  describe('.search', () => {
    it('does not include a name', () => {
      hello.search('hello').then((results) => {
        expect(results[0].title).to.not.include('spock')
      })
    })

    it('does include a name', () => {
      hello.search('hello spock').then((results) => {
        expect(results[0].title).to.include('spock')
      })
    })
  })
})

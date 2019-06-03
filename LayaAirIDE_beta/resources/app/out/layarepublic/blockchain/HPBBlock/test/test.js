var assert = require('chai').assert
var worker = require('../index')

describe("create project", function() {
  describe('create', function() {
    it('create ok', function(done) {
      worker.init("first_project", ".", function(err) {
        if(err) return done(err)
        done()
      })
    })
  })
})

describe('compile sol', function() {
  describe('compile single', function() {
    it('compile ok', function(done) {
      let opts = worker.compileOpts()
      assert.hasAllKeys(opts, ["contracts_build_directory", "contracts_directory", "all", "quiet", "strict", "optimizer"])
      opts.contracts_directory = "test"
      opts.contracts_build_directory = "test/build"
      worker.compile(opts, function(err) {
        if(err) return done(err)
        done()
      })
    });
  });
});

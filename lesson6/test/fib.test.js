// file: test/main.test.js
var main = require('../fib');
var should = require('should');

describe('test/fib.test.js', function () {
  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });
});
'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');

var GIFReducer = require('../index');
var gr = new GIFReducer();

gr.filePath = 'test/test.gif';

describe('reducer', function () {
  it('should reduce the frames', function (done) {
    gr.reduce(function (err, buffer) {
      gr.frameCount.should.equal(4);
      buffer.length.should.equal(3261);
      done();
    });
  });
});
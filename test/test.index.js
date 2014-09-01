'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');

var GIFReducer = require('../index');
var gr = new GIFReducer();

describe('reducer', function () {
  it('should reduce the frames', function (done) {
    // originally 20 frames
    gr.filePath = 'test/test.gif';

    gr.reduce(function (err, buffer) {
      gr.frameCount.should.equal(10);
      buffer.length.should.equal(8103);
      done();
    });
  });

  it('should throw an error while trying to read the buffer', function (done) {
    gr.filePath = 'test/test3.gif';

    gr.reduce(function (err, buffer) {
      should.exist(err);
      done();
    });
  });

  it('should not reduce the frames', function (done) {
    // originally 10 frames, 15 is the minimum # of frames
    gr.filePath = 'test/test2.gif';

    gr.reduce(function (err, buffer) {
      gr.frameCount.should.equal(10);
      buffer.length.should.equal(1415);
      done();
    });
  });
});
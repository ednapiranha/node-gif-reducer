'use strict';

var fs = require('fs');
var readimage = require('readimage');
var writegif = require('writegif');

var MIN_FRAMES = 15;

var GIFReducer = function () {
  this.filePath = false;
  this.buffer = false;
  this.frameCount = 0;
  this.newImage;

  var self = this;

  var reset = function () {
    self.newImage = null;
    self.filePath = false;
    self.buffer = false;
    self.frameCount = 0;
  };

  var bufferize = function (next) {
    writegif(self.newImage, function (err, buffer) {
      if (err) {
        next(err);
        return;
      }

      next(null, buffer);
      reset();
    });
  };

  this.reduce = function (next) {
    try {
      var count = 1;
      var newFrames = [];

      if (this.filePath) {
        this.buffer = fs.readFileSync(this.filePath);
      }

      readimage(this.buffer, function (err, image) {
        if (err) {
          next(err);
          return;
        }

        if (image.frames.length < MIN_FRAMES) {
          self.frameCount = image.frames.length;
          // Under MIN_FRAMES there isn't any point in reducing them or the image will be useless
          next(null, self.buffer);
          return;
          reset();
        }

        self.newImage = image;

        image.frames.forEach(function (frame) {
          if (count % 2 === 0 || count % 3 === 0) {
            newFrames.push(frame);
          }

          if (count === image.frames.length) {
            self.frameCount = newFrames.length;
            self.newImage.frames = newFrames;

            bufferize(next);
          }

          count ++;
        });
      });
    } catch (err) {
      next(err);
    }
  };
};

module.exports = GIFReducer;
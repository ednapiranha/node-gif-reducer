'use strict';

var fs = require('fs');
var readimage = require('readimage');
var writegif = require('writegif');

var GIFReducer = function () {
  this.filePath = false;
  this.buffer = false;
  this.newImage;

  var self = this;

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

        self.newImage = image;

        image.frames.forEach(function (frame) {
          if (count === 1 || count % 2 === 0) {
            newFrames.push(frame);
          }

          if (count === image.frames.length) {
            next(null, newFrames);
          }

          count ++;
        });
      });
    } catch (err) {
      next(err);
    }
  };

  this.bufferize = function (next) {
    writegif(this.newImage, function (err, buffer) {
      if (err) {
        next(err);
        return;
      }

      next(null, buffer);
    });
  };
};

module.exports = GIFReducer;
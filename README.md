# GIF Reducer

Reduces the frames in a GIF by half

## Usage

    var GIFReducer = require('GIFReducer');
    var gr = new GIFReducer();

    gr.filePath = 'test/test.gif';

    gr.reduce(function (err, frames) {
      console.log(frames);
    });

    gr.bufferize(function (err, buffer) {
      console.log(buffer);
    });
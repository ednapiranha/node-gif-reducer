# GIF Reducer

Reduces the frames in an animated GIF

## Usage

    var GIFReducer = require('GIFReducer');
    var gr = new GIFReducer();

    gr.filePath = 'test/test.gif';

    gr.reduce(function (err) {
      console.log(gr.frameCount); // Number of final frames
      console.log(gr.buffer); // Final buffer
    });
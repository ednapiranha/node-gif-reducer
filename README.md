# GIF Reducer

Reduces the frames in an animated GIF

## Usage

    var GIFReducer = require('GIFReducer');
    var gr = new GIFReducer();

    gr.filePath = 'test/test.gif';

    gr.reduce(function (err, buffer) {
      console.log(gr.frameCount); // Number of final frames
      console.log(buffer); // Final buffer
    });

## Notes

If your GIF is 15 frames or less, then it won't be reduced - it will just return back the orignial version.

## Test

    npm test
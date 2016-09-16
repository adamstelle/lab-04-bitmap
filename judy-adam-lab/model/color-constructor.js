'use strict';

const fs = require('fs');

const bitmapConstructor = require(`${__dirname}/bitmap-constructor`);

module.exports = exports = {};
exports.slicedArray = [];

exports.colorInvert = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArrayEnd; i++) {
    colorArray[i] = 255 - colorArray[i];
  }
  fs.writeFile(`${__dirname}/testingInvert.bmp`, buffer, (err) => {
    if(err) throw err;
  });
};

exports.greyScale = function (buffer, picData){
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  exports.slicingColorArray(colorArray, 256);

};

//inspired/slightly taken from stackoverflow http://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
exports.slicingColorArray = function(array, number){
  var length = array.length;
  var i = 0;
  var size;
  while (i < length){
    size = Math.ceil((length - i) / number--);
    exports.slicedArray.push(array.slice(i, i += size));
  }
};
// exports.greyScale = function (buffer, picData) {
//   var colorArrayEnd = picData.offset;
//   var colorArray = buffer.slice(54, colorArrayEnd);
//   // for (var i=3; i<colorArrayEnd; i=i+4) {
//   var rgba = buffer.slice(0,4);
//   var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
//   rgba[0] = rgba[1] = rgba[2] = avgVal;
//   fs.writeFile(`${__dirname}/testingGreyscale.bmp`, buffer, (err) => {
//     if(err) throw err;
//   });
// };

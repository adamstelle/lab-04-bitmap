'use strict';

const fs = require('fs');
module.exports = exports = {};

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

exports.greyScale = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  // for (var i=3; i<colorArrayEnd; i=i+4) {
  var rgba = buffer.slice(0,4);
  var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
  rgba[0] = rgba[1] = rgba[2] = avgVal;
  console.log(rgba[2]);
  // rgba.reduce(function(prev,curr){
    // console.log('is this the averge?', (prev + curr)/rgba.length);
  // return (prev + curr)/rgba.length;
  //
  fs.writeFile(`${__dirname}/testingGreyscale.bmp`, buffer, (err) => {
    if(err) throw err;
  });
  // }
};

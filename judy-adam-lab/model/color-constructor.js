'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);
module.exports = exports = {};

exports.colorInvert = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArrayEnd; i++) {
    colorArray[i] = 255 - colorArray[i];
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testing-invert.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

exports.greyScale = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArray.length; i=i+4){
    var rgba = colorArray.slice(i,i+4);
    var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
    rgba[0] = rgba[1] = rgba[2] = avgVal;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testinggreyscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

exports.rgbScale = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArray.length; i=i+4){
    colorArray[i] = colorArray[i] * .5;
    colorArray[i+1] = colorArray[i+1] * .5;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testingrgbscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

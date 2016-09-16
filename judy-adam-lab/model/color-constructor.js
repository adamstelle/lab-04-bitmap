'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);
module.exports = exports = {};

exports.colorInvert = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  if(colorArrayEnd-54==0){
    console.log('no color palette! manipulating pixels directly...');
    colorArrayEnd = picData.fileSize;
  }
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
  var rgbSequence = 4;
  if(colorArrayEnd-54==0){
    console.log('no color palette! manipulating pixels directly...');
    colorArrayEnd = picData.fileSize;
    rgbSequence = 3;
  }
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArray.length; i=i+rgbSequence){
    var rgba = colorArray.slice(i,i+rgbSequence);
    var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
    rgba[0] = rgba[1] = rgba[2] = avgVal;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testinggreyscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

exports.rgbScale = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var rgbSequence = 4;
  if(colorArrayEnd-54==0){
    console.log('no color palette! manipulating pixels directly...');
    colorArrayEnd = picData.fileSize;
    rgbSequence = 3;
  }
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArray.length; i=i+rgbSequence){
    colorArray[i] = colorArray[i] * .5;
    colorArray[i+1] = colorArray[i+1] * .5;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testingrgbscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

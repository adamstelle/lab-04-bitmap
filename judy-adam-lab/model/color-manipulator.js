'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);
module.exports = exports = {};

exports.colorInvert = function(buffer, picData, callback) {
  var colorData = exports.manipulate(buffer, picData);
  for (var i=0; i<colorData.colorArrayEnd; i++) {
    colorData.colorArray[i] = 255 - colorData.colorArray[i];
  }
  exports.writeFile('inverted.bmp', buffer);
  if (callback) callback(buffer);
};

exports.greyScale = function (buffer, picData, callback) {
  var colorData = exports.manipulate(buffer, picData);
  for (var i=0; i<colorData.colorArray.length; i=i+colorData.rgbSequence){
    var rgba = colorData.colorArray.slice(i,i+colorData.rgbSequence);
    var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
    rgba[0] = rgba[1] = rgba[2] = avgVal;
  }
  exports.writeFile('greyscaled.bmp', buffer);
  if (callback) callback(buffer, picData);
};

exports.rgbScale = function (buffer, picData, callback) {
  var colorData = exports.manipulate(buffer, picData);
  for (var i=0; i<colorData.colorArray.length; i=i+colorData.rgbSequence){
    colorData.colorArray[i] = colorData.colorArray[i] * .5;
    colorData.colorArray[i+1] = colorData.colorArray[i+1] * .5;
  }
  exports.writeFile('rgbscaled.bmp', buffer);
  if (callback) callback(buffer, picData);
};

exports.writeFile = function(filename, buffer) {
  fs.writeFile(`${__dirname}/../assets/outputs/${filename}`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};


exports.manipulate = function(buffer, picData) {
  this.picData = picData;
  this.colorArrayEnd = picData.offset;
  this.rgbSequence = 4;
  if(this.colorArrayEnd-54==0){
    this.colorArrayEnd = picData.fileSize;
    this.rgbSequence = 3;
  }
  this.colorArray = buffer.slice(54,this.colorArrayEnd);
  return this;
};

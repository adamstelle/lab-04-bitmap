'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);

const runManipulations = module.exports = function(buffer, picData) {
  colorInvert(buffer, picData);
  greyScale(buffer, picData);
  // rgbScale(buffer, picData); 
};

var ColorManipulation = function(buffer, picData) {
  ColorManipulation.colorArrayEnd = picData.offset;
  ColorManipulation.rgbSequence = 4;
  if(ColorManipulation.colorArrayEnd-54==0){
    console.log('no color palette! manipulating pixels directly...');
    ColorManipulation.colorArrayEnd = picData.fileSize;
    ColorManipulation.rgbSequence = 3;
  }
  ColorManipulation.colorArray =buffer.slice(54,ColorManipulation.colorArrayEnd);
  return ColorManipulation;
};

var colorInvert = function(buffer, picData) {
  var colorData = ColorManipulation(buffer, picData);
  for (var i=0; i<colorData.colorArrayEnd; i++) {
    colorData.colorArray[i] = 255 - colorData.colorArray[i];
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testing-invert.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

var greyScale = function (buffer, picData) {
  var colorData = ColorManipulation(buffer, picData);
  for (var i=0; i<colorData.colorArray.length; i=i+colorData.rgbSequence){
    var rgba = colorData.colorArray.slice(i,i+colorData.rgbSequence);
    var avgVal = (rgba[0] + rgba[1] + rgba[2])/ 3;
    rgba[0] = rgba[1] = rgba[2] = avgVal;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testinggreyscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

var rgbScale = function (buffer, picData) {
  var colorData = ColorManipulation(buffer, picData);
  for (var i=0; i<colorData.colorArray.length; i=i+colorData.rgbSequence){
    colorData.colorArray[i] = colorData.colorArray[i] * .5;
    colorData.colorArray[i+1] = colorData.colorArray[i+1] * .5;
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testingrgbscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

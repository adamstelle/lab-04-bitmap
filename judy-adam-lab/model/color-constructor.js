'use strict';

const fs = require('fs');
module.exports = exports = {};

exports = function ColorTransform (buffer, picData){
  ColorTransform.offset = buffer.readUInt32LE(10);
  ColorTransform.colorArrayEnd = picData.offset;
  ColorTransform.colorArray =  buffer.slice(54, this.colorArrayEnd);
};

exports.colorInvert = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i< colorArrayEnd; i++) {
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

exports.slicingColorArray = function(array, number){
  var length = array.length;
  var i = 0;
  var size;
  while (i < length){
    size = Math.ceil((length - i) / number--);
    exports.slicedArray.push(array.slice(i, i += size));
  }
};

function errorHandler(err) {
  console.log(`Aww dude!! ${err}`);
}

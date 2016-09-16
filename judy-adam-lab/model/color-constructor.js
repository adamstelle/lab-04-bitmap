'use strict';

const fs = require('fs');
module.exports = exports = {};

exports.colorInvert = function (buffer, picData) {
  var colorArrayEnd = picData.offset;
  var colorArray = buffer.slice(54,colorArrayEnd);
  for (var i=0; i<colorArrayEnd; i++) {
    colorArray[i] = 255 - colorArray[i];
  }
  fs.writeFile(`${__dirname}/assets/testingInvert.bmp`, buffer, (err) => {
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
  fs.writeFile(`${__dirname}/assets/testingGreyscale.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

function errorHandler(err) {
  console.log(err);
}

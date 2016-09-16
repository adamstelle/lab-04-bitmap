'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);
module.exports = exports = {};

exports.addBorder = function(buffer, picData) {
  var pixelArray = buffer.slice(picData.offset, picData.fileSize);
  var width = buffer.readUInt32LE(18);
  for(var i=0;i<pixelArray.length;i=i+width){
    var rowPixels = pixelArray.slice(i,i+width);
    if(i<(width*4) || i>(pixelArray.length-(width*4))) {
      for(var j=0;j<rowPixels.length;j=j+3) {
        var rgba = rowPixels.slice(j,j+3);
        rgba[0] = rgba[1] = rgba[2] = rgba[3] = 0;
      }
    } else {
      rgba = rowPixels.slice(0,4);
      rgba[0] = rgba[1] = rgba[2] = rgba[3] = 0;
      rgba = rowPixels.slice(rowPixels.length-4,rowPixels.length);
      rgba[0] = rgba[1] = rgba[2] = rgba[3] = 0;
    }
  }
  fs.writeFile(`${__dirname}/../assets/outputs/testingborder.bmp`, buffer, (err) => {
    if(err) throw errorHandler(err);
  });
};

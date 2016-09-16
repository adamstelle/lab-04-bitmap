'use strict';

const fs = require('fs');
const errorHandler = require(`${__dirname}/error-handler.js`);
module.exports = exports = {};
exports.slicedArray = []; //only temporary for now

//TODO: Make this dry by making colorArrayEnd and colorArray global in Color constructor
// exports.Color = function(buffer, picData){
//   this.offset = buffer.readUInt32LE(10);
//   this.colorArrayEnd = picData.offset;
//   this.colorArrayEnd = buffer.slice(54, this.colorArrayEnd);
//   console.log(this);
//   return this;
// };

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

//To do: Consider if we want to use this method for anything. This method slices the buffer into individual 4-part arrays, e.g. [rgba], [rgba], [rgba].....
// exports.slicingColorArray = function(array, number){
//   var length = array.length;
//   var i = 0;
//   var size;
//   while (i < length){
//     size = Math.ceil((length - i) / number--);
//     exports.slicedArray.push(array.slice(i, i += size));
//   }
// };

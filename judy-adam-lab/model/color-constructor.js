'use strict';

const fs = require('fs');

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
  // console.log(exports.slicedArray);

  // var averageVal = (exports.slicedArray[255][0]+exports.slicedArray[255][1]+exports.slicedArray[255][2]+exports.slicedArray[255][3])/4;
  // console.log(exports.slicedArray[255][0]);
  // console.log(exports.slicedArray[255][1]);
  // console.log(exports.slicedArray[255][2]);
  // console.log(exports.slicedArray[255][3]);
  // console.log(averageVal);
  exports.slicedArray.map(function(element, index){
    console.log(element, index); 
    return element;
  });
  //   sum =+ element;
  //   var divisor = index + 1;
  //   var average = sum / divisor;
  // });
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

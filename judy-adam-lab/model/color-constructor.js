'use strict';

module.exports = exports = {};


 exports.colorInvert = function (buffer, bitMapHeader) {
  var colorArrayStart = 54;
  var colorArrayEnd = bitMapHeader.offset;
  var colorArray = [];
  for (var i=colorArrayStart; i < colorArrayEnd; i++) {
    colorArray.push(buffer.readUInt8(i));
  }
  var modifiedColorArray = buffer.slice(54,colorArrayEnd);
  for (var j=3; j<modifiedColorArray.length; j++) {
    modifiedColorArray[j] = 255;
    j++;
    modifiedColorArray[j] = 0;
    j++;
    modifiedColorArray[j] = 0;
    j++;
    modifiedColorArray[j] = 0;
  }
  fs.writeFile(`${__dirname}/testimg.bmp`, buffer, (err) => {
    if(err) throw err;
  });
};

exports.colorInvert = function (buffer, bitMapHeader) {

}

'use strict';

module.exports = function colorExperiment(buffer, bitMapHeader) {
  var colorArrayStart = 54;
  var colorArrayEnd = bitMapHeader.offset;
  var colorArray = buffer.readUInt8(1);
  console.log(buffer);
  console.log(colorArray);
};

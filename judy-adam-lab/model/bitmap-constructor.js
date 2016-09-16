'use strict';

// const buffer = module.exports = new Buffer(file);

module.exports = function Buffer(buffer) {
  var bitMapHeader = {};
  bitMapHeader.titleString = buffer.toString('utf8', 0, 2);
  bitMapHeader.fileSize = buffer.readUInt32LE(2);
  bitMapHeader.offset = buffer.readUInt32LE(10);
  bitMapHeader.pixelArrayLength = bitMapHeader.fileSize - bitMapHeader.offset;
  return bitMapHeader;
};

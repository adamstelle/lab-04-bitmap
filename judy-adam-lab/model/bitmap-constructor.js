'use strict';

const Buffer = module.exports = function(buffer, err){
  Buffer.titleString = buffer.toString('utf8', 0, 2);
  Buffer.fileSize = buffer.readUInt32LE(2);
  Buffer.offset = buffer.readUInt32LE(10);
  Buffer.pixelArrayLength = Buffer.fileSize - Buffer.offset;
  return Buffer;
};

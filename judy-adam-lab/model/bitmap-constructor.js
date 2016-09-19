'use strict';

const errorHandler = require(`${__dirname}/error-handler`);

const Buffer = module.exports = function(buffer, err){
  try {
    buffer.readUInt32LE(2);
  } catch (err) {
    errorHandler(err);
  }
  Buffer.titleString = buffer.toString('utf8', 0, 2);
  Buffer.fileSize = buffer.readUInt32LE(2);
  Buffer.offset = buffer.readUInt32LE(10);
  Buffer.pixelArrayLength = Buffer.fileSize - Buffer.offset;
  return Buffer;
};

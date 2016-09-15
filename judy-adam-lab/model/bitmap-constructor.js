'use strict';

// const buffer = module.exports = new Buffer(file);

module.exports = function Buffer (buffer, titleString, fileSize, crap, offset){
  this.titleString = buffer.toString('utf8', 0, 2);
  console.log(this.titleString);
  this.fileSize = 0;
  this.crap = crap;
  this.offset = offset;
};

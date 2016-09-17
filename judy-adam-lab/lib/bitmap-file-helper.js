'use strict';

const fs = require('fs');
module.exports = exports = {};

exports.readPicData = function(filepath, bitmapConstructor, manipulator){
  fs.readFile(filepath, (err, data) => {
    if (err) exports.errorHandler(err);
    var picData = bitmapConstructor(data);
    manipulator(data,picData);
  });
};

exports.errorHandler = function(err) {
  console.log(`Aww dude! Error: ${err}`);
};

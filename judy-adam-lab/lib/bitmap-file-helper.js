'use strict';

const fs = require('fs');
module.exports = exports = {};

exports.readPicData = function(filepath, callback1, callback2, callback3, callback4){
  fs.readFile(filepath, (err, data) => {
    if (err) exports.errorHandler(err);
    var picData = callback1(data);
    callback2(data,picData);
    callback3(data,picData);
    callback4(data,picData);
  });
};

exports.errorHandler = function(err) {
  console.log(`Aww dude! Error: ${err}`);
};

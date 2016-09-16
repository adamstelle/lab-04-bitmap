'use strict';

const fs = require('fs');
const bitmapConstructor = require('./model/bitmap-constructor');
const colorExperiment = require('./model/color-experiment');
const pics = {
  fingerprint : `${__dirname}/../assets/finger-print.bmp`,
  bitmappic : `${__dirname}/../assets/bitmap.bmp`,
  house : `${__dirname}/../assets/house.bmp`,
  nonpalette : `${__dirname}/../assets/non-palette-bitmap.bmp`
};

function readPicData(filepath, callback1, callback2){
  fs.readFile(`${__dirname}/../assets/finger-print.bmp`, (err, data) => {
    if (err) errorHandler(err);
    var picData = callback1(data);
    callback2(data, picData);
  });
}

readPicData(pics.fingerprint, bitmapConstructor, colorExperiment);

function errorHandler(err) {
  console.log(err);
}

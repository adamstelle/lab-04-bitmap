'use strict';

const fs = require('fs');
const bitmapConstructor = require(`${__dirname}/model/bitmap-constructor`);
const colorExperiment = require(`${__dirname}/model/color-experiment`);
const colors = require(`${__dirname}/model/color-constructor`);
const pics = {
  fingerprint : `${__dirname}/../assets/finger-print.bmp`,
  bitmappic : `${__dirname}/../assets/bitmap.bmp`,
  house : `${__dirname}/../assets/house.bmp`,
  nonpalette : `${__dirname}/../assets/non-palette-bitmap.bmp`
};

function readPicData(filepath, callback1, callback2){
  fs.readFile(filepath, (err, data) => {
    if (err) errorHandler(err);
    var picData = callback1(data);
    callback2(data,picData);
    // callback3(data,picData);
    // callback4(data,picData);
  });
}

function errorHandler (err) {
  console.log(`Aww dude! Error: ${err}`);
}


readPicData(pics.fingerprint, bitmapConstructor, colors.colorInvert);

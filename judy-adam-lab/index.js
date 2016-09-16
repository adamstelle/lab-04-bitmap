'use strict';
const fs = require('fs');
const bitmapConstructor = require(`${__dirname}/model/bitmap-constructor`);
const colorExperiment = require(`${__dirname}/model/color-experiment`);
const colors = require(`${__dirname}/model/color-constructor`);
const pixels = require(`${__dirname}/model/pixel-manipulator`);
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
    callback2(data, picData);
  });
}

readPicData(pics.fingerprint, bitmapConstructor, pixels.addBorder);

function errorHandler(err) {
  console.log(`Aww dude! Error: ${err}`);
}

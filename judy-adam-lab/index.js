'use strict';

const bitmapConstructor = require(`${__dirname}/model/bitmap-constructor`);
const colorExperiment = require(`${__dirname}/model/color-experiment`);
const fileHelper = require(`${__dirname}/lib/bitmap-file-helper`);
const colors = require(`${__dirname}/model/color-manipulator`);
const pixels = require(`${__dirname}/model/pixel-manipulator`);
const pics = {
  'fingerprint' : `${__dirname}/../assets/finger-print.bmp`,
  'bitmappic' : `${__dirname}/../assets/bitmap.bmp`,
  'house' : `${__dirname}/../assets/house.bmp`,
  'nonpalette' : `${__dirname}/../assets/non-palette-bitmap.bmp`,
};
const manipulations = [
  colors.colorInvert,
  colors.greyScale,
  colors.rgbScale,
  pixels.addBorder,
];

var runAll = function() {
  manipulations.forEach(function(i){
    var pic = process.argv[2] || 'fingerprint';
    fileHelper.readPicData(pics[pic] || pics.fingerprint, bitmapConstructor, i);
  });
};

runAll();

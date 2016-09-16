'use strict';

// const fs = require('fs');
const bitmapConstructor = require(`${__dirname}/model/bitmap-constructor`);
// const colorExperiment = require(`${__dirname}/model/color-experiment`);
const fileHelper = require(`${__dirname}/lib/bitmap-file-helper`);
const colors = require(`${__dirname}/model/color-constructor`);
const pics = {
  fingerprint : `${__dirname}/../assets/finger-print.bmp`,
  bitmappic : `${__dirname}/../assets/bitmap.bmp`,
  house : `${__dirname}/../assets/house.bmp`,
  nonpalette : `${__dirname}/../assets/non-palette-bitmap.bmp`
};



fileHelper.readPicData(pics.fingerprint, bitmapConstructor, colors.colorInvert, colors.greyScale, colors.rgbScale);

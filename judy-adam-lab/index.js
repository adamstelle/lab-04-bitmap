'use strict';

const fs = require('fs');
const bitmapConstructor = require('./model/bitmap-constructor');
const colorExperiment = require('./model/color-experiment');

function readPicData(callback1, callback2){
  fs.readFile(`${__dirname}/../assets/finger-print.bmp`, (err, data) => {
    if (err) errorHandler(err);
    var picData = callback1(data);
    callback2(data, picData);
    //pass data to constructor function
  });
}

readPicData(bitmapConstructor, colorExperiment);

function errorHandler(err) {
  console.log(err);
}

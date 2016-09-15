'use strict';

const fs = require('fs');
const bitmapConstructor = require('./model/bitmap-constructor');

function readPicData(callback){
  fs.readFile(`${__dirname}/../assets/bitmap.bmp`, (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(data.toString('utf8', 0, 2));
    // callback(data);
    //pass data to constructor function
  });
}


readPicData(bitmapConstructor);

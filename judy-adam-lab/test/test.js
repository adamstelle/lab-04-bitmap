'use strict';

const expect = require('chai').expect;
const bitmapConstructor = require('../model/bitmap-constructor');
const fs = require('fs');

describe('Bitmap Constructor', function() {
  before('parse the buffer file', function(done){
    fs.readFile(`${__dirname}/../../assets/bitmap.bmp`, (err, data) => {
      this.data = bitmapConstructor(data);
      done();
    });
  });
  it('should return a valid buffer object with metadata', function(){
    console.log(this.data);
    expect(this.data).to.exist;
    expect(this.data.titleString).to.be.a('string');
    expect(this.data.fileSize).to.be.a('number');
  });
  // it('should throw an error if not passed a valid .bmp file', function(done){
  //   fs.readFile('this is not a valid .bmp file', (err, )
  //   expect(bitmapConstructor()).toThrow();
  // });
});

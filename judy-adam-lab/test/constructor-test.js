'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const bitmapConstructor = require('../model/bitmap-constructor');

describe('Bitmap Constructor Module', function() {
  var result;
  before('parse the buffer file', function(done){
    fs.readFile(`${__dirname}/../../assets/bitmap.bmp`, (err, data) => {
      result = bitmapConstructor(data);
      done();
    });
  });
  it('should return a valid buffer object with stored metadata', function(){
    expect(result).to.exist;
    expect(result.titleString).to.be.a('string');
    expect(result.fileSize).to.be.a('number');
  });
  it('should throw an error if not passed a valid .bmp file', function(done){
    expect(function(){
      bitmapConstructor('this is a string but shouldbe a .bmp file!');
    }).to.throw('Aww dudebrah!! We hit an error');
    done();
  });
});

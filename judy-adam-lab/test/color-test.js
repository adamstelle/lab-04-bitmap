'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const colorManipulator = require(`${__dirname}/../model/color-manipulator`);
const bitmapConstructor = require(`${__dirname}/../model/bitmap-constructor`);
const bitmapFileHelper = require(`${__dirname}/../lib/bitmap-file-helper`);

describe('Color Manipulator Module', function() {
  var result = {};
  var newResult;
  beforeEach('get object containing buffer & metadata', function(done) {
    fs.readFile(`${__dirname}/../../assets/non-palette-bitmap.bmp`, (err, data) => {
      result.picData = bitmapConstructor(data);
      result.data = data;
      done();
      debugger;
    });
  });
  describe('manipulate function', function() {
    beforeEach('run manipulate function', function() {
      newResult = colorManipulator.manipulate(result.data,result.picData);
    });
    it('should access the color array within the bitmap', function() {
      expect(newResult.colorArrayEnd).to.exist;
      expect(newResult.colorArrayEnd).to.be.a('number');
      expect(newResult.colorArrayEnd).to.be.above(54);
    });
    it('should recognize bitmaps without a palette and assign the offset to the filesize', function() {
      expect(newResult.colorArrayEnd).to.equal(result.picData.fileSize);
    });
  });
  describe('colorInvert function', function() {
    // beforeEach('run colorInvert function', function() {
    //   var newResult = colorManipulator.colorInvert(result.data,result.picData);
    // });
    it('invert each color on the original buffer file by subtracting it from 255', function() {
      console.log(result);
      var initVal = result.colorArray.readUInt8(55);
      var result = colorManipulator.colorInvert(result.data,result.picData);
      expect(result.colorArray.readUInt8(55)).to.equal(255-initVal);
    });
    it('should write the modified buffer file to a new .bmp file', function() {

    });
  });
  describe('.greyScale function', function(){
    it('should access sets of 4 RGBA values in the buffer', function() {

    });
  });
});

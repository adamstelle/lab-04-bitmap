'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const colorManipulator = require(`${__dirname}/../model/color-manipulator`);
const bitmapConstructor = require(`${__dirname}/../model/bitmap-constructor`);

describe('Color Manipulator Module', function() {
  var result = {};
  var newResult;
  beforeEach('get object containing buffer & metadata', function(done) {
    fs.readFile(`${__dirname}/../../assets/non-palette-bitmap.bmp`, (err, data) => {
      result.picData = bitmapConstructor(data);
      result.data = data;
      done();
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
    var initVal;
    var testResult;
    before('get initial pixel value for testing manipulations', function() {
      initVal = result.data.readUInt8(54);
      colorManipulator.colorInvert(result.data,result.picData, function(data){
        testResult = data;
      });
    });
    it('should invert each color on the original buffer file by subtracting it from 255', function() {
      expect(testResult.readUInt8(54)).to.equal(255-initVal);
    });
  });
  // describe('.greyScale function', function(){
  //   it('should access sets of 4 RGBA values in the buffer', function() {
  //     // TBD
  //   });
  // });
});

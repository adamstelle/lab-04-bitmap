'use strict';

const expect = require('chai').expect;
const bitmapConstructor = require('../model/bitmap-constructor');
const fs = require('fs');

describe('Bitmap Constructor', function() {
  it('should return a valid buffer object with metadata', function(done){
    fs.readFile('/../../../assets/bitmap.bmp', (err, data) => {
      var result = bitmapConstructor(data);
      console.log(result);
      expect(result).to.exist();
      expect(result.titleString).to.be.a('integer');
      expect(result.fileSize).to.be.an('integer');
      done();
    });

  });
  // it('should throw an error if not passed a valid bitmap buffer', function(){
  //   expect(bitmapConstructor()).toThrow();
  // });
});

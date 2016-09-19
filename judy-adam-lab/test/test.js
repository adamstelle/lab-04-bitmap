// 'use strict';
//
// const fileHelper = require(`${__dirname}/../lib/bitmap-file-helper`);
// const colors = require(`${__dirname}/../model/color-constructor`);
// const assert = require('assert');
// const bitmapConstructor = require(`${__dirname}/../model/bitmap-constructor`);
// const EE = require('events');
// const ee = new EE();
//
//
// describe('testing fileHelper module', function(){
//   describe('testing #readPicData', function(){
//     it('should show an error with bad filepath name as first arg', function(){
//       var result = fileHelper.readPicData('${__dirname}/..bad-directory', null,null);
//       //TODO: trying to test if bad directory was put as first arg, uncertain how to structure assert method to make the test pass, i.e., how to make error message strings match each other properly
//       assert.equal(result, 'Aww dude! Error: Error: ENOENT: no such file or directory, open '''${__dirname}/..bad-directory'', 'error msg not thrown'));
//     });
//   });
// });

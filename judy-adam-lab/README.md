Adam and Judy Bitmap Lab

Model Modules
1. bitmap-constructor.js
Functions:
const Buffer(buffer, err);

This module contains our object constructor that holds data contained in the bitmap header. It takes two parameters of buffer and err. This data is stored in each respective property after exports.readPicData() is invoked. exports.readPicData() is defined in lib/bitmap-file-helper.js and invoked in index.js.

2. color-experiment.js
Functions:
module.exports = function colorExperiment(buffer, bitMapHeader)

This module contains our function used to identify the order of the rgba values in their respective 4-byte set. The purpose of this function was for experimentation only and was only invoked for purposes of investigation.

We identified that the color array always started at index 54 and ended at each picture's respective offset. Offsets for bitmaps start at index 10 and return little endian values that can be found using buffer.readUInt32LE(10).

At lines 9-12 of this module, we created an empty array called colorArray, ran a for loop beginning at index 54 to each respective picture's offset in order to push each value into the colorArray.

At lines 13-22, we used the slice method to create a new array called modifiedColorArray that slices out the buffer from index 54 to the bitmap's offset. We used a for loop to go through each value in the 4-piece set in order to set it to 255. (Setting each value to 255 had to be done manually.)

We invoked the fs.writeFile method using the changes done in modifiedColorArray in order to create a new image that would determine what color each value in the 4-piece set corresponded to.

We found that the the 4-piece sets correspond as follows: blue, green, red, alpha.

3. color-manipulator.js
Functions
exports.manipulate = function(buffer, picData)
exports.colorInvert = function(buffer, picData)
exports.greyScale = function (buffer, picData)
exports.rgbScale = function (buffer, picData)

exports.manipulate = function(buffer, picData)
Starting at the bottom at line 43, we have a constructor object called exports.manipulate() that takes parameters of buffer and picData. This constructor stores data on the color array of each bitmap. We have an if statement that accounts for the differences of the nonpalette image as that image does not contain a color array.

The constructor properties are filled after exports.manipulate() is invoked in each of the three color transform functions. It is reassigned to a variable called colorData in each function

exports.colorInvert = function(buffer, picData)
The purpose of this function is to invert the colors by subtracting each color value from 255.

In exports.colorInvert(), we loop through the color array and subtract each value from 255 in order to invert the colors. We invoke fs.writeFile() that that takes in a buffer with the newly modified color array and creates a test image based off the modified color array. It throws an error if an error happens.

Otherwise, if no error, exports.greyScale() is invoked within the exports.colorInvert() function.

exports.greyScale = function (buffer, picData)
The purpose of this function is to set the images to greyscale. This is done by calculating the average for each 4-set value and setting each value to that average. Because 3 of the 4 images have an alpha value set to 0, the average is calculated by division by 3 instead of 4. E.g., if an rbga value is 1,2,3,0, the average is 6/3 = 2 rather than 6/4 = 1.5.

We reassign our constructor object to a variable called colorData for easier naming purposes. We run a for-loop through the color array, where we slice every 4 values in order to modify each color value. We do the average arithmetic on line 22 and assign that value to a variable called avgVal.

On line 23, each of the 4 RGBA values are reassigned to avgVal.

Lines 25-29, we invoke fs.writeFile that takes in a buffer with the newly modified color array to create a new test image that modified the original image to greyscale.

An error is thrown if it exists.

Otherwise, exports.rgbScale() is invoked in this function.

exports.rgbScale = function (buffer, picData)
This function multiplies the first two values of each 4-piece color set by a certain number, which is manually selected as .5 in this case. This changes the color of the image accordingly. Multipliers can only be < 1 in order to avoid the color value exceeding 255, as colors can only in the range of 1-255.

Lines 37-40, we invoke fs.writeFile that takes in a buffer with the newly modified color array to create a new test image that modified the original image accordingly per the above modifications.


Lib Modules
1. bitmap-file-helper.js
Function:
exports.readPicData = function(filepath, bitmapConstructor, manipulator)

This is the main function that is defined and invoked in index.js. It takes parameters of the filepath name, a callback function of bitmapConstructor (which is the constructor object in bitmap-constructor.js), and another callback function of manipulator (which is colors.ColorInvert() from the color-manipulator module.)

At lines 7, fs.readFile is invoked on the given path name. It throws an error if an error exists.

Otherwise, we assign a variable of picData to the first callback function parameter of bitmapConstructor. bitmapConstructor itself takes one parameter called data.

In index.js (our main module), the argument for this parameter is also called  bitmapConstructor, which points to const bitmapConstructor declared at the top of the main module, and that const points back to the constructor object on bitmap-constructor.js. The invocation of bitmapConstructor in the main module populates our data in our bitmapConstructor object, and that object is further referenced as picData when passed through other functions.

At line 10 in bitmap-file-helper.js, the second callback of manipulator(data,picData) is defined. This function takes parameters of data and picData. It is invoked in the main module as the third argument/second callback of colors.colorInvert. The invocation of this function populates our color constructor object in the color-manipulator module. (Reference back to #3 above of Model Modules).





TODO:
- Access the buffer of a bitmap file
  - Break into components
    - Convert header field buffer to string
    - Access, parse & store, file size
    - Access & store offset (location) for pixel array
- Access the color array
- Figure out what RGB byte sequence is
  - (x3) run through each color byte in color array, convert to
  - save modified bitmap locally as 1/2/3/4
  - see which is black, red, green, blue
- Manipulate bitmap in >3 ways:
  - Invert colors
  - Grayscale colors
  - R/G/B scale
- [Optional]

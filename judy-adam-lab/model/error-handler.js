'use strict';

module.exports = function errorHandler(err) {
  throw new Error(`Aww dudebrah!! We hit an error: ${err}`);
};

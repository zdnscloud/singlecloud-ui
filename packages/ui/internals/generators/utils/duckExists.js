/**
 * duckExists
 *
 * Check the given duck exist in ducks directory
 */

const fs = require('fs');
const path = require('path');
const ducks = fs.readdirSync(
  path.join(__dirname, '../../../app/ducks')
);

function duckExists(d) {
  return ducks.indexOf(d) >= 0;
}

module.exports = duckExists;

// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = (ipt) => {
  let hexColor = ipt;
  if (ipt[0] === '#') hexColor = ipt.slice(1);
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(hexColor) || (hexColor.length !== 3 && hexColor.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (hexColor.length === 3) {
    let first = hexColor[0];
    let second = hexColor[1];
    let last = hexColor[2];
    hexColor = first + first + second + second + last + last;
  }
  hexColor = hexColor.toUpperCase(hexColor);
  let first = hexColor[0] + hexColor[1];
  let second = hexColor[2] + hexColor[3];
  let last = hexColor[4] + hexColor[5];
  return `${parseInt(first, 16)}, ${parseInt(second, 16)}, ${parseInt(last, 16)}`;
};

export default hexToRgb;

/**
 * UUID generator
 * Algorithms from rfc4122
 * Version v4
 */

const createUUID = (function (uuidRegEx, uuidReplacer) {
  return function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
  };
})(/[xy]/g, function (c) {
  var r = Math.random() * 16 | 0,
  v = c == "x" ? r : (r & 3 | 8);
  return v.toString(16);
});

export default createUUID;

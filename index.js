/**
 * @file Compressed - a tiny JSON compression lib with great power.
 * @version 1.0.0
 * @author Phoenix Song <github.com/azusa0127>
 * @copyright Phoenix Song (c) 2017
 */
const zlib = require(`zlib`),
  { promisify } = require(`util`);

module.exports = {
  /**
   * Compress an Object|Array|JSON string into compressed base64 string.
   * @param {any} originalJSON a JSON string|Buffer|Array|Object.
   * @param {bool} [bufferMode=false] directly output the buffer without converting to string.
   * @async
   * @returns {Promise<string>} a compressed string in base64 encoding.
   */
  pack(originalJSON, bufferMode = false) {
    if (typeof originalJSON !== `string` && !Buffer.isBuffer(originalJSON))
      originalJSON = JSON.stringify(originalJSON);
    return promisify(zlib.deflate)(originalJSON).then(x => bufferMode ? x : x.toString(`base64`));
  },
  /**
   * Unpack an compressed Buffer back into JSON string
   * @param {string} packedJSON the compressed base64 JSON string.
   * @param {bool} [bufferMode=false] if packedJSON is a buffer from pack() in bufferMode.
   * @async
   * @returns {Promise<string>} a JSON string in utf8 encoding.
   */
  unpack(packedJSON, bufferMode = false) {
    return promisify(zlib.unzip)(
      bufferMode ? packedJSON : Buffer.from(packedJSON, `base64`),
    ).then(x => x.toString(`utf8`));
  },
};

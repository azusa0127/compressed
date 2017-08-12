# compressed
a tiny JSON compression lib with great power.

## Install
```bash
npm install compressed
```

## Compression Ratio
[Demo](/test.js) by compressing a 3.1M json response from Hubspot demo sandbox.
```
[String Length]
Original String Length (3252404)
Packed String Length (190816)

Size Ratio: 0.058 to Orinial. Compressed about 17x in string length!

[File Size]
Original File Size (3252437)
Compressed Packed File Size (143111)

Size Ratio: 0.044 to Orinial. Compressed about 22x in file size!
```

## API
## pack(originalJSON [, bufferMode = false])
Compress an `Object|Array|JSON string` into compressed base64 string.
   * _originalJSON_ {any} a JSON `string|Buffer|Array|Object`.
   * _bufferMode_ {bool} [Optional, default = false] directly output the buffer without converting to string.
   * `@async This is an async funtion and returns a promise.`
   * @returns {Promise<string>} a compressed string in base64 encoding.

## unpack(packedJSON [, bufferMode = false])
Unpack an compressed Buffer back into JSON string
   * _packedJSON_ {string} the compressed base64 JSON string.
   * _bufferMode_ {bool} [Optional, default = false] if packedJSON is a buffer from `pack()` in bufferMode.
   * `@async This is an async funtion and returns a promise.`
   * @returns {Promise<string>} a JSON string in utf8 encoding.
   */

## [Example](/test.js)
```javascript
const comp = require(`compressed`);

// Promise Style
comp.pack('{"a":1, "b":2, "c":"foo"}').then(packed => console.log(packed)); // eJyrVkpUsjLUUVBKUrIyAlLJSlZKafn5SrUASpgGHA==

comp.unpack(`eJyrVkpUsjLUUVBKUrIyAlLJSlZKafn5SrUASpgGHA==`).then(unpacked => console.log(unpacked)); // {"a":1, "b":2, "c":"foo"}

// Async/Await
const packed = await comp.pack('{"a":1, "b":2, "c":"foo"}');
const unpacked = await comp.unpack(packed);
```

## License
Licensed under MIT Copyright (c) 2017 Phoenix Song

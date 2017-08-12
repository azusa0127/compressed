/**
 * @file Compressed - Test script.
 * @author Phoenix Song (github.com/auzsa0127)
 * @copyright Phoenix Song (c) 2017
 */
const http = require(`https`),
  fs = require(`fs`),
  compressed = require(`./index`);

console.log(`\nCompressed - Demo`);
console.log(`Requesting Sample JSON...`);
http
  .request(
    {
      method: `GET`,
      hostname: `api.hubapi.com`,
      port: null,
      path: `/calendar/v1/events/social?startDate=0&endDate=1502231202254&limit=5000&hapikey=demo`,
    },
    res => {
      const chunks = [];

      res.on(`data`, chunk => {
        chunks.push(chunk);
      });

      res.on(`end`, () => {
        console.log(`\n[String Length Test]`);
        const ORIGINAL_JSON_STRING = Buffer.concat(chunks).toString(),
          MINIFIED_STRING = JSON.stringify(JSON.parse(ORIGINAL_JSON_STRING));

        console.log(`Original String Length (${ORIGINAL_JSON_STRING.length})`);
        console.log(`Minified String Length (${MINIFIED_STRING.length})`);
        compressed
          .pack(ORIGINAL_JSON_STRING)
          .then(PACKED_JSON_STRING => {
            console.log(`Packed String Length (${PACKED_JSON_STRING.length})`);
            console.log(
              `\nSize Ratio: ${PACKED_JSON_STRING.length /
                ORIGINAL_JSON_STRING.length} to Orinial, ${PACKED_JSON_STRING.length /
                MINIFIED_STRING.length} to Minified.\n  Compressed about ${Math.floor(
                ORIGINAL_JSON_STRING.length / PACKED_JSON_STRING.length,
              )}x in string length!\n`,
            );

            console.log(`\n[File Size Test]`);
            const FILENAMES = [`test_original.json`, `test_minify.json`, `test_packed.base64`];
            fs.writeFileSync(FILENAMES[0], ORIGINAL_JSON_STRING, `utf8`);
            fs.writeFileSync(FILENAMES[1], MINIFIED_STRING, `utf8`);
            fs.writeFileSync(FILENAMES[2], PACKED_JSON_STRING, `base64`);

            const [ORIGNIAL_FILESIZE, MINIFY_FILESIZE, PACKED_FILESIZE] = FILENAMES.map(
              x => fs.statSync(x).size,
            );
            console.log(`Original File Size (${ORIGNIAL_FILESIZE})`);
            console.log(`Minified File Size (${MINIFY_FILESIZE})`);
            console.log(`Compressed Packed File Size (${PACKED_FILESIZE})`);
            console.log(
              `\nSize Ratio: ${PACKED_FILESIZE / ORIGNIAL_FILESIZE} to Orinial, ${PACKED_FILESIZE /
                MINIFY_FILESIZE} to Minified.\n  Compressed about ${Math.floor(
                ORIGNIAL_FILESIZE / PACKED_FILESIZE,
              )}x in file size!\n`,
            );
            FILENAMES.forEach(x => fs.unlinkSync(x));
            return compressed.unpack(PACKED_JSON_STRING);
          })
          .then(UNPACKED_JSON_STRING => {
            if (ORIGINAL_JSON_STRING === UNPACKED_JSON_STRING)
              console.log(`[Comparison Test -- Success] Unpacked string matches the original.`);
            else console.error(`[Comparison Test -- FAIL] Unpacked string unmatches the original.`);
          });
      });
    },
  )
  .end();

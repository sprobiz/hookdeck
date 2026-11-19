const fs = require("fs");
const zlib = require("zlib");

const width = 1200;
const height = 630;

// Create raw uncompressed scanlines: each row = 1 filter byte (0) + width * 3 bytes (RGB)
const rowSize = 1 + width * 3;
const raw = Buffer.alloc(rowSize * height);

for (let y = 0; y < height; y++) {
  const rowOffset = y * rowSize;
  raw[rowOffset] = 0; // Filter type 0 (None)
  
  // Background gradient: from #070b14 (7, 11, 20) to #161f36 (22, 31, 54)
  const ratio = y / height;
  const r = Math.floor(7 + ratio * 15);
  const g = Math.floor(11 + ratio * 20);
  const b = Math.floor(20 + ratio * 34);

  for (let x = 0; x < width; x++) {
    const pxOffset = rowOffset + 1 + x * 3;
    // Glowing gradient top border (Pink to Indigo: #ec4899 to #6366f1)
    if (y < 8) {
      const topRatio = x / width;
      raw[pxOffset] = Math.floor(236 * (1 - topRatio) + 99 * topRatio);
      raw[pxOffset + 1] = Math.floor(72 * (1 - topRatio) + 102 * topRatio);
      raw[pxOffset + 2] = Math.floor(153 * (1 - topRatio) + 241 * topRatio);
    } else {
      raw[pxOffset] = r;
      raw[pxOffset + 1] = g;
      raw[pxOffset + 2] = b;
    }
  }
}

const compressed = zlib.deflateSync(raw);

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "binary");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: RGB
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const png = Buffer.concat([
  header,
  makeChunk("IHDR", ihdr),
  makeChunk("IDAT", compressed),
  makeChunk("IEND", Buffer.alloc(0))
]);

fs.writeFileSync("public/og-image.png", png);
console.log("Successfully created public/og-image.png (" + png.length + " bytes)");

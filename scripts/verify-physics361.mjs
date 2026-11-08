import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
const path = 'public/pdfs/physics-361.pdf';
const expected = '585b75c74409f340cfe56335696931f58b8c63cfb3babd5d1b0b0f7690012b1e';
const hash = createHash('sha256');
try {
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  if (hash.digest('hex') !== expected) throw new Error('SHA-256 mismatch');
  console.log('Physics 361 PDF verified');
} catch (error) {
  console.error(`Cannot verify ${path}: ${error.message}. See README for the release asset.`);
  process.exitCode = 1;
}

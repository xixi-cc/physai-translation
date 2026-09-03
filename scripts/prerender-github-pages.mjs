import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const prerenderDirectory = resolve('github-pages-prerender');
const entryUrl = pathToFileURL(resolve(prerenderDirectory, 'entry-server.js')).href;
const { render } = await import(entryUrl);
const markup = render();
const outputPath = resolve('github-pages-dist/index.html');
const html = await readFile(outputPath, 'utf8');

if (!html.includes('<div id="root"></div>')) {
  throw new Error('Missing root placeholder in the GitHub Pages output.');
}

await writeFile(outputPath, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`), 'utf8');
await rm(prerenderDirectory, { recursive: true, force: true });
console.log('Prerendered the PhysAI Translation landing page into index.html.');

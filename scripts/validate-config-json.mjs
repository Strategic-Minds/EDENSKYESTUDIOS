import { readdir, readFile } from 'node:fs/promises';

const files = (await readdir('config')).filter((file) => file.endsWith('.json'));
for (const file of files) {
  JSON.parse(await readFile(`config/${file}`, 'utf8'));
  console.log('PASS config/' + file);
}

console.log('PASS config json');

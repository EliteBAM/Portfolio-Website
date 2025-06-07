//run as prebuild so that api function only includes manifest that directs to CDN cache, instead of bundling all static data

import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const base = path.join(process.cwd(), 'public', 'projects');
  const folders = await fs.readdir(base);
  const projects = await Promise.all(
    folders.map(async folder => {
      const dir = path.join(base, folder);
      const files = await fs.readdir(dir);

      return {
        title: folder,
        staticImage: `/projects/${folder}/${files.find(f => f.endsWith('.png'))}`,
        gifImage:    `/projects/${folder}/${files.find(f => f.endsWith('.gif'))}`,
        description: await fs.readFile(path.join(dir, 'description.txt'), 'utf8'),
        tags: (await fs.readFile(path.join(dir, 'tags.txt'), 'utf8'))
                .split(',').map(t => t.trim()),
      };
    })
  );

  const outDir = path.join(process.cwd(), 'public', 'data');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, 'projects.json'),
    JSON.stringify(projects, null, 2),
    'utf8'
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

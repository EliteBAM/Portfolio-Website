//run as prebuild so that api function only includes manifest that directs to CDN cache, instead of bundling all static data

import { promises as fs } from 'fs';
import path from 'path';

async function main() {

  console.log("running main");

  const base = path.join(process.cwd(), 'site', 'projects');
  const folders = await fs.readdir(base);

  //generate array of project thumbnail object data
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

  console.log("projects generated");

  //generate array of key value pairs of project titles and their detail contents 
  const projectDetails = await Promise.all(
    folders.map(async folder => {
      const dir = path.join(base, folder, 'project-details');

      let sections = [];

      let projectDetailsEntry = {
        key: folder,
        value: sections
      };
    
      try {
      
          await fs.access(dir); // throws if not found
      
          //Extracting order of template IDs, as they correlate to order of project-details content sub-folders
          const templateOrderFilePath = path.join(dir, 'templates.txt');
          const templateIDs = await fs.readFile(templateOrderFilePath, 'utf-8');
          const templateIDList = templateIDs.split(',').map(templateID => templateID.trim()); //array of template ID order
      
  
          // Only get folders (ignore templates.txt and other files)
          const ProjectDetailsEntries = await fs.readdir(dir, { withFileTypes: true });
          const projectDetailsFolders = ProjectDetailsEntries
              .filter(entry => entry.isDirectory())
              .map(entry => entry.name);
      
          for (const [index, folder] of projectDetailsFolders.entries()) {
  
              //read template content folder
              const folderPath = path.join(dir, folder);
              const files = await fs.readdir(folderPath);
      
              //get content out of folder
  
                  //find all images and gifs to add to data
              const images = files
                  .filter(file => ['.png', '.jpg', '.jpeg', '.gif'].some(ext => file.endsWith(ext)))
                  .map(file => `/projects/${projectDetailsEntry.key}/project-details/${folder}/${file}`);
  
                  //find all texts to add to data
              const textFiles = files.filter(file => file.endsWith('.txt'));
              const texts = [];
              for (const file of textFiles) {
                  const filePath = path.join(folderPath, file);
                  const content = await fs.readFile(filePath, 'utf-8');
                  texts.push(content);
              }
      
              //add all to data
              // Add all data under a named object
              const data = {
                  images,
                  texts
              };

              sections.push({
                templateID: templateIDList[index],
                data
              })

          }     

      } catch (err) {
          console.error('Error reading project details:', err);

          //projectDetailsEntry.value = null;
      }


      return projectDetailsEntry;

    })
  );

  const outDir = path.join(process.cwd(), 'site', 'data');

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(
    path.join(outDir, 'projects.json'),
    JSON.stringify(projects, null, 2),
    'utf8'
  );
  await fs.writeFile(
    path.join(outDir, 'project-details.json'),
    JSON.stringify(projectDetails, null, 2),
    'utf8'
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

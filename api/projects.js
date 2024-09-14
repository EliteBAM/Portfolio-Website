import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const projectsDir = path.join(process.cwd(), 'projects');
    const projectFolders = await fs.readdir(projectsDir);

    const projects = [];

    for (const folder of projectFolders) {
        const folderPath = path.join(projectsDir, folder);
        const files = await fs.readdir(folderPath);
        const image = files.find(file => file.endsWith('.png'));
        const gif = files.find(file => file.endsWith('.gif'));
        const descriptionPath = path.join(folderPath, 'description.txt');
        const description = await fs.readFile(descriptionPath, 'utf-8');
        const tagsPath = path.join(folderPath, 'tags.txt');
        const tags = await fs.readFile(tagsPath, 'utf-8');
        // Split tags by ',' and trim extra spaces
        const tagList = tags.split(',').map(tag => tag.trim());


        projects.push({
            title: folder, // Folder name as project title
            staticImage: `/projects/${folder}/${image}`,
            gifImage: `/projects/${folder}/${gif}`,
            description: description,
            tags: tagList
        });
    }

    res.status(200).json(projects);
}

import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const projectsDir = path.join(process.cwd(), 'Projects');
    const projectFolders = await fs.readdir(projectsDir);

    const projects = [];

    for (const folder of projectFolders) {
        const folderPath = path.join(projectsDir, folder);
        const files = await fs.readdir(folderPath);
        const image = files.find(file => file.endsWith('.png'));
        const gif = files.find(file => file.endsWith('.gif'));
        const descriptionPath = path.join(folderPath, 'description.txt');
        const description = await fs.readFile(descriptionPath, 'utf-8');

        projects.push({
            title: folder, // Folder name as project title
            staticImage: `/Projects/${folder}/${image}`,
            gifImage: `/Projects/${folder}/${gif}`,
            description: description
        });
    }

    res.status(200).json(projects);
}

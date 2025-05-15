import { isUtf8 } from 'buffer';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {

    //init empty array for response
    const projectData = [];

    //get directory to project data (project details folder)
    const title = req.query.title;
    const projectDetailsDir = path.join(process.cwd(), 'projects/' + title + "/project-details/");

    try {

        await fs.access(projectDetailsDir); // throws if not found

        //Extracting order of template IDs, as they correlate to order of project-details content sub-folders
        const templateOrderFilePath = path.join(projectDetailsDir, 'templates.txt');
        const templateIDs = await fs.readFile(templateOrderFilePath, 'utf-8');
        const templateIDList = templateIDs.split(',').map(templateID => templateID.trim()); //array of template ID order


        // Only get folders (ignore templates.txt and other files)
        const ProjectDetailsEntries = await fs.readdir(projectDetailsDir, { withFileTypes: true });
        const projectDetailsFolders = ProjectDetailsEntries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name);

        for (const [index, folder] of projectDetailsFolders.entries()) {

            //read template content folder
            const folderPath = path.join(projectDetailsDir, folder);
            const files = await fs.readdir(folderPath);

            //get content out of folder

                //find all images and gifs to add to data
            const images = files
                .filter(file => ['.png', '.jpg', '.jpeg', '.gif'].some(ext => file.endsWith(ext)))
                .map(file => `/projects/${title}/project-details/${folder}/${file}`);

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

            //send collected data to response json object element
            projectData.push({
                templateID: templateIDList[index], // Folder name as project title
                data
            });
        }

        res.status(200).json(projectData);

    } catch (err) {
        console.error('Error reading project details:', err);
        res.status(404).json({ error: 'Project not found or invalid structure' });
    }   
}

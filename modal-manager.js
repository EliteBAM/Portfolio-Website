let projectModalMap = new Map(); //global dictionary mapping a project to its modal details page
//KEY: Project Title, VALUE: Downloaded modal page

function addProjectEntry (project) {
    projectModalMap.set(project, null);
}
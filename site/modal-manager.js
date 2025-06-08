let projectMap = new Map(); //global dictionary mapping a project to its modal details page
//KEY: Project Title, VALUE: Downloaded modal page

createProjectMapFromJSON();

function createProjectMapFromJSON() {
    fetch(`/data/project-details.json`)
        .then(response => response.json())
        .then(details => {
            projectMap = new Map(details.map(({ key, value }) => [key, value]));
        })
        .catch(error => console.error('Error getting project details from JSON:', error));
}

function addProjectEntry (project) {
    projectMap.set(project, null);
}


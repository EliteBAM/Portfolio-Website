let projectMap = new Map(); //global dictionary mapping a project to its modal details page
//KEY: Project Title, VALUE: Downloaded modal page

let cacheMap = new Map();

createProjectMapFromJSON();

function createProjectMapFromJSON() {
    fetch(`/data/project-details.json`)
        .then(response => response.json())
        .then(details => {
            console.log("project details json: ", details);
            projectMap = new Map(details.map(({ key, value }) => [key, value]));
            console.log("project Map created: ", projectMap);
        })
        .catch(error => console.error('Error getting project details from JSON:', error));
}

function AssignMediaSrc(element, url) {
    if(cacheMap.has(url) && cacheMap.get(url) != null && cacheMap.get(url) != undefined) {
        element.src = "";
        element.onerror = () => {
            console.warn(url + ": error loading from cache. Using " + url + " instead.");
            element.src = url;
        };
        element.src = cacheMap.get(url);
        console.log(url + " loaded from cache!");
    } else {
        element.src = url;
        CacheMedia(url);
    }
}

async function CacheMedia(url) {
    if(cacheMap.has(url)) return;

    cacheMap.set(url, null);

    try {
        const blob = await fetch(url).then(r => r.blob());
        const blobUrl = URL.createObjectURL(blob);
        cacheMap.set(url, blobUrl);
        console.log(url + " successfully cached!");
    } catch (err) {
        console.warn(`Failed to cache media for ${url}`, err);
        cacheMap.delete(url); // clean up failed entry
    }
}


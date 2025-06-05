const modal = document.getElementById("project-modal");
//const modalTitle = document.getElementById("project-title");
//const modalSummary = document.getElementById("project-summary");
//const modalCode = document.getElementById("project-code");
const closeModal = document.querySelector(".close");
const modalContent = document.getElementById("modal-content");


window.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');

    let allProjects = []; // Store all projects fetched from the server

    // Function to create and display projects
    const displayProjects = (filteredProjects) => {

        projectGrid.innerHTML = ''; // Clear the grid

        filteredProjects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            const projectImageDiv = document.createElement('div');
            projectImageDiv.classList.add('project-image');

            const staticImage = document.createElement('img');
            staticImage.src = project.staticImage;
            staticImage.alt = project.title;
            staticImage.classList.add('static-image');

            const gifImage = document.createElement('img');
            gifImage.src = project.gifImage;
            gifImage.alt = project.title + " GIF";
            gifImage.classList.add('gif-image');

            projectImageDiv.appendChild(staticImage);
            projectImageDiv.appendChild(gifImage);

            const projectInfoDiv = document.createElement('div');
            projectInfoDiv.classList.add('project-info');

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            projectInfoDiv.appendChild(title);
            projectInfoDiv.appendChild(description);

            projectElement.appendChild(projectImageDiv);
            projectElement.appendChild(projectInfoDiv);

            projectGrid.appendChild(projectElement);

            //LAST STEP OF CREATION -- ADD PROJECT TO MODAL MANAGER PROJECT MAP
            addProjectEntry(project.title);

            projectElement.addEventListener('click', () => {    
                // load template layout + data on-click from the serverless function OR cache
                console.log("Loading project:", project.title);

                //CHECK IF MODAL HAS ALREADY BEEN STORED FROM THE SERVER
                const cachedProjectData = projectModalMap.get(project.title);

                if(cachedProjectData === null) { //downlaod data if never before retrieved, and SAVE it
                    fetch(`/api/project-details?title=${encodeURIComponent(project.title)}`)
                        .then(response => response.json())
                        .then(projectData => {
                            projectModalMap.set(project.title, projectData); //STORE the data for next time!!
                            generateModalContent(projectData); // send project data directly to DOM construction function
                        })
                        .catch(error => console.error('Error project details:', error));
                }else {
                    generateModalContent(project.title, cachedProjectData); //generate modal layout from stored data in project map!
                    console.log("project data loaded from local cache. Server not pinged")
                }

                modal.style.display = "flex"; // Show the modal
                setTimeout(() => {
                    modal.style.opacity = 1;
                    modalContent.style.transform = "scale(1)";
                }, 50); // Small delay to ensure smooth transition
            });

            // animation after delay for each element
            setTimeout(() => {
                projectElement.classList.add('show');
            }, index * 100); // Staggered animation effect
        });
    };

    // Function to filter projects by tag
    const filterProjects = (tag) => {
        const filteredProjects = allProjects.filter(project => project.tags.includes(tag));
        displayProjects(filteredProjects);
    };

    // Fetch all projects from the serverless function
    fetch('/api/projects')
        .then(response => response.json())
        .then(projects => {
            allProjects = projects; // Store the fetched projects
            displayProjects(allProjects); // Display all projects initially
        })
        .catch(error => console.error('Error fetching projects:', error));

    // Event listeners for buttons
    document.getElementById('nav-games').addEventListener('click', () => filterProjects('Games'));
    document.getElementById('nav-art').addEventListener('click', () => filterProjects('Art'));
    document.getElementById('nav-software').addEventListener('click', () => filterProjects('Software'));
});

// Close modal when the 'X' is clicked
closeModal.addEventListener('click', () => {
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after animation completes
        modalContent.style.transform = "scale(0.8)";
    }, 200); // Match this with the transition duration
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = "none";
            modalContent.style.transform = "scale(0.8)";
        }, 200);
    }
});
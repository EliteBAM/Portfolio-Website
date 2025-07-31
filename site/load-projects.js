const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close");
const modalContent = document.getElementById("modal-content");
const body = document.getElementsByClassName("body");

let allProjects = []; // Store all projects fetched from the server

window.addEventListener('DOMContentLoaded', () => {

    const projectGrid = document.querySelector('.project-grid');

    // Function to create and display projects
    const displayProjects = (filteredProjects) => {

        projectGrid.innerHTML = ''; // Clear the grid

        filteredProjects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            const projectImageDiv = document.createElement('div');
            projectImageDiv.classList.add('project-image');

            const staticImage = document.createElement('img');
            AssignMediaSrc(staticImage, project.staticImage);
            staticImage.alt = project.title;
            staticImage.classList.add('static-image');

            const gifImage = document.createElement('img');
            AssignMediaSrc(gifImage, project.gifImage);
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
            
            requestAnimationFrame(() => {
                autoFitText(description, '1rem', '0.3rem');
            });

            projectElement.appendChild(projectImageDiv);
            projectElement.appendChild(projectInfoDiv);

            projectGrid.appendChild(projectElement);

            projectElement.addEventListener('click', () => {    
                // load template layout + data on-click from the serverless function OR cache
                console.log("Loading project:", project.title);

                //CHECK IF MODAL HAS ALREADY BEEN STORED FROM THE SERVER
                const cachedProjectData = projectMap.get(project.title);

                console.log("does projectMap have ", project.title, "? --> ", projectMap.has(project.title));

                generateModalContent(project.title, cachedProjectData); //generate modal layout from stored data in project map!
                console.log("project data loaded from JSON");

                modal.style.display = "flex"; // Show the modal
                modalContent.scrollTo(0, 0);
                document.body.style.overflowY = "hidden";
                document.style.overflowY = "hidden";
                setTimeout(() => {
                    modal.style.opacity = 1;
                    modalContent.style.transform = "scale(1)";
                }, 50); // Small delay to ensure smooth transition
            });

            const file_name = project.staticImage.split('/').pop();
            console.log(file_name)
            //if thumnail file name starts with 0, remove smooth transition from gif for frame-perfect match
            if(file_name[0] == '0') {
                console.log(project.title, "'s thumbnail is the first frame of the gif. Disabling gif fade-in");
                gifImage.classList.add('thumb-is-frame');
            }

            //reset gif to first frame each mouse enter
            projectElement.addEventListener('mouseenter', function () {
                gifImage.src = '';
                gifImage.src = project.gifImage;
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

    // Fetch all projects from the JSON manifest
    fetch('/data/projects.json')
        .then(response => response.json())
        .then(projects => {
            allProjects = projects; // Store the fetched projects
            displayProjects(allProjects); // Display all projects initially
        })
        .catch(error => console.error('Error fetching projects. No JSON directory? Accidental server call? :', error));

    // Event listeners for buttons
    document.getElementById('nav-games').addEventListener('click', () => filterProjects('Games'));
    document.getElementById('nav-art').addEventListener('click', () => filterProjects('Art'));
    document.getElementById('nav-software').addEventListener('click', () => filterProjects('Software'));
});


//Close the modal page functionality

function CloseModal() {
    modal.style.opacity = 0;
    document.body.style.overflowY = "auto";
    setTimeout(() => {
        modal.style.display = "none"; // Hide the modal after animation completes
        modalContent.style.transform = "scale(0.8)";
    }, 200); // Match this with the transition duration
}

// Close modal when the 'X' is clicked
closeModal.addEventListener('click', CloseModal);

// Close modal when clicking outside of the modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        CloseModal();
    }
});
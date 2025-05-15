const modal = document.getElementById("project-modal");
//const modalTitle = document.getElementById("project-title");
//const modalSummary = document.getElementById("project-summary");
//const modalCode = document.getElementById("project-code");
const closeModal = document.querySelector(".close");
const modalContent = document.getElementById("modal-content");

const projects = [
    {
        title: "Fighting Game Framework",
        description: "Tools and APIs that convert Unity into the ultimate fighting game engine.",
        staticImage: "fighting_game.png",
        gifImage: "https://placehold.co/400x300/gif/"
    },
    {
        title: "Procedural Terrain",
        description: "Procedurally generated open-world adventure.",
        staticImage: "unity_craft.png",
        gifImage: "https://placehold.co/400x300/gif/"
    },
    {
        title: "Boaty",
        description: "Physics-based sailing game.",
        staticImage: "https://placehold.co/400x300/",
        gifImage: "https://placehold.co/400x300/gif/"
    },
    {
        title: "EMPATH",
        description: "Short description of Project 1. Tools used: C++, OpenGL, Unity.",
        staticImage: "empath.png",
        gifImage: "https://placehold.co/400x300/gif/"
    },
    {
        title: "The Witch List",
        description: "Short description of Project 1. Tools used: C++, OpenGL, Unity.",
        staticImage: "witch_list.png",
        gifImage: "https://placehold.co/400x300/gif/"
    }
    // Add more projects as needed
];


window.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');

    projects.forEach(project => {
                // Create project element
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

                projectElement.style.opacity = 1;

                projectGrid.appendChild(projectElement);

                projectElement.addEventListener('click', () => {

                    const projectData = [];
                    generateModalContent(projectData); // send project data directly to DOM construction function (no need to store)
                    // You can dynamically set the modal content based on the clicked project        
                    //modalTitle.innerText = project.title;
                    //modalSummary.innerText = project.description;
                    //modalCode.innerText = `// Example code for ${project.title}\nconsole.log("${project.title} clicked!");`;
                        // Fetch all projects from the serverless function
        
                    modal.style.display = "flex"; // Show the modal
                    setTimeout(() => {
                        modal.style.opacity = 1;
                        modalContent.style.transform = "scale(1)";
                    }, 50); // Small delay to ensure smooth transition
                });
            });
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
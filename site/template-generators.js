function createTitle(title) {
    const container = document.createElement('div');
    container.className = 'modal-title';

    container.textContent = title;

    return container;
}

function createSingleMediaTemplate(data) {

    const container = document.createElement('div');
    container.className = 'single-media';

    const img = document.createElement('img');
    img.src = data.images?.[0] || ''; //take first image if there are more than 1
    img.alt = 'Single Image';

    container.appendChild(img);
    return container;
}

function createVideoTemplate(data) {

    const container = document.createElement('div');
    container.className = 'single-media';

    const video = document.createElement('video');
    video.controls = true;
    video.poster = data.images?.[0] || undefined;
    const source = document.createElement('source');
    source.src = data.videos?.[0] || ''; //take first image if there are more than 1
    source.type = source.src ? "video/mp4" : undefined; //if there is a video source, set the source type.
    video.alt = 'mp4 media';


    video.appendChild(source);
    container.appendChild(video);

    return container;
}

function createHorizontalGalleryTemplate(data) {

    const galleryImages = data.images;
    let imageIndex = 0;

    const container = document.createElement('div');
    container.className = 'template horizontal-gallery';

    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-container';

    const leftBtn = document.createElement('button');
    leftBtn.className = 'gallery-nav left';
    leftBtn.innerText = '<';

    const rightBtn = document.createElement('button');
    rightBtn.className = 'gallery-nav right';
    rightBtn.innerText = '>';

    const galleryItems = document.createElement('div');
    galleryItems.className = 'gallery-items';

    const mainImage = document.createElement('img');
    mainImage.className = 'main-image';
    mainImage.src = galleryImages?.[0] || '';
    galleryItems.appendChild(mainImage);

    const thumbnails = document.createElement('div');
    thumbnails.className = 'gallery-thumbnails';
    thumbnails.id = 'gallery-thumbnails';

    galleryImages.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.className = 'thumbnail';
        thumb.index = index;
        thumb.addEventListener('click', () => {
            mainImage.src = galleryImages[thumb.index];
            imageIndex = thumb.index;
        });
        thumbnails.appendChild(thumb);
    });

    //add event listeners to buttons
    rightBtn.addEventListener('click', () => {
        imageIndex = imageIndex + 1 > galleryImages.length - 1 ? 0 : imageIndex + 1; //cycle if out of bounds
        mainImage.src = galleryImages[imageIndex];
    });
    leftBtn.addEventListener('click', () => {
        imageIndex = imageIndex - 1 < 0 ? galleryImages.length - 1 : imageIndex - 1; //cycle if out of bounds
        mainImage.src = galleryImages[imageIndex];
    });

    galleryItems.appendChild(thumbnails);
    galleryContainer.appendChild(leftBtn);
    galleryContainer.appendChild(galleryItems);
    galleryContainer.appendChild(rightBtn);
    container.appendChild(galleryContainer);

    return container;
}

function createDynamicGalleryTemplate(data) {

    const container = document.createElement('div');
    container.className = 'template dynamic-gallery';

    const grid = document.createElement('div');
    grid.className = 'dynamic-gallery-grid';

    data.images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Dynamic Image ${index + 1}`;
        grid.appendChild(img);
    });

    container.appendChild(grid);
    return container;
}

function createCodeExampleTemplate(data) {

    const container = document.createElement('div');
    container.className = 'template code-example';

    const p1 = document.createElement('p');
    p1.textContent = data.texts[1];

    const pre = document.createElement('pre');

    const code = document.createElement('code');
    code.className = data.texts[0];
    code.textContent = data.texts[2];

    const p2 = document.createElement('p');
    p2.textContent = data.texts[3];

    container.appendChild(p1);
    container.appendChild(pre);
    container.appendChild(p2);

    pre.appendChild(code);

    Prism.highlightElement(code);

    return container;
}

function createDescriptionTemplate(data) {

    const container = document.createElement('div');
    container.className = 'template-description';

    container.textContent = String(data.texts[0]).replace("\n", "\n");

    return container;
}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const modcont = document.getElementById('modal-content');
        if (modcont) {
            modcont.appendChild(createSingleMediaTemplate("https://placehold.co/400x300/"));
        } 
        else {
            console.warn('modal-content not found.');
        }
    }, 50);
});

function generateModalContent(title, projectData) {

    //clear all previous modal content except the close button
    [...modalContent.children].forEach(child => {
        if (!child.classList.contains('close')) {
            modalContent.removeChild(child);
        }
    });
    
    if (!Array.isArray(projectData) || projectData.length === 0) {
        const fallback = document.createElement('div');
        fallback.className = 'template fallback';
        fallback.textContent = 'No details available.';
        modalContent.appendChild(fallback);
        return; //cut off the function
    }

    //generate title section
    modalContent.appendChild(createTitle(title));

    //generate new modal content
    projectData.forEach(templateData => {

        switch (templateData.templateID) {
            case '1':
                modalContent.appendChild(createSingleMediaTemplate(templateData.data));
                break;
            case '2':
                modalContent.appendChild(createDynamicGalleryTemplate(templateData.data));
                break;
            case '3':
                modalContent.appendChild(createHorizontalGalleryTemplate(templateData.data));
                break;
            case '4':
                modalContent.appendChild(createCodeExampleTemplate(templateData.data));
                break;
            case '5':
                modalContent.appendChild(createDescriptionTemplate(templateData.data));
                break;
            case '6':
                modalContent.appendChild(createVideoTemplate(templateData.data));
                break;
            default:
                console.error('Unknown template ID:', templateData.templateID);
        }

    });

    projectData = [];

}
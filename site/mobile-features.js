//mobile only
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches && window.innerWidth <= 1440;


if(isTouchDevice) {
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.project').forEach(projectElement => {
            const rect = projectElement.getBoundingClientRect();
            const activeWindow = {
                top: rect.top + rect.height / 8,
                bottom: rect.bottom - rect.height / 8,
            };
            const centerY = (window.innerHeight / 3) * 2;
            const isActive = activeWindow.top < centerY && activeWindow.bottom > centerY;

            projectElement.classList.toggle('active', isActive);

            if(isActive) {
                projectElement.gifImage.src = '';
                projectElement.gifImage.src = project.gifImage;
            }
        });
    });
}
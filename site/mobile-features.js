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

            if(isActive && !projectElement.classList.contains('active')) {
                const gifImage = projectElement.querySelector('.gif-image');
                const gif = gifImage.src;
                gifImage.src = '';
                gifImage.src = gif;
            }

            projectElement.classList.toggle('active', isActive);
            
        });
    });
}
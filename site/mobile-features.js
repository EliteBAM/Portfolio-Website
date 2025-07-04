//mobile only
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;


if(isTouchDevice) {
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.project').forEach(projectElement => {
            const rect = projectElement.getBoundingClientRect();
            const centerY = (window.innerHeight / 3) * 2;
            const isActive = rect.top < centerY && rect.bottom > centerY;

            projectElement.classList.toggle('active', isActive);
        });
    });
}
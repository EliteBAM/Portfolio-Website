const animatedBorder = document.querySelector('.animated-border');
const introSection = document.querySelector('.intro');

let isMouseInArea = false;

const getIntroSectionHeight = () => {
    const computedStyle = window.getComputedStyle(introSection);
    const paddingTop = parseInt(computedStyle.paddingTop);
    const paddingBottom = parseInt(computedStyle.paddingBottom);
    const margins = 110;
    return introSection.scrollHeight + paddingTop + paddingBottom + margins + 'px';
};

const showIntroSection = () => {

     // Make sure the initial styles are applied before transitioning
    introSection.style.maxHeight = '0px';
    introSection.style.opacity = '0';
    introSection.style.paddingBottom = '0';


    // Force reflow to ensure the initial state is applied
    introSection.offsetHeight; // Trigger a reflow, flushing the CSS changes

    setTimeout(() => {
        introSection.style.opacity = '1'; // Fade in
        introSection.style.paddingBottom = '15px';
        introSection.style.maxHeight = getIntroSectionHeight(); // Expand the height (set a reasonable max height)
    }, 10);
};

const hideIntroSection = () => {
    setTimeout(() => {
        introSection.style.maxHeight = '0px'; // Expand the height (set a reasonable max height)
        introSection.style.paddingBottom = '0px';
        introSection.style.opacity = '0'; // Fade out
    }, 20);
};

animatedBorder.addEventListener('mouseenter', () => {
    isMouseInArea = true;
    showIntroSection();
});
animatedBorder.addEventListener('mouseleave', () => {
    isMouseInArea = false;
    setTimeout(() => {
        if(!isMouseInArea)
            hideIntroSection();
    }, 100);
});
introSection.addEventListener('mouseenter', () => {
    isMouseInArea = true;
    showIntroSection();
});
introSection.addEventListener('mouseleave', () => {
    isMouseInArea = false;

    setTimeout(() => {
        if(!isMouseInArea)
            hideIntroSection();
    }, 100);
});

window.addEventListener('load', () => {

    introSection.style.maxHeight = '0px';
    introSection.style.opacity = '0';
    introSection.style.paddingBottom = '0px';

    introSection.offsetHeight; // Trigger initial reflow

});

//force load site at top scroll position
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const headerElement = document.querySelector('.header');


window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Perform actions based on scroll position
    if (scrollPosition > 0) {
        headerElement.style.boxShadow ='0px 4px 20px rgba(0, 0, 0, 0.5)';
    }
    else {
        headerElement.style.boxShadow = 'none';
    }
});
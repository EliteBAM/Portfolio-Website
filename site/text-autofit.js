function parseUnit(value) {
  if (typeof value === 'string' && value.endsWith('rem')) {
    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(value) * rootSize;
  } else if (typeof value === 'string' && value.endsWith('px')) {
    return parseFloat(value);
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error('Unsupported font size format');
  }
}

function autoFitText(element, max = '1rem', min = '0.5rem') {
  const parent = element.parentElement;
  let maxFont = parseUnit(max);
  const minFont = parseUnit(min);

  element.style.fontSize = maxFont + 'px';

    const getTotalChildrenHeight = () => {
        return Array.from(parent.children).reduce((sum, child) => {
            const style = getComputedStyle(child);
            const marginTop = parseFloat(style.marginTop) || 0;
            const marginBottom = parseFloat(style.marginBottom) || 0;
            return sum + child.offsetHeight + marginTop + marginBottom;
        }, 0);
    };


  while (getTotalChildrenHeight() > parent.clientHeight && maxFont > minFont) {
    maxFont -= 0.5;
    element.style.fontSize = maxFont + 'px';
  }
}

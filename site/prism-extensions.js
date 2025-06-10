Prism.languages.csharp['class-name-custom'] = {
    pattern: /\b[A-Z][a-zA-Z0-9_]*\b(?=\s*\.)/,
    alias: 'class-name'
  };

  // Add it to the grammar (prepend to prioritize)
  Prism.languages.insertBefore('csharp', 'function', {
    'class-name-custom': Prism.languages.csharp['class-name-custom']
  });
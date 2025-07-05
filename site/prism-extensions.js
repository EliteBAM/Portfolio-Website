Prism.languages.csharp['class-name-custom'] = {
  pattern: /\b[A-Z][a-zA-Z0-9_]*\b(?=\s*\.)/,
  alias: 'class-name'
};

Prism.languages.insertBefore('csharp', 'function', {
  'class-name-custom': Prism.languages.csharp['class-name-custom']
});
/** Inline script run before paint to prevent theme flash. */
export const themeInitScript = `
(function() {
  var key = 'theme';
  var stored = localStorage.getItem(key);
  var isDark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
})();
`;

// Include all JavaScript files in the components directory
//= require_tree ./components

document.addEventListener('turbo:load', () => {
  // Initialize custom elements
  customElements.define('go-board', GoBoard);
  // ... initialize other custom elements
});
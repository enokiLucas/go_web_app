// Include all JavaScript files in the components directory
//= require_tree ./components
//= require_tree ./utils
//= require_tree ./services

document.addEventListener('turbo:load', () => {
  // Initialize custom elements
  customElements.define('go-board', GoBoard);
  // ... initialize other custom elements
});

//Test the constants
console.log(window.CONSTANTS.OFFSET);  // Outputs: value1

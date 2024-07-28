// Include all JavaScript files in the components directory
//= require_tree ./components

document.addEventListener('turbo:load', () => {
  // Initialize custom elements
  customElements.define('go-board', GoBoard);
  customElements.define('pass-button', PassButton);
  customElements.define('resign-button', ResignButton);
  // ... initialize other custom elements
});
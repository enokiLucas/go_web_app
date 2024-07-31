/**
 * Test
 * console.log('Hello from assets!'); can talk to the console.
 */

import { loadConstants } from './utils/constants';

document.addEventListener('turbo:load', () => {
  loadConstants((constants) => {
    console.log('Constants loaded:', constants);  // Add this line for debugging

  });
});
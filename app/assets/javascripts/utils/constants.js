// app/assets/javascripts/utils/constants.js

let constants = {};

export function loadConstants(callback) {
  fetch('/constants')
    .then(response => response.json())
    .then(data => {
      constants.EDGE_MARGIN = data.EDGE_MARGIN;
      constants.LENGTH_SQUARE = data.LENGTH_SQUARE;
      constants.ALPHABET = data.ALPHABET;
      constants.OFFSET = data.OFFSET;
      constants.FONT_SIZE = data.FONT_SIZE;
      constants.SVG_NS = data.SVG_NS;

      if (callback) callback();
    })
    .catch(error => console.error('Error loading constants:', error));
}

export function getConstants() {
  return constants;
}

import { SVG_NS, LENGTH_SQUARE, EDGE_MARGIN } from '../utils/constants.js'

export function placeStoneOnBoard(board, x, y, playerColor) {
	let stone = document.createElementNS(SVG_NS, "circle");
	stone.setAttribute('cx', x);
	stone.setAttribute('cy', y);
	stone.setAttribute('r', LENGTH_SQUARE / 2);
	stone.setAttribute('fill', playerColor);

	// Convert coordinates relative to the boardMatrix.
	const boardX = (x - EDGE_MARGIN) / LENGTH_SQUARE;
	const boardY = (y - EDGE_MARGIN) / LENGTH_SQUARE;

	// Add data attributes to store the board coordinates
	stone.setAttribute('data-x', boardX);
	stone.setAttribute('data-y', boardY);

	board.appendChild(stone);
}

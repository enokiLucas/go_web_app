import { EDGE_MARGIN, LENGTH_SQUARE, SVG_NS} from '../utils/constants.js';
import { handleIntersectionHover } from './HandleIntersectionHover.js';
import { handleIntersectionClick } from './HandleIntersectionClick.js';
import { gameStateManager } from './GameStateManager.js';

export function addEventListeners(board, boardSize, ghostStone, handleIntersectionHover, handleIntersectionClick) {
	// Logic to add event listeners
	// These listeners can interact with ghostPieceManager and gameStateManager
	// Iterate over the grid size to access each intersection
	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize; j++) {
			// Create a circle at each intersection for the event listener
			let intersection = document.createElementNS(SVG_NS, "circle");
			intersection.setAttribute('cx', EDGE_MARGIN + (i * LENGTH_SQUARE));
			intersection.setAttribute('cy', EDGE_MARGIN + (j * LENGTH_SQUARE));
			intersection.setAttribute('r', 10); // Small radius, essentially invisible
			intersection.setAttribute('fill', 'transparent'); // Make the circle invisible
			intersection.setAttribute('class', 'intersection');

			// Use the provided callback functions for hover and click events
			intersection.addEventListener('mouseenter', (event) => {
				ghostStone.style.visibility = 'visible';
				handleIntersectionHover(event, ghostStone)
			});
			intersection.addEventListener('mouseleave', () => { ghostStone.style.visibility = 'hidden'; });

			intersection.addEventListener('click', (event) => handleIntersectionClick(board, event, ghostStone));

			board.appendChild(intersection);
		}
	}
}

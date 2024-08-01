import { rulesControl } from '../RulesControl.js';
import { gameStateManager } from '../GameStateManager.js';
import { identifyGroups, hasLiberties, toggleColor } from '../../utils/RulesUtil.js';


class CaptureRule {
	constructor() {}

	// Method to analyze potential captures without removing stones
	analyzeCaptures(x, y, matrix) {
		const potentialCaptures = [];
		// Identify opposite color groups around the last move
		const oppositeColorGroups = identifyGroups(x, y, matrix, true);
		//console.log(oppositeColorGroups); // TEST

		oppositeColorGroups.forEach(group => {
			// Check if the group has no liberties
			if (!hasLiberties(group, matrix)) {
				// Instead of removing, add group to potential captures
				potentialCaptures.push(...group);
			}
		});

		//console.log(potentialCaptures); //test
		return potentialCaptures; // Return all groups that would be captured
	}

	// Method to remove a group of stones from the board
	removeStones(board, group) {
		group.forEach(stone => {
			// Update the boardMatrix
			rulesControl.updateCell(stone.x, stone.y, null);

			// Remove SVG stone from the board
			const selector = `circle[data-x="${stone.x}"][data-y="${stone.y}"]`;
			const stoneElement = board.querySelector(selector);
			if (stoneElement) {
				stoneElement.remove(); // Removes the SVG element from the DOM
			}
		});


		// Dispatch an event with metadata about the capture to handleIntersectionClick
		const metadata = {
			type: 'capture',
			captured_stones_color: toggleColor(gameStateManager.currentPlayer),
			stones: group
		};
		const captureEvent = new CustomEvent('new-metadata', {
			detail: metadata
		});
		document.dispatchEvent(captureEvent);
	}

}

// Export a single instance if CaptureRule
export const captureRule = new CaptureRule();

import { gameStateManager } from './GameStateManager.js';
import { koRule } from './rules/KoRule.js';
import { captureRule } from './rules/CaptureRule.js';
import { suicideRule } from './rules/SuicideRule.js';

export class RulesControl {
	constructor() {
		this.boardMatrix = this.initializeBoardMatrix();
		this.boardStatesHistory = [];
	}

	initializeBoardMatrix(size) {
		// Create a 2D array representing the board
		const boardMatrix = [];
		const size_n = parseInt(size, 10); // Convert string to number
		for (let i = 0; i < size; i++) { // Create an array with size number of lines
			boardMatrix[i] = new Array(size_n).fill(null); // Create a new array for each line, each new array with 'size' number of rows.
		}
		return boardMatrix;
	}

	resetBoardMatrix(size) {
		this.boardMatrix = this.initializeBoardMatrix(size); // Reinitialize the board Matrix
	}

	updateCell(x, y, color) {
		// Place a stone on the board and check for captures
		this.boardMatrix[x][y] = color;

		//console.log(this.boardMatrix); // test
	}

	getCellValue(x, y) {
		return this.boardMatrix[x][y];
	}

	updateBoardState() {
		const currentBoardState = this.boardMatrix.flat().join('');
		this.boardStatesHistory.push(currentBoardState);
		//console.log(this.boardStatesHistory)  //test.
	}

	getPreviousBoardState() {
		// Return the state before the last move
		if (this.boardStatesHistory.length < 2) {
			return null; // Not enough history to have a previous state
		}
		return this.boardStatesHistory[this.boardStatesHistory.length - 1];
	}

	createSimulatedBoardMatrix() {
		// Create a deep copy of the current board matrix
		const simulatedBoardMatrix = this.boardMatrix.map(row => [...row]);
		return simulatedBoardMatrix;
}


	// Centralized method to check if a a move is valid.
	/* List of rules
	 *
	 * 0: No rules were broken.
	 * 1: Ko Rule.
	 * 2: Suicide Rule.
	 */
	isMoveValid(x, y, matrix, player) {
		const potentialCaptures = captureRule.analyzeCaptures(x, y, matrix, player);

		// If captures are possible, check for Ko due to these captures
		if (potentialCaptures.length > 0) {
			if (koRule.checkForKo(x, y, player)) {
				// Move is invalid due to Ko after a capture
				return { isValid: false, captures: [], ruleBreak: 1, message: 'Invalid move due to Ko.' };
			}
			// Valid capture, not a Ko
			return { isValid: true, captures: potentialCaptures, ruleBreak: 0, message: 'Capture is valid.' };
		}

		// No captures, check for suicide
		if (suicideRule.checkForSuicide(x, y, player, matrix)) {
			// Move is invalid due to suicide
			return { isValid: false, captures: [], ruleBreak: 2, message: 'Invalid move due to suicide.' };
		}

		// Move is valid if it's neither capture-related Ko nor suicide
		return { isValid: true, captures: [], ruleBreak: 0, message: 'Move is valid.' };
	}
}

// Export a single instance
export const rulesControl = new RulesControl();

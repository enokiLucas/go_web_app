import { rulesControl } from './RulesControl.js';
import { gameStateManager } from './GameStateManager.js';

class InfluenceMap {
	constructor() {
		this.size = gameStateManager.boardSize;
		this.map = this.initializeMap(this.size);
	}

	setSize() {
		this.size = gameStateManager.boardSize;
	}

	initializeMap(size) {
		// Create a 2D array representing the board
		const boardMatrix = [];
		const size_n = parseInt(size, 10); // Convert string to number
		for (let i = 0; i < size; i++) { // Create an array with size number of lines
			boardMatrix[i] = new Array(size_n).fill(0); // Create a new array for each line, each new array with 'size' number of rows.
		}
		return boardMatrix;
	}

	addInfluence(x, y, color) {
		const influenceValue = color === 'black' ? 1 : -1;
		const decayFactor = 0.1;  // Adjust decay factor as needed

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				let distance = Math.sqrt((x - i) ** 2 + (y - j) ** 2);
				this.map[i][j] += influenceValue / (1 + decayFactor * distance);
			}
		}
	}

	updateMap(board) {
		this.resetMap();
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				if (board[x][y] !== null) {
					this.addInfluence(x, y, board[x][y]);
				}
			}
		}
	}

	resetMap() {
		this.setSize();
		this.map = this.initializeMap(this.size);
	}

	printMap() {
		console.log(this.map.map(row => row.map(value => value.toFixed(2)).join(' ')).join('\n'));
	}

	getMap() {
		return this.map;
	}
}

// Export a single instance
export const influenceMap = new InfluenceMap();

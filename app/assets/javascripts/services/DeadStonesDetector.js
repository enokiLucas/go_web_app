import { influenceMap } from './InfluenceMap.js';
import { rulesControl } from './RulesControl.js';

class DeadStonesDetector {
	constructor() {}

	// Detect dead stones based on influence and board state
	detectDeadStones() {
		const deadStones = { black: [], white: [] };
		const influence = influenceMap.getMap();
		const board = rulesControl.createSimulatedBoardMatrix();

		// Traverse the board to check each stone
		for (let x = 0; x < board.length; x++) {
			for (let y = 0; y < board[x].length; y++) {
				const stone = board[x][y];
				if (stone !== null) {
					const isDead = this.evaluateStone(x, y, stone, influence);
					if (isDead) {
						deadStones[stone].push({ x, y });
					}
				}
			}
		}
		return deadStones;
	}

	// Evaluate if a stone at a given position is dead
	evaluateStone(x, y, color, map) {
		const influence = map[x][y];
		// Define influence thresholds for considering a stone dead
		const threshold = color === 'black' ? -0.5 : 0.5;

		// Consider a stone dead if the influence is strongly against it
		return (color === 'black' && influence < threshold) || (color === 'white' && influence > threshold);
	}
}

export const deadStonesDetector = new DeadStonesDetector();

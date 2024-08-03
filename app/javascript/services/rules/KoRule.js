import { rulesControl } from '../RulesControl.js';

class KoRule {
	checkForKo(x, y, player) {
		// Simulate the move
		const simulatedBoard = JSON.parse(JSON.stringify(rulesControl.boardMatrix));
		simulatedBoard[x][y] = player;
		const simulatedBoardState = simulatedBoard.flat().join('');

		// Compare the simulated state to the previous state
		const previousBoardState = rulesControl.getPreviousBoardState();
		return simulatedBoardState === previousBoardState;
	}
}

export const koRule = new KoRule();


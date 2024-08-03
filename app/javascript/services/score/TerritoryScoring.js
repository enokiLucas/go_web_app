import { rulesControl } from '../RulesControl.js';
import { exploreTerritory } from '../../utils/ScoreUtil.js';

class TerritoryScoring {
	constructor() {
		//this.scoringBoard = rulesControl.createSimulatedBoardMatrix(); // Assuming this creates a deep copy of the board
		this.resetTerritoriesCount();
		this.blackTerritory = 0;
		this.whiteTerritory = 0;
	}

	resetTerritoriesCount() {
		this.blackTerritory = 0;
		this.whiteTerritory = 0;
		this.visited = new Set();
	}

	countScore() {
		const scoringBoard = rulesControl.createSimulatedBoardMatrix();
		for (let x = 0; x < scoringBoard.length; x++) {
			for (let y = 0; y < scoringBoard[x].length; y++) {
				if (scoringBoard[x][y] === null && !this.visited.has(`${x},${y}`)) {
					const { points, isCompletelySurrounded, surroundedBy } = exploreTerritory(scoringBoard, x, y);
					//console.log(territory)
					//console.log(`points:${points}, isCompletelySurrounded:${isCompletelySurrounded}, surroundedBy:${surroundedBy}`);
					if (isCompletelySurrounded) {
						// Mark all explored territory points as visited
						points.forEach(point => {
							this.visited.add(`${point.x},${point.y}`);
						});
						// Add territory size to the corresponding player's score
						if (surroundedBy === 'black') {
							this.blackTerritory += points.length;
						} else if (surroundedBy === 'white') {
							this.whiteTerritory += points.length;
						}
					}
				}
			}
		}
		//console.log(`Black Territory: ${this.blackTerritory}, White Territory: ${this.whiteTerritory}`); TEST
		const scoreTerritory = new CustomEvent('scoreTerritory', {
			detail: {
				blackTerritory: this.blackTerritory,
				whiteTerritory: this.whiteTerritory
			}
		});
		document.dispatchEvent(scoreTerritory);
	}

	// Optional: Method to get current scores
	getScores() {
		return {
			black: this.blackTerritory,
			white: this.whiteTerritory
		};
	}
}

export const territoryScoring = new TerritoryScoring();

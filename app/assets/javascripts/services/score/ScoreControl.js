import { territoryScoring } from './TerritoryScoring.js';

export class ScoreControl {
	constructor() {
		this.scoringMethod = 'Territory Scoring';
		this.komi = 0.5;
		this.territory = { black: 0, white: 0 };
		this.area = { black: 0, white: 0 };
		this.captures = { black: 0, white: 0};
	}

	calculateFinalScore() {
		const finalScore = { black: 0, white: 0 };

		const komi = getKomi() //function to get the Komi !!!may not be necessary.
		if (this.scoringMethod === 'Territory Scoring') {
			getTerritories() //function to get the territories score.
		}

		return finalScore;
	}
}

// Export a single instance
export const scoreControl = new ScoreControl();

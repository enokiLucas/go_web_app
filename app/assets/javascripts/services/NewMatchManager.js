class NewMatchManager {
	constructor() {
		this.newMatchSettings = {
			boardSize: 9,
			playAs: 'black',
			difficult: 1,
			whiteHandicap: 0,
			komi: 6.5
		};
	}

	updateNewMatchSettings(key, value) {
		this.newMatchSettings[key] = value;
	}

	getNewMatchSettings() {
		return this.newMatchSettings;
	}
}

// Export a single instance
export const newMatchManager = new NewMatchManager();

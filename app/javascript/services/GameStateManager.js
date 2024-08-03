class GameStateManager { //Remember to fix SGF TODO
	constructor() {
		this.movesHistory = [];
		this.moveKey = 1; // index for the moves.
		this._currentPlayer = 'black'; // Initialize with black
		this._boardSize = 13;
		this._timerControler = { method: 'AbsoluteTime', totalTime: 1200 }; // Define the method of time keeping
		this.captureCounter = { black: 0, white: 0 }; // Track how many stones each player captured.
		this.scoreCounter = { black: 0, white: 0}; // Save the score.
		this.passCounter = 0; // Track consecutive passes
	}

	get timerControler() {
		return this._timerControler;
	}

	set timerControler(newControler) {
		this._timerControler = newControler;
	}

	set boardSize(newSize) {
		this._boardSize = newSize;
		// Emit an event
		document.dispatchEvent(new CustomEvent('board-size-changed', {
			detail: { size: newSize }
		}));
	}

	get boardSize() {
		return this._boardSize;
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	// Function to increment capture count
	addCaptures(playerColor, captures) {
		const player = playerColor === 'black' ? 'white' : 'black';
		this.captureCounter[player] += captures;
		// Optionally, emit an event with the new capture count
		document.dispatchEvent(new CustomEvent('captures-changed', {
			detail: { player, captures: this.captureCounter[player] }
		}));
	}

	// Getter for capture counts
	getCaptureCounter() {
		return this.captureCounter;
	}

	resetPlayer() {
		this._currentPlayer = 'black'; // Reset the players turns
	}

	resetGameState() {
		this.movesHistory = [];
		this.resetPlayer();
		this.moveKey = 1;
		this.captureCounter = { black: 0, white: 0 };
		this.scoreCounter = { black: 0, white: 0};
		this.passCounter = 0;
		document.dispatchEvent(new CustomEvent('new-game'));
	}

	togglePlayer() {
		this._currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
	}

	recordMove(x, y, metadata = {}) { //Go to handle Intersection Click and change the module
		const move = {
			branch: 0, // Default branch
			key: this.moveKey++,
			player: this._currentPlayer,
			x: x,
			y: y,
			metadata: metadata
		};
		this.movesHistory.push(move);
	}
/*
	getSGFMoves() { // Move this to SGF utils
		return this.moves.map(move => `;${move.color}[${move.position}]`).join('');
	}
*/
	makeMove(x, y, metadata = {}) {
		// Logic to handle a move
		const event = new CustomEvent('moveMade', { detail: { player: this.currentPlayer } });
		this.recordMove(x, y, metadata);
		this.togglePlayer();
		document.dispatchEvent(event);

		this.passCounter = 0; // Reset pass counter on a valid move
	}

	makePass() {
		const event = new CustomEvent('passMade', { detail: {player: this._currentPlayer } });
		this.recordMove(null, null, { pass: true }); // Add a pass move movesHistory
		this.togglePlayer(); // Switch turns
		document.dispatchEvent(event);

		// Increment pass counter and check for consecutive passes
		this.passCounter++;
		console.log(this.passCounter);
		if (this.passCounter >= 2) {
			document.dispatchEvent(new CustomEvent('end-game', { detail: {
				type: 'passes',
				player: this._currentPlayer
			} }));
		}
		console.log(`makePass: ${event.detail.player}`); //TEST
	}
}

// Export a single instance
export const gameStateManager = new GameStateManager();

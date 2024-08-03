import { gameStateManager } from '../GameStateManager.js';

class Timer {
	constructor() {
		this.timeMinutes = { black: 10, white: 10};
		this.time = {};
		this.timerPath = {};
		this.intervalID = { black: null, white: null };
	}

	setTime() {
		this.time = {
			black: 60 * this.timeMinutes['black'],
			white: 60 * this.timeMinutes['white']
		}
	}

	setTimerPath(pathToShadowRoot) {
		this.timerPath = {
			black: pathToShadowRoot.getElementById('black-timer'),
			white: pathToShadowRoot.getElementById('white-timer')
		};
	}

	startCountdown(player = 'black') {
		// Update the countdown every second
		this.intervalID[player] = setInterval(() => {
			if (this.time[player] < 0) {
				this.stopCountdown(player);
				document.dispatchEvent(new CustomEvent('end-game', { detail: {
					type: 'timeout',
					player: gameStateManager.currentPlayer
				} }));
			} else {
				this.convertToClock(player);
				this.time[player]--; // Decrement the timer
			}
		}, 1000);
		//console.log(this.intervalID[player]); //TEST
	}

	stopCountdown(player) {
		if (this.intervalID[player] !== null) {
			clearInterval(this.intervalID[player]);
			this.intervalID[player] = null; // Ensure timer is marked as stopped
		}
	}

	switchTimer(player) {
		this.stopCountdown(player);
		const nextPlayer = player === 'black' ? 'white' : 'black';
		this.startCountdown(nextPlayer);
	}

	convertToClock(player) {
		const minutes = Math.floor(this.time[player] / 60);
		let seconds = this.time[player] % 60;
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		this.timerPath[player].textContent = `${minutes}:${seconds}`;
	}

	setTimerBeforeMatch() {
		Object.keys(this.timerPath).forEach((player) => {
			this.convertToClock(player);
		})
	}

	handleTimer(player) {

	}
}

export const timer = new Timer();

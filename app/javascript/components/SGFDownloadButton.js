import { gameStateManager } from '../services/GameStateManager.js';
import { loadStyles } from '../utils/StyleLoader.js';

class SGFDownloadButton extends HTMLElement {
	constructor() {
		super();

		// Attach a shadow root to the element.
		this.attachShadow({ mode: 'open' });
	}

	getDateISO8601() {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
		return formattedDate;
	}

	connectedCallback() {
		// Create a button element
		const button = document.createElement('button');
		button.textContent = 'Download SGF';

		// Append the button to the shadow root
		this.shadowRoot.appendChild(button);

		// Bind the click event to the button
		button.addEventListener('click', this.downloadSGF.bind(this));

		loadStyles(this.shadowRoot, '../assets/styles/Buttons.css');

		// Listen for board size change events
		document.addEventListener('board-create', (event) => {
			const newSize = event.detail.size;
			this.setAttribute('board-size', newSize);
		});
	}

	downloadSGF() {
		const sgfContent = this.generateSGFContent();
		const blob = new Blob([sgfContent], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `GO-${this.getDateISO8601()}.sgf`; // Customize the file name as needed
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	generateSGFContent() {
		const boardSize = this.getAttribute('board-size');
		const dateFormatted = this.getDateISO8601();
		const sgfHeader = `(;GM[1]FF[4]CA[UTF-8]AP[WebGo]KM[]SZ[${boardSize}]DT[${dateFormatted}]\n`;
		const sgfMoves = gameStateManager.getSGFMoves();
		return `${sgfHeader}${sgfMoves})`;
	}

	getSGFMoves() {
		return gameStateManager.getSGFMoves();
	}
}

customElements.define('sgf-download-button', SGFDownloadButton);

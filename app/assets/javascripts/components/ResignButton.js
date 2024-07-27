import { gameStateManager } from '../services/GameStateManager.js'
import { loadStyles } from '../utils/StyleLoader.js';
import { getPlayerSGFColor } from '../utils/SGFUtil.js'

class ResignButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		loadStyles(this.shadowRoot, '../assets/styles/Buttons.css');
		const button = document.createElement('button');

		button.textContent = 'Resign';
		button.setAttribute('class', 'lieu-button');
		button.setAttribute('id', 'resign-pass');

		button.addEventListener('click', () => {
			document.dispatchEvent(new CustomEvent('end-game', { detail: {
				type: 'resignation',
				player: gameStateManager.currentPlayer
			} }));
		});

		this.shadowRoot.appendChild(button);
	}
}

customElements.define('resign-button', ResignButton);

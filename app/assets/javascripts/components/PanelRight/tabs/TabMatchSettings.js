import { loadHTML } from '../../../utils/HTMLLoader.js';
import { loadStyles } from '../../../utils/StyleLoader.js';

class TabMatchSettings extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		await loadHTML(this.shadowRoot, '../../../assets/html/panelTabs/TabMatchSettings.html');
		await loadStyles(this.shadowRoot, '../../../assets/styles/PanelRight.css');
	}
}

customElements.define('tab-match-settings', TabMatchSettings);
export const tabMatchSettings = new TabMatchSettings();

import { loadHTML } from '../../../utils/HTMLLoader.js'

class TestTab extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		await loadHTML(this.shadowRoot, '../../../assets/html/TestTab.html');
	}
}

customElements.define('test-tab', TestTab);

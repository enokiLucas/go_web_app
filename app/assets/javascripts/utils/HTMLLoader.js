//Utility function that loads the internal HTML.

export async function loadHTML(shadowRoot, htmlPath) {
	const html = await fetch(htmlPath).then(response => response.text());
	shadowRoot.innerHTML = html;
}

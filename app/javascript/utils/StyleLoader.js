//Utility function that loads the CSS logic.

export async function loadStyles(shadowRoot, stylePath) {
	const css = await fetch(stylePath).then(response => response.text());
	const style = document.createElement('style');
	style.textContent = css;
	shadowRoot.appendChild(style);
}

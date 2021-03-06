/**
 * Basic routing script for GitHub pages
 * Copyright (c) Hanz 2021, use it wisely.
 *
 * Attention: SEO have not been payed with attentions
 * therefore, this script can only be used by static/private pages
 * such as: legals, login, dashboard, trading ui.
 *
 * Nearly all of our pages are static so you should't be worried
 */

(async () => {
	let content = await fetch(`/pages${location.pathname}.html`);

	// Don't repeat ourselves
	if (content.status != 404) {
		// document.write first call would empty the document
		// allowing us to replace the content with our routed
		// page
		document.write(await content.text());
	}
})();

/**
 * Basic routing script for GitHub pages
 * Copyright (c) Hanz 2021, use it wisely.
 */

(async () => {
	let content = await fetch(`/pages${location.pathname}.html`);
	document.write(await content.text());
})();

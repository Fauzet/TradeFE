/**
 * Homepage script
 * For statistics and functions
 */

(async () => {
	// Get general stat
	let response = await fetch(`${server}/api/general`);
	let stat = await response.json();

	if (stat.success === false) {
		return alert('Error', 'Failed Fetching Statistic', stat.message);
	}

	// Put to elements
	let volume = BigInt(stat.result.marketVolume) / 10n ** 8n;

	$("#volumeCount").innerText = abbreviateNum(+volume.toString()) + ' USD';
	$("#traderCount").innerText = stat.result.traderCount;
	$("#pairCount").innerText = stat.result.pairCount;

	// Alert news
	setTimeout(() => {
		alert('Info', 'Latest Announcement', stat.result.marketNews);
	}, 500);
})();

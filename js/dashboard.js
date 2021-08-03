/**
 * Dashboard functionality script
 * Charting, data fetching, and more
 *
 * Please defer this
 */

function capArray(arr, len) {
	if (arr.length > len) arr.length = len;
}

function calculateChange(crypto) {
	let change = ((crypto.price - crypto.price24) / crypto.price24 * 100).toFixed(8);
	return change;
}

(async () => {
	// Initialize temp variables
	let res, data, result;
	// Variables
	let session = getCookie('session');
	let tickers = [], ddata = {}, totalInUSD = 0, balances = {};

	// Check only if already logged in
	// Then, just place default values
	if (session === undefined) return;

	// Set username
	$("#username").innerText = session.split('@')[0];

	// Get data
	res = await fetch(`${server}/api/getBalance`, {
		headers: { Authorization: session },
		cache: 'no-cache'
	});
	data = await res.json();

	if (data.success === false) return alert('Error', data.message);
	balances = result = data.result;

	res = await fetch(`${server}/api/pairs`);
	data = await res.json();

	if (data.success === false) return alert('Error', data.message);
	tickers = data.result;

	// Put to portfolio table
	let table = $("table#portfolio > tbody");
	ddata.labels = [];
	ddata.datasets = [{
		label: 'Portfolio',
		data: [],
		backgroundColor: []
	}];

	// For loop
	for (const i of Object.keys(result)) {
		// Create new row
		let row = document.createElement('tr');
		let ticker = document.createElement('td');
		let balance = document.createElement('td');

		ticker.toggleAttribute('small');
		balance.toggleAttribute('small');

		// Put data
		totalInUSD += tickers[i].price * result[i] / 10 ** 8;
		ticker.innerText = tickers[i].ticker;
		balance.innerText = result[i].rtrim('0').rtrim('\\.');

		// Add to row
		row.appendChild(ticker);
		row.appendChild(balance);

		// Add row to table
		table.appendChild(row);

		// Add data to doughnut
		ddata.labels.push(tickers[i].ticker);
		ddata.datasets[0].data.push(
			result[i]
		);
		ddata.datasets[0].backgroundColor.push(tickers[i].color);
	}

	// Put total USD
	$("#balanceInUSD").innerText = `$${totalInUSD.toFixed(2)}`;

	// Create doughnut
	const dconfig = {
		type: 'doughnut',
		data: ddata,
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: (item) => {
							return ddata.labels[item.dataIndex] + ': ' + ddata.datasets[0].data[item.dataIndex].rtrim('0').rtrim('\\.');
						}
					}
				}
			}
		}
	};

	new Chart($('#portfolioDoughnut').getContext('2d'), dconfig);

	// Get recent trades
	res = await fetch(`${server}/api/getRecentTrades`, {
		headers: { Authorization: session }
	});
	data = await res.json();

	if (data.success === false) return alert('Error', data.message);

	// Put to table
	result = data.result;
	table = $("table#recentTrades > tbody");
	for (const trade of result) {
		let row = document.createElement('tr');
		let market = document.createElement('td');
		let price = document.createElement('td');
		let amount = document.createElement('td');
		let date = document.createElement('td');

		market.toggleAttribute('small');
		price.toggleAttribute('small');
		amount.toggleAttribute('small');
		date.toggleAttribute('small');

		let funcColor = 'func' + (trade.direction ? '-yes' : '-no');
		market.toggleAttribute(funcColor);
		price.toggleAttribute(funcColor);
		amount.toggleAttribute(funcColor);
		date.toggleAttribute(funcColor);

		// Put data
		let symbols = trade.market.split('/');
		let symbol;

		if (trade.direction) { // BUY direction
			symbol = symbols[1]; // Put base symbol
		} else { // SELL direction
			symbol = symbols[0]; // Put target symbol
		}

		market.innerText = trade.market;
		price.innerText = trade.price.rtrim('0').rtrim('\\.') + ' ' + symbols[1];
		amount.innerText = trade.amount.rtrim('0').rtrim('\\.') + ' ' + symbol;
		date.innerText = new Date(+trade.timestamp).toISOString();

		// Add to row
		row.appendChild(market);
		row.appendChild(price);
		row.appendChild(amount);
		row.appendChild(date);

		// Add row to table
		table.appendChild(row);
	}


	// Get My Top currency
	// Put to table
	let rows = [];
	table = $("table#myTop > tbody");
	for (const i of Object.keys(balances)) {
		let changeAmount = calculateChange(tickers[i]);
		let row = document.createElement('tr');
		let name = document.createElement('td');
		let price = document.createElement('td');
		let change = document.createElement('td');

		name.toggleAttribute('small');
		price.toggleAttribute('small');
		change.toggleAttribute('small');

		let funcColor = 'func' + (changeAmount >= 0 ? '-yes' : '-no');
		change.toggleAttribute(funcColor);

		// Put data
		name.innerText = tickers[i].ticker;
		price.innerText = tickers[i].price.rtrim('0').rtrim('\\.') + ' USD';
		change.innerText = changeAmount.rtrim('0').rtrim('\\.') + '%';

		// Add to row
		row.appendChild(name);
		row.appendChild(price);
		row.appendChild(change);

		// Add row to table
		rows.push({ row, change: changeAmount });
	}

	rows.sort((a, b) => a.change - b.change);
	rows.reverse();
	for (const row of rows) {
		table.appendChild(row.row);
	}

	// Get best and worst performer
	let performers = [].concat(tickers);
	performers = performers.map(x => {
		x.change = calculateChange(x);
		return x;
	});
	performers.sort((a, b) => a.change + b.change);

	let bestPerformer = [].concat(performers);
	let worstPerformer = performers.reverse();

	capArray(bestPerformer, 5);
	capArray(worstPerformer, 5);

	// Put bests to table
	table = $("table#bestCurrencies > tbody");
	for (const performer of bestPerformer) {
		let changeAmount = performer.change;
		let row = document.createElement('tr');
		let name = document.createElement('td');
		let price = document.createElement('td');
		let change = document.createElement('td');

		name.toggleAttribute('small');
		price.toggleAttribute('small');
		change.toggleAttribute('small');

		let funcColor = 'func' + (changeAmount >= 0 ? '-yes' : '-no');
		change.toggleAttribute(funcColor);

		// Put data
		name.innerText = performer.ticker;
		price.innerText = performer.price.rtrim('0').rtrim('\\.') + ' USD';
		change.innerText = changeAmount.rtrim('0').rtrim('\\.') + '%';

		// Add to row
		row.appendChild(name);
		row.appendChild(price);
		row.appendChild(change);

		// Add row to table
		table.appendChild(row);
	}

	// Put worsts to table
	table = $("table#worstCurrencies > tbody");
	for (const performer of worstPerformer) {
		let changeAmount = performer.change;
		let row = document.createElement('tr');
		let name = document.createElement('td');
		let price = document.createElement('td');
		let change = document.createElement('td');

		name.toggleAttribute('small');
		price.toggleAttribute('small');
		change.toggleAttribute('small');

		let funcColor = 'func' + (changeAmount >= 0 ? '-yes' : '-no');
		change.toggleAttribute(funcColor);

		// Put data
		name.innerText = performer.ticker;
		price.innerText = performer.price.rtrim('0').rtrim('\\.') + ' USD';
		change.innerText = changeAmount.rtrim('0').rtrim('\\.') + '%';

		// Add to row
		row.appendChild(name);
		row.appendChild(price);
		row.appendChild(change);

		// Add row to table
		table.appendChild(row);
	}
})();

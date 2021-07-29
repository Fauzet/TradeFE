window.$ = function(selector) {
	let els = document.querySelectorAll(selector);
	if (els.length <= 1) {
		return els[0];
	} else {
		return [...els];
	}
}

Number.prototype.toFixed = function(n) {
	// Original src: https://helloacm.com/javascripts-tofixed-implementation-without-rounding/
	// Some code altered.

	const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g")
	let a = this.toLocaleString('fullwide', {useGrouping: 0}).match(reg);
	a = a ? a[0] : '0';

	const dot = a.indexOf(".");
	if (dot === -1) { // integer, insert decimal dot and pad up zeros
		return a + "." + "0".repeat(n);
	}
	const b = n - (a.length - dot) + 1;
	return b > 0 ? (a + "0".repeat(b)) : a;
}

function numLength(num) { return (''+num).length; }

function abbreviateNum(value) {
	const suffixes = ['', 'K', 'M', 'B','T'];
	const suffixNum = Math.floor((numLength(value) - 1) / 3);
	let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(3));
	if (shortValue % 1 != 0) {
		shortValue = shortValue.toFixed(1);
	}

	return shortValue + suffixes[suffixNum];
}

async function sha256(data) {
	const uint8 = new TextDecoder().encode(data);
	const buffer = await crypto.subtle.digest('sha-256', uint8);
	const array = [...(new Uint8Array(buffer))];
	const hex = array.map(ch => ch.toString(16).padStart(2, '0')).join('');

	return hex;
}

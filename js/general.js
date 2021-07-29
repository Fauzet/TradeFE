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
	var suffixes = ['', 'K', 'M', 'B','T'];
	var suffixNum = Math.floor((numLength(value) - 1) / 3);
	var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(3));
	if (shortValue % 1 != 0) {
		shortValue = shortValue.toFixed(1);
	}

	return shortValue + suffixes[suffixNum];
}

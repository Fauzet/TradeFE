/**
 * This file will be included in every page
 */

// Backend server, please leave it alone
// It is a private code
window.server = "http://backend.trade.fauzet.online:8081";

// document.querySelectorAll shorthand
window.$ = function(selector) {
	let els = document.querySelectorAll(selector);
	if (els.length <= 1) {
		return els[0];
	} else {
		return [...els];
	}
};

// Alert function overwrite
(async () => {
	// Get SweetAlert2
	eval(await(await fetch("/js/sweetalert2.js")).text());

	let icons = ["error", "success", "info", "question"];

	// Assign SweetAlert2 to window.alert
	window.alert = function() {
		let title, desc, icon;
		let args = [...arguments];

		title = args[0];

		if (icons.includes(title.toLowerCase())) {
			icon = title.toLowerCase();
			args = args.slice(1);
		}

		if (args.length > 1) {
			title = args[0];
			args = args.slice(1);
		}

		desc = args.join('<br/>');

		Swal.fire({
			icon,
			title,
			html: desc
		});
	};
})();

// toFixed now did not round numbers
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

// Helper function
function numLength(num) { return (''+num).length; }

// Self explanatory function
function abbreviateNum(value) {
	const suffixes = ['', 'K', 'M', 'B','T'];
	const suffixNum = Math.floor((numLength(value) - 1) / 3);
	let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(3));
	if (shortValue % 1 != 0) {
		shortValue = shortValue.toFixed(1);
	}

	return shortValue + suffixes[suffixNum];
}

// Hash a data with built-in sha256 algorithm from the browser
function sha256(data) {
	if (window.jsSHA === undefined) throw 'Please include sha256.js';

	let obj = new jsSHA("SHA-256", "TEXT");
	obj.update(data);

	return obj.getHash("HEX");
}

// Self explanatory, uses ES6 syntax
String.prototype.splitOnce = function (d) {
	let [first, ...rest] = this.split(d);
	return rest.length > 0 ? [first, rest.join(d)] : [first];
}

String.prototype.rtrim = function (d='') {
	return this.replace(new RegExp(`${d}+$`), '');
}

String.prototype.ltrim = function (d='') {
	return this.replace(new RegExp(`^${d}+`), '');
}

// Self explanatory, returns undefined when not found
function getCookie(name) {
	let cookies = document.cookie
	.split('; ')
	.map(x => {
		let splitted = x.splitOnce('=');
		return {name: splitted[0], value: splitted[1]};
	});

	for (const cookie of cookies) {
		if (cookie.name == name) return cookie.value;
	}
}

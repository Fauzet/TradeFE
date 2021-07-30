/**
 * This script need to be included when you include
 * the email subscription form once in a page
 *
 * Please defer this script
 */

$("#subsButton").addEventListener('click', async function() {
	// Checks
	let email = $("#subsEmail").value;

	if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) {
		// User email invalid
		return alert("Error", "Email invalid");
	}

	// Submit subscribe
	try {
		let response = await fetch(`${server}/api/subscribeEmail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		});
		let data = await response.json();
	} catch (e) {
		return alert("Error", "Network Error", e.toString());
	}

	if (data.success == false) {
		return alert("Error", "An error occured", data.message);
	}

	alert("Success", data.message);
});

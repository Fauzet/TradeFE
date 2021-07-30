/**
 * Login script using modern AJAX
 * Please defer this script
 */

$("#loginButton").addEventListener('click', async function() {
	// Check layers
	let username = $("#username").value;
	let password = $("#password").value;

	/// User input security layer
	if (/[a-zA-Z0-9]+/.test(username) === false) {
		return alert("Error", "Username invalid");
	}

	// Authenticate
	/// Assign session cookie
	let session = sha256(`${username}:${password}`);
	document.cookie = `session=${username}@${session};`;

	/// Validate server response
	let data;
	try {
		let response = await fetch(`${server}/api/login`, {
			headers: {
				Authorization: getCookie('session')
			},
			method: 'POST',
			credentials: 'include'
		});
		data = await response.json();
	} catch (e) {
		return alert("Error", "Network Error", e.toString());
	}

	if (data.success === false) {
		return alert("Error", "An error occurred", data.message);
	}

	alert("Success", data.message);
	location.href = "/dashboard";
});

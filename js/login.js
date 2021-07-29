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
	let session = await sha256(`${username}:${password}`);
	document.cookie = `session=${username}@${session};`;

	/// Validate server response
	let response = await fetch(`${server}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: {
			username: username,
			password: password
		}
	});
	let data = await response.json();

	if (data.success === false) {
		return alert("Error", data.message);
	}

	alert("Success", data.message);
	location.href = "/dashboard";
});

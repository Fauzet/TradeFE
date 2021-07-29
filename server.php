<?php
// http://www.lornajane.net/posts/2012/php-5-4-built-in-webserver
if (file_exists(__DIR__ . '/' . $_SERVER['REQUEST_URI'])) {
	return false; // serve the requested resource as-is.
}

if ($_SERVER['SCRIPT_NAME'] == '/' ) {
	include_once 'index.html';
} else {
	// Last hope
	http_response_code(404);
	include_once '404.html';
}

// cd ./www
// php -S localhost:8888 routing.php

"use strict";

function fileGetContents(url, callback) {
	var https = require("https");
	var body = "";
	var request = https.get(url, function(response) {
		if (response.statusCode === 301) {
			var location = response.headers.location;
			fileGetContents(location, callback);
			return;
		} else if (response.statusCode !== 200) {
			if (callback) {
				callback(new Error("Invalid request, code " + response.statusCode + "."));
			}
			return;
		}

		response.setEncoding("utf8");
		response.on("data", function(chunk) {
			body += chunk.toString("utf8");
		});
		response.on("end", function() {
			callback(null, body);
		});
	});
}

module.exports = fileGetContents;
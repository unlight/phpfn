var functions = require("./etc/data.json");
var fileGetContents = require("./etc/file-get-contents.js");
var format = require("util").format;
var phpFunctions = {};

module.exports = function(name, callback) {
	var url = functions[name];
	if (!url) {
		throw new Error(format("Unknown function '%s'.", name));
	}
	var fn = phpFunctions[name];
	if (fn) {
		callback(null, fn);
		return;
	}
	fileGetContents(url, function(error, body) {
		if (error) {
			return callback(error);
		}
		var vm = require("vm");
		vm.runInNewContext(body, phpFunctions);
		var fn = phpFunctions[name];
		if (typeof fn === "function") {
			callback(null, fn);
		} else {
			callback(new Error(format("'%s' is not a function.", name)));
		}
	});
};
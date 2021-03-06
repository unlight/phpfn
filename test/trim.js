var wru = require("wru");
var phpfn = require("..");
var basename = require("path").basename;

var tests = [];
tests[tests.length] = {
	name: basename(__filename),
	test: function() {
		phpfn("trim", wru.async(function(error, fn) {
			if (error) {
				throw error;
			}
			wru.assert("trim(' abc ')", fn(" abc ") === "abc");
			wru.assert("trim('xabcx', 'x')", fn("xabcx", "x") === "abc");
		}));
	}
};

if (module.parent) {
	module.exports = tests;
} else {
	wru.test(tests);
}
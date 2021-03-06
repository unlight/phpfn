var wru = require("wru");
var phpfn = require("..");
var basename = require("path").basename;

var tests = [];
tests[tests.length] = {
	name: basename(__filename),
	test: function() {
		phpfn("date", wru.async(function(error, fn) {
			if (error) {
				throw error;
			}
			wru.assert("date(Y-m-d)", fn("Y-m-d") != null);
		}));
	}
};

if (module.parent) {
	module.exports = tests;
} else {
	wru.test(tests);
}
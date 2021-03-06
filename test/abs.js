var wru = require("wru");
var phpfn = require("..");
var basename = require("path").basename;

var tests = [];
tests[tests.length] = {
	name: basename(__filename),
	test: function() {
		phpfn("abs", wru.async(function(error, fn) {
			if (error) throw error;
			wru.assert("abs -4.2", fn(-4.2) === 4.2);
			wru.assert("abs 5", fn(5) === 5);
		}));
	}
};

if (module.parent) {
	module.exports = tests;
} else {
	wru.test(tests);
}
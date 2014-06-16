phpfn
=====
Load function from phpjs.org by demand.

Examples:
```js
var phpfn = require("phpfn");
phpfn("trim", function(error, trim) {
	if (error) throw error;
	console.log(trim("xABCx", "x")); // ABC
});

var phpfn = require("phpfn");
phpfn("date", function(error, date) {
	if (error) throw error;
	console.log(date("Y-m-d")); // 2014-06-17
});
```

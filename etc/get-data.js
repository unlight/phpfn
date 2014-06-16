var phpFunctionsUrl = "http://phpjs.org/functions/";
var cheerio = require("cheerio");
var request = require("request");
var path = require("path");
// var emitter = new (require("events").EventEmitter);
var fs = require("fs");
var async = require("async");

var dataFunctions = {};

request(phpFunctionsUrl, function (error, response, html) {
	if (error) throw error;
	var $  = cheerio.load(html);
	var $anchors = $("article ul li a");
	var size = $anchors.length;
	var tasks = [];
	$anchors.each(function(index, element) {
		var href = $(this).attr("href");
		var functionPageUrl = 'http://phpjs.org' + href;
		tasks[tasks.length] = function(done) {
			console.log("Opening url: %s", functionPageUrl);
			request(functionPageUrl, function onLoadFunctionPageUrl(error, response, html) {
				if (error) throw error;
				var $ = cheerio.load(html);
				var codeFileUrl = $("figure.code figcaption a").attr("href");
				var basename = path.basename(codeFileUrl, ".js");
				dataFunctions[basename] = codeFileUrl;
				done(null);
			});
		}	

	});
	async.parallelLimit(tasks, 3, function(error, result) {
		var data = JSON.stringify(dataFunctions);
		fs.writeFileSync("data.json", data);
	});
});

var browserify = require('browserify');
var fs = require('fs');
var _ = require('lodash');
var dependenciesReader = require('./dependencies-reader');

function buildVendor() {
	var b = browserify();

	_.each(dependenciesReader(), function (lib) {
		b.require(lib);
	});

	b.bundle().pipe(fs.createWriteStream('static/vendor.js'));
}

buildVendor();

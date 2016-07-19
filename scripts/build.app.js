var browserify = require('browserify');
var fs = require('fs');
var _ = require('lodash');
var dependenciesReader = require('./dependencies-reader');

function buildApp() {
	var b = browserify('src/index.js', {debug: true});
	b.transform('babelify');
	_.each(dependenciesReader(), function (lib) {
		b.external(lib);
	});
	b.bundle().pipe(fs.createWriteStream('static/app.js'));
}

buildApp();

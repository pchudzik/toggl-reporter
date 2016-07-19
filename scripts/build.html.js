var fs = require('fs');

var glob = require('glob');
var _ = require('lodash');

var moduleName = 'reporter.template';
var basePath = 'src/';

function processFile(file) {
	var filePath = file.replace(basePath, '');
	var html = fs.readFileSync(file, 'utf8')
		.trim()
		.replace(/\\/g, '\\\\')
		.replace(/'/g, '\\\'')
		.replace(/\r?\n/g, '\\n\' +\n    \'');

	return {
		path: filePath,
		html: html
	};
}

glob('src/**/*.html', function (er, files) {
	var entriesToPutInCache = _.map(files, processFile);
	var resultCache = _.map(entriesToPutInCache, function(entry) {
		return '$templateCache.put(' + '\'' + entry.path + '\', \'' + entry.html + '\');\n';
	});
	var resultJs = 'import * as angular from "angular";\n\n' +
			'const templateModule = angular.module("' + moduleName + '", [])' +
			'.run(["$templateCache", function($templateCache) {\n' +
			resultCache.join(';\n') +
			'}]);\n\n' +
		'export default templateModule;';
	process.stdout.write(resultJs);
});

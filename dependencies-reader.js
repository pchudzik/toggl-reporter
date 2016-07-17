const backendLibs = [
	'finalhandler',
	'http-proxy',
	'serve-static'
];

var fs = require('fs');
var _ = require('lodash');

module.exports = function findDependencies() {
	var dependencies = JSON.parse(fs.readFileSync('package.json', 'utf8')).dependencies;
	var libraryNames = _.keys(dependencies);
	return _.filter(libraryNames, function (lib) {
		return !backendLibs.contains(lib);
	});
};

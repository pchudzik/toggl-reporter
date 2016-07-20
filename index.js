'use strict';

var _ = require('lodash');
var http = require('http');
var httpProxy = require('http-proxy');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var url = require('url');

var serve = serveStatic("./");
var proxy = httpProxy.createProxyServer({});

var DEFAULT_FILE = 'index.html';
var ASSET_EXTENSIONS = [
	'js',
	'css',
	'png',
	'jpg',
	'jpeg',
	'gif',
	'svg',
	'eot',
	'otf',
	'ttc',
	'ttf',
	'woff',
	'woff2'
];

http.createServer(function (req, res) {
	if (req.url.startsWith("/api")) {
		proxy.web(req, res, {
			secure: false,
			target: 'https://www.toggl.com'
		});
	} else {
		var fileHref = url.parse(req.url).href;
		if (!isResourceCall(fileHref)) {
			req.url = '/' + DEFAULT_FILE;
		}

		serve(req, res, finalhandler(req, res));
	}
})
	.listen('8080');

function isResourceCall(fileHref) {
	var lowerCaseFileHref = _.toLower(fileHref);
	return !!_.find(ASSET_EXTENSIONS, function(extension) {
		return _.endsWith(lowerCaseFileHref, _.toLower(extension));
	});
}

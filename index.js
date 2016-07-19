var http = require('http');
var httpProxy = require('http-proxy');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var url = require('url');

var serve = serveStatic("./");
var proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
	if (req.url.startsWith("/api")) {
		proxy.web(req, res, {
			secure: false,
			target: 'https://www.toggl.com'
		});
	} else {
		var assetExtensions = [
			'js',
			'css',
			'png',
			'jpe?g',
			'gif',
			'svg',
			'eot',
			'otf',
			'ttc',
			'ttf',
			'woff2?'
		];
		var DEFAULT_FILE = 'index.html';
		var ASSET_EXTENSION_REGEX = new RegExp('\\b(?!\\?)\\.(' + assetExtensions.join('|') + ')\\b(?!\\.)', 'i');
		var fileHref = url.parse(req.url).href;

		if (!ASSET_EXTENSION_REGEX.test(fileHref) || fileHref.startsWith('/rpt')) {
			req.url = '/' + DEFAULT_FILE;
		}

		serve(req, res, finalhandler(req, res));
	}
})
	.listen('8080');

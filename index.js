var http = require('http');
var httpProxy = require('http-proxy');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");
var proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
	if (req.url.startsWith("/api")) {
		proxy.web(req, res, {
			secure: false,
			target: 'https://www.toggl.com'
		});
	} else {
		serve(req, res, finalhandler(req, res));
	}
})
	.listen('8080');

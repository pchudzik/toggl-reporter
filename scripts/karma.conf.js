'use strict';

module.exports = function (config) {

	config.set({
		basePath: '..',

		frameworks: ['browserify', 'jasmine'],

		browserify: {
			debug: true,
			watch: true,
			transform: [
				['babelify']
			]
		},

		browsers: ['PhantomJS'],

		preprocessors: {
			'src/**/*.js': ['browserify']
		},

		reporters: ['progress'],
		port: 9876,
		logLevel: config.LOG_WARN,
		autoWatch: true,
		singleRun: true,

		files: [
			// 3rd-party resources
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',

			// app-specific code
			'src/index.js',

			// test files
			'src/**/*.spec.js'
		]
	});
};

'use strict';

import * as angular from 'angular';

import 'angular-cookies';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'ngclipboard';
import 'angular-loading-bar';

import './const';
import './commons';
import './report';
import './toggl';
import './route';
import './init';
import './template';

angular
	.module('reporter', [
		'ngAnimate',
		'angular-loading-bar',
		'reporter.template',
		'reporter.const',
		'reporter.commons',
		'reporter.toggl',
		'reporter.report',
		'reporter.route',
		'reporter.init'
	]);

angular.bootstrap(document, ['reporter']);

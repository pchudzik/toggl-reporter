import angular from 'angular';

import 'angular-cookies';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import './const';
import './commons';
import './report';
import './toggl';
import './route';
import './template';

angular
	.module('reporter', [
		'reporter.template',
		'reporter.const',
		'reporter.commons',
		'reporter.toggl',
		'reporter.report',
		'reporter.route'
	]);

angular.bootstrap(document, ['reporter']);

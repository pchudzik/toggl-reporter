import angular from 'angular';

import 'angular-ui-router';

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

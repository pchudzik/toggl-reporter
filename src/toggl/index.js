import * as angular from 'angular';

import './toggl.service'
const togglModule = angular
	.module('reporter.toggl', [
		'reporter.const',
		'reporter.commons'
	])
	.service('togglService', TogglService);

export default togglModule;

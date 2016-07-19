'use strict';

import * as angular from 'angular';

import TogglAuthService from './togglAuth.service';
import TogglWorkspacesService from './togglWorkspaces.service';
import TogglProjectsService from './togglProjects.service';
import TogglEntriesService from './togglEntries.service';


const togglModule = angular
	.module('reporter.toggl', [
		'ngCookies',
		'reporter.const',
		'reporter.commons'
	])
	.service('togglAuthService', TogglAuthService)
	.service('togglWorkspacesService', TogglWorkspacesService)
	.service('togglProjectsService', TogglProjectsService)
	.service('togglEntriesService', TogglEntriesService);

export default togglModule;

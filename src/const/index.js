'use strict';

import * as angular from 'angular';

import API_URL from './apiUrl.constant';
import TOGGL_COOKIE from './togglCookie.const';
import TOGGL_API from './togglApi.const';

const constModule = angular
	.module('reporter.const', [])

	.constant('API_URL', API_URL)
	.constant('TOGGL_COOKIE', TOGGL_COOKIE)
	.constant('TOGGL_API', TOGGL_API);

export default constModule;

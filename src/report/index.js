'use strict';

import * as angular from 'angular';

import ByProjectDailyReportGenerator from './byProjectDailyReportGenerator.service';

const reportModule = angular
	.module('reporter.report', ['reporter.toggl'])
	.service('byProjectDailyReportGenerator', ByProjectDailyReportGenerator);

export default reportModule;

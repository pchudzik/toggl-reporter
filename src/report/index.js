'use strict';

import * as angular from 'angular';

import ByProjectDailyReportGenerator from './byProjectDailyReportGenerator.service';
import ByProjectDailyReport from './byProjectDailyReportGenerator.directive';
import ReportController from './report.controller';

const reportModule = angular
	.module('reporter.report', [
		'ui.bootstrap',
		'reporter.toggl'
	])

	.service('byProjectDailyReportGenerator', ByProjectDailyReportGenerator)

	.directive('byProjectDailyReport', ByProjectDailyReport)

	.controller('reportController', ReportController);

export default reportModule;

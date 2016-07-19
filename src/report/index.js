'use strict';

import * as angular from 'angular';

import ByProjectDailyReportGenerator from './byProjectDailyReportGenerator.service';
import ReportController from './report.controller';

const reportModule = angular
	.module('reporter.report', ['reporter.toggl'])

	.service('byProjectDailyReportGenerator', ByProjectDailyReportGenerator)

	.controller('reportController', ReportController);

export default reportModule;

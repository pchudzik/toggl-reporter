'use strict';

import * as angular from 'angular';

import EntriesDurationCalculator from './entriesDurationCalculator.service';
import EntriesMerger from './entriesMerger.service';
import ByProjectDailyReportGenerator from './byProjectDailyReportGenerator.service';
import ByProjectDailyReport from './byProjectDailyReportGenerator.directive';
import ReportController from './report.controller';

const reportModule = angular
	.module('reporter.report', [
		'ui.bootstrap',
		'ngclipboard',
		'reporter.toggl'
	])

	.service('entriesDurationCalculator', EntriesDurationCalculator)
	.service('entriesMerger', EntriesMerger)
	.service('byProjectDailyReportGenerator', ByProjectDailyReportGenerator)

	.directive('byProjectDailyReport', ByProjectDailyReport)

	.controller('reportController', ReportController);

export default reportModule;

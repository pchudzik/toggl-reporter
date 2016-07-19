'use strict';

function ByProjectDailyReport() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'report/byProjectDailyReportGenerator.directive.html',
		scope: {
			reports: '='
		}
	};
}

export default ByProjectDailyReport;

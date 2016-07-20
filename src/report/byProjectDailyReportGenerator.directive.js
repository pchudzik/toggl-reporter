'use strict';

function directiveLink($scope) {
	$scope.generateDetailsElementId = (report) => `details-${report.project.id}`;
}

function ByProjectDailyReport() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'report/byProjectDailyReportGenerator.directive.html',
		scope: {
			reports: '='
		},
		link: directiveLink
	};
}

export default ByProjectDailyReport;

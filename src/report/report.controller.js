'use strict';

function ReportController($scope, togglEntriesService, byProjectDailyReportGenerator, moment) {
	$scope.reportGenerationInProgress = false;
	$scope.report = null;
	$scope.popup = {
		startDate: false,
		endDate: false
	};
	$scope.formData = {
		startDate: weekStart(),
		endDate: weekEnd()
	};
	$scope.toggleStartDatePopup = () => $scope.popup.startDate = !$scope.popup.startDate;
	$scope.toggleEndDatePopup = () => $scope.popup.endDate = !$scope.popup.endDate;
	$scope.generateReport = generateReport;

	function weekStart() {
		return moment()
			.startOf('week')
			.toDate();
	}

	function weekEnd() {
		return moment()
			.endOf('week')
			.add(1, 'd')
			.toDate();
	}

	function generateReport() {
		$scope.reportGenerationInProgress = true;

		togglEntriesService
			.getTimeLineEntries($scope.formData.startDate, $scope.formData.endDate)
			.then(byProjectDailyReportGenerator.generateReport)
			.then(report => $scope.report = report)
			.finally(() => $scope.reportGenerationInProgress = false);
	}
}

export default ReportController;

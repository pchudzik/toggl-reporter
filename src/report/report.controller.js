'use strict';

import _ from 'lodash';

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
	$scope.datePickerOptions = {
		startingDay: 1
	};
	$scope.toggleStartDatePopup = () => $scope.popup.startDate = !$scope.popup.startDate;
	$scope.toggleEndDatePopup = () => $scope.popup.endDate = !$scope.popup.endDate;
	$scope.generateReport = generateReport;

	function weekStart() {
		return moment()
			.startOf('week')
			.add(1, 'd')
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
			.then(report => $scope.totalEffort = calculateTotalEffort(report))
			.finally(() => $scope.reportGenerationInProgress = false);
	}

	function calculateTotalEffort(reports) {
		return _.chain(reports)
			.map('projectDuration')
			.reduce((result, duration) => result + duration, 0)
			.value() / 3600;
	}
}

export default ReportController;

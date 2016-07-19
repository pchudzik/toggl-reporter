function ReportController($scope, togglAuthService, togglEntriesService, byProjectDailyReportGenerator, moment) {
	$scope.reportGenerationInProgress = false;
	$scope.report = null;
	$scope.popup = {
		startDate: false,
		endDate: false
	};
	$scope.formData = {
		apiKey: togglAuthService.getApiKey(),
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
			.toDate();
	}

	function generateReport() {
		$scope.reportGenerationInProgress = true;
		console.log('generate report from ', $scope.formData.startDate, 'to', $scope.formData.endDate, 'using', $scope.formData.apiKey);

		togglAuthService.initialize($scope.formData.apiKey);
		togglEntriesService
			.getTimeLineEntries($scope.formData.startDate, $scope.formData.endDate)
			.then(byProjectDailyReportGenerator.generateReport)
			.then(report => $scope.report = report)
			.finally(() => $scope.reportGenerationInProgress = false);
	}
}

export default ReportController;

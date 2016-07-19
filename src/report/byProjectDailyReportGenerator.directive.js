function ByProjectDailyReport(moment) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'report/byProjectDailyReportGenerator.directive.html',
		scope: {
			reports: '='
		},
		link: $scope => {
			$scope.formatDate = date => moment(date).format('DD-MM-YYYY');
		}
	};
}

export default ByProjectDailyReport;

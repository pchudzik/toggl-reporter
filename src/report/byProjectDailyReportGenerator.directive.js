function ByProjectDailyReport() {
	return {
		restrict: 'E',
		replace: true,
		template: 'report/byProjectDailyReportGenerator.directive.html',
		scope: {
			report: '='
		}
	};
}

export default ByProjectDailyReport;

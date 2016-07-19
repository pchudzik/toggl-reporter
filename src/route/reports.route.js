function reportsRouteConfig($stateProvider) {
	$stateProvider
		.state('reports', {
			parent: 'root',
			url: '/reports',
			templateUrl: 'report/report.controller.html',
			controller: 'reportController'
		});
}

export default reportsRouteConfig;


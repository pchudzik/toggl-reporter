function configRoute($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/rpt/reports');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}

export default configRoute;

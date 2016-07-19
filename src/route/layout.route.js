function layoutRoute($stateProvider) {
	$stateProvider
		.state('root', {
			url: '/rpt',
			abstract: true,
			template: '<div ui-view></div>'
		});
}

export default layoutRoute;

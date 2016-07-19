import * as angular from 'angular';

import configRoute from './config.route';
import reportsRouteConfig from './reports.route';
import layoutRoute from './layout.route';

const routerModule = angular.module('reporter.route', ['ui.router'])
	.config(layoutRoute)
	.config(reportsRouteConfig)
	.config(configRoute);

export default routerModule;

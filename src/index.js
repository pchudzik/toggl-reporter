import angular from 'angular';

import './const';
import './commons';

angular.module('reporter', [
	'reporter.const',
	'reporter.commons'
]);

angular.bootstrap(document, ['reporter']);

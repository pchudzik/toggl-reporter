import * as angular from 'angular';

import HttpClient from './httpClient.service';

const commonsModule = angular
	.module('reporter.commons', ['reporter.const'])
	.service('httpClient', HttpClient);

export default commonsModule;

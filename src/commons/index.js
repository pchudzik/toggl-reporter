'use strict';

import * as angular from 'angular';

import Moment from './moment.service';
import Lodash from './lodash.service';
import HttpClient from './httpClient.service';

const commonsModule = angular
	.module('reporter.commons', ['reporter.const'])
	.service('httpClient', HttpClient)
	.service('moment', Moment)
	.service('_', Lodash);

export default commonsModule;

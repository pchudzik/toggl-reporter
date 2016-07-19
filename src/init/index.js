import * as angular from 'angular';

import ApiKeyModalPromptController from './apiKeyModalPrompt.controller';
import openApiKeyPrompt from './apiKeyPrompt.run';

const initModule = angular.module('reporter.init', [
	'ngCookies',
	'ui.bootstrap',
	'reporter.const'
]);

initModule
	.controller('apiKeyModalPromptController', ApiKeyModalPromptController)
	.run(openApiKeyPrompt);

export default initModule;

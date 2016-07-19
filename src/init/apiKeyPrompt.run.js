function openApiKeyPrompt(togglAuthService, $uibModal) {
	if (!togglAuthService.getApiKey()) {
		$uibModal.open({
			animation: true,
			keyboard: false,
			backdrop: 'static',
			templateUrl: 'init/apiKeyModalPrompt.controller.html',
			controller: 'apiKeyModalPromptController'
		})
			.result
			.then(togglAuthService.initialize);
	}
}

export default openApiKeyPrompt;

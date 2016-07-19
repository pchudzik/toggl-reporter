function ApiKeyModalPromptController($scope, $uibModalInstance) {
	$scope.formData = {
		apiKey: null
	};
	$scope.saveApiKey = () => $uibModalInstance.close($scope.formData.apiKey);
}

export default ApiKeyModalPromptController;

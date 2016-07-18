'use strict';

function TogglWorkspacesService(httpClient, togglAuthService, TOGGL_API) {

	return {
		getWorkspaces: getWorkspaces
	};

	function getWorkspaces() {
		return httpClient.httpGet(TOGGL_API.API_VERSION + '/workspaces', togglAuthService.authHttpOptions());
	}
}

export default TogglWorkspacesService;

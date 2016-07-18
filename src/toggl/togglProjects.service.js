'use strict';

function TogglProjectsService($q, httpClient, togglAuthService, togglWorkspacesService, _, TOGGL_API) {
	return {
		getProjects: getProjects
	};

	function getProjects() {
		return togglWorkspacesService
			.getWorkspaces()
			.then(workspaces => _.map(workspaces, fetchProjectsForWorkspace))
			.then($q.all)
			.then(_.flatten);
	}

	function fetchProjectsForWorkspace(workspace) {
		return httpClient
			.httpGet(getProjectsApiUrl(workspace.id), togglAuthService.authHttpOptions())
			.then(projects => assignWorkspaceToProjects(workspace, projects));
	}

	function assignWorkspaceToProjects(workspace, projects) {
		return _.map(
			projects,
			project => _.assign(project, {workspace: workspace}));
	}

	function getProjectsApiUrl(workspaceId) {
		return TOGGL_API.API_VERSION + '/workspaces/' + workspaceId + '/projects';
	}
}

export default TogglProjectsService;

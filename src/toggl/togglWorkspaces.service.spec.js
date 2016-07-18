'use strict';

import TogglWorkspaceService from './togglWorkspaces.service';

describe('togglWorkspaces.service.spec.js', () => {
	const togglAuth = {toggl: 'auth'};
	const TOGGL_API = {
		API_VERSION: '/v8'
	};

	let httpClientMock;
	let togglAuthServiceMock;

	let service;

	beforeEach(() => {
		httpClientMock = {
			httpGet: jasmine.createSpy('httpClient.httpGet')
		};
		togglAuthServiceMock = {
			authHttpOptions: jasmine.createSpy('togglAuthService.authHttpOptions').and.returnValue(togglAuth)
		};

		service = new TogglWorkspaceService(httpClientMock, togglAuthServiceMock, TOGGL_API);
	});

	it('should send request for workspaces', () => {
		//when
		service.getWorkspaces();

		//then
		expect(httpClientMock.httpGet).toHaveBeenCalledWith(TOGGL_API.API_VERSION + '/workspaces', togglAuth);
	});
});

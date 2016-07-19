'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import TogglProjectsService from './togglProjects.service';

describe('togglProjects.service.spec.js', () => {
	const togglAuth = {toggl: 'auth'};
	const TOGGL_API = {API_VERSION: '/v8'};
	const togglAuthService = {authHttpOptions: () => togglAuth};

	let $q;
	let $rootScope;
	let httpClientMock;
	let togglWorkspacesServiceMock;

	let projectsService;

	beforeEach(() => {
		angular.mock.inject((_$q_, _$rootScope_) => {
			$q = _$q_;
			$rootScope = _$rootScope_;
		});
		httpClientMock = {
			httpGet: jasmine.createSpy('httpClient.httpGet')
		};
		togglWorkspacesServiceMock = {
			getWorkspaces: jasmine.createSpy('togglWorkspaces.getWorkspaces')
		};

		projectsService = new TogglProjectsService($q, httpClientMock, togglAuthService, togglWorkspacesServiceMock, _, TOGGL_API);
	});

	it('should query for projects from all workspaces', () => {
		//given
		const URL_ARG_INDEX = 0;
		const HTTP_OPTIONS_ARG_INDEX = 1;
		const workspace1 = {id: 1};
		const workspace2 = {id: 2};
		const project1 = {id: 10, wid: 1};
		const project2 = {id: 11, wid: 2};
		togglWorkspacesServiceMock.getWorkspaces.and.returnValue($q.when([workspace1, workspace2]));
		httpClientMock.httpGet.and.returnValues($q.when([project1]), $q.when([project2]));

		//when
		projectsService.getProjects();
		$rootScope.$apply();

		//then
		const firstCallUrl = httpClientMock.httpGet.calls.argsFor(0)[URL_ARG_INDEX];
		const firstCallHttpOptions = httpClientMock.httpGet.calls.argsFor(0)[HTTP_OPTIONS_ARG_INDEX];
		const secondCallUrl = httpClientMock.httpGet.calls.argsFor(1)[URL_ARG_INDEX];
		const secondCallHttpOptions = httpClientMock.httpGet.calls.argsFor(1)[HTTP_OPTIONS_ARG_INDEX];

		expect(firstCallUrl).toEqual(TOGGL_API.API_VERSION + '/workspaces/' + workspace1.id + '/projects');
		expect(firstCallHttpOptions).toEqual(togglAuth);
		expect(secondCallUrl).toEqual(TOGGL_API.API_VERSION + '/workspaces/' + workspace2.id + '/projects');
		expect(secondCallHttpOptions).toEqual(togglAuth);
	});

	it('should assign workspaces to all projects', (done) => {
		//giveng
		const workspace = {id: 1};
		const project1 = {id: 10, wid: 1};
		const project2 = {id: 11, wid: 1};
		togglWorkspacesServiceMock.getWorkspaces.and.returnValue($q.when([workspace]));
		httpClientMock.httpGet.and.returnValue($q.when([project1, project2]));

		//when
		projectsService
			.getProjects()

			//then
			.then(projects => {
				expect(projects.length).toEqual(2);
				expect(projects[0]).toEqual({
					id: project1.id,
					wid: project1.wid,
					workspace: workspace
				});
				expect(projects[1]).toEqual({
					id: project2.id,
					wid: project2.wid,
					workspace: workspace
				});
				done();
			});

		$rootScope.$apply();
	});
});

'use strict';

import _ from 'lodash';
import * as angular from 'angular';
import moment from 'moment';

import TogglEntriesService from './togglEntries.service';

describe('togglEntries.service.spec.js', () => {
	const TOGGL_API = {
		API_VERSION: '/v8',
		DATE_FORMAT: 'YYYY-MM-DD'
	};
	const togglAuth = {headers: {toggl: 'auth'}};
	const togglAuthService = {authHttpOptions: _.constant(togglAuth)};

	let $q;
	let $rootScope;
	let httpClientMock;
	let togglProjectsServiceMock;

	let entriesService;

	beforeEach(() => {
		angular.mock.inject((_$q_, _$rootScope_) => {
			$q = _$q_;
			$rootScope = _$rootScope_;
		});
		httpClientMock = {
			httpGet: jasmine.createSpy('httpClient.httpGet')
		};
		togglProjectsServiceMock = {
			getProjects: jasmine.createSpy('togglProjectsService.getProjects')
		};

		entriesService = new TogglEntriesService($q, httpClientMock, togglProjectsServiceMock, togglAuthService, _, moment, TOGGL_API);
	});

	it('should format date for time line entries query', () => {
		//given
		const startDate = moment('2016-07-17');
		const endDate = moment('2016-07-19');

		//when
		entriesService.getTimeLineEntries(startDate, endDate);

		//then
		const url = httpClientMock.httpGet.calls.mostRecent().args[0];
		const options = httpClientMock.httpGet.calls.mostRecent().args[1];
		expect(url).toEqual(TOGGL_API.API_VERSION + '/time_entries');
		expect(options).toEqual({
			headers: togglAuth.headers,
			params: {
				start_date: '2016-07-17',
				end_date: '2016-07-19'
			}
		});
	});

	it('should assign project to each entry', (done) => {
		//given
		const anyDate = moment();
		const project1 = {id: 1};
		const project2 = {id: 2};
		const entry1 = {id: 10, pid: 1};
		const entry2 = {id: 11, pid: 2};
		httpClientMock.httpGet.and.returnValue($q.when([entry1, entry2]));
		togglProjectsServiceMock.getProjects.and.returnValue($q.when([project1, project2]));

		//when
		entriesService.getTimeLineEntries(anyDate, anyDate.add(1, 'd'))

		//then
			.then(entries => {
				expect(entries.length).toEqual(2);
				expect(entries[0]).toEqual({
					id: entry1.id,
					pid: entry1.pid,
					project: project1
				});
				expect(entries[1]).toEqual({
					id: entry2.id,
					pid: entry2.pid,
					project: project2
				});
				done();
			});

		$rootScope.$apply();
	});
});

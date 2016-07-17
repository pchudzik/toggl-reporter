'use strict';

import TogglAuthService from './togglAuth.service';
import moment from 'moment';
import TOGGL_COOKIE from '../const/togglCookie.const';

describe('togglAuth.service.spec.js', () => {
	const cookieToken = 'togglApiKey123';
	const now = moment('2016-07-17');
	const nowInTwoMonths = moment('2016-09-17');

	let cookieMock;
	let momentMock;

	beforeEach(() => {
		cookieMock = {
			get: jasmine.createSpy('$cookie.get'),
			put:jasmine.createSpy('$cookie.put')
		};
		momentMock = jasmine.createSpy('moment').and.returnValue(now);
	});

	it('should initialize service from cookie on start', () => {
		//when
		createService();

		//then
		expect(cookieMock.get).toHaveBeenCalledWith(TOGGL_COOKIE.COOKIE);
	});

	it('should load api key from cookie when available', () => {
		//given
		cookieMock.get.and.returnValue(cookieToken);

		//when
		const authService = createService();

		//then
		expect(authService.authHttpOptions()).toEqual(authorizationHeader(cookieToken));
	});

	it('should save token in cookie', () => {
		//given
		const apiToken = 'new toggl api token';
		const authService = createService();

		//when
		authService.initialize(apiToken);

		//then
		expect(cookieMock.put).toHaveBeenCalledWith(TOGGL_COOKIE.COOKIE, apiToken, {
			expires: nowInTwoMonths.toDate()
		});
	});

	it('should use cookie to initialize http headers', () => {
		//given
		const apiToken = 'toggl api token';
		const authService = createService();

		//when
		authService.initialize(apiToken);

		//then
		expect(authService.authHttpOptions()).toEqual(authorizationHeader(apiToken));
	});

	it('should throw exception when api key not initialized', () => {
		//when
		const service = createService();

		//expect
		expect(service.authHttpOptions).toThrow();
	});

	function createService() {
		return new TogglAuthService(cookieMock, momentMock, TOGGL_COOKIE);
	}

	function authorizationHeader(tokenKey) {
		const base64 = btoa(tokenKey + ':api_token');
		return {
			headers: {
				Authorization: 'Basic ' + base64
			}
		};
	}
});

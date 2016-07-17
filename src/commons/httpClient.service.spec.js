'use strict';

import * as angular from "angular";

describe('httpClient.service.spec.js', () => {
	let API_URL;
	let $httpBackend;
	let httpClient;

	beforeEach(() => {
		angular.mock.module('reporter.commons');
		angular.mock.inject((_$httpBackend_, _httpClient_, _API_URL_) => {
			API_URL = _API_URL_;
			$httpBackend = _$httpBackend_;
			httpClient = _httpClient_;
		})
	});

	afterEach(() => {
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should unwrap http response data', () => {
		//given
		const response = {response: 'data'};

		$httpBackend
			.expectGET(API_URL + '/get?param1=value1&param2=value2')
			.respond(202, response);

		//when
		httpClient
			.httpGet('/get', {param1: 'value1', param2: 'value2'})

			//then
			.then(resp => {
				expect(resp).toEqual(response);
			});

		$httpBackend.flush();
	});
});

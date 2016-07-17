'use strict';

import * as angular from 'angular';

describe('httpClient.service.spec.js', () => {
	let httpMock;
	beforeEach(() => {
		angular.mock.inject($http => {
			httpMock = $http;
		})
	});

	it('should unwrap http response data', () => {
		expect(2+2).toEqual(5);
	});
});

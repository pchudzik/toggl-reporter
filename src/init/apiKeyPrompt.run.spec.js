'use strict';

import * as angular from 'angular';
import apiKeyPrompt from './apiKeyPrompt.run';

describe('apiKeyPrompt.run.spec.js', () => {
	const apiKey = 'toggl api key 1234 abcd';

	let $q;
	let $rootScope;
	let modalMock;
	let togglAuthService;

	beforeEach(() => {
		angular.mock.inject((_$q_, _$rootScope_) => {
			$q = _$q_;
			$rootScope = _$rootScope_;
		});
		modalMock = {
			open: jasmine.createSpy('$uibModal').and.callFake(() => {
				return {
					result: $q.when(apiKey)
				};
			})
		};
		togglAuthService = {
			getApiKey: jasmine.createSpy('togglAuthService.getApiKey'),
			initialize: jasmine.createSpy('togglAuthService.initialize')
		};
	});

	describe('modal show behaviour', () => {
		it('should show key prompt when toggl api key not yet initialized', () => {
			//when
			triggerPrompt();

			//then
			expect(modalMock.open).toHaveBeenCalled();
		});

		it('should skip key prompt when toggl api key already initialized', () => {
			//given
			togglAuthService.getApiKey.and.returnValue(apiKey);

			//when
			triggerPrompt();

			//then
			expect(modalMock.open).not.toHaveBeenCalled();
		});
	});

	it('should close modal with api key', () => {
		//given
		triggerPrompt();

		//when
		$rootScope.$apply();

		//then
		expect(togglAuthService.initialize).toHaveBeenCalledWith(apiKey);
	});

	it('should be impossible to dismiss modal other than save', () => {
		//when
		triggerPrompt();

		//then
		expect(modalMock.open).toHaveBeenCalled();
		const modalMockArgs = modalMock.open.calls.mostRecent().args[0];
		expect(modalMockArgs.keyboard).toEqual(false);
		expect(modalMockArgs.backdrop).toEqual('static');
	});

	function triggerPrompt() {
		apiKeyPrompt(togglAuthService, modalMock);
	}
});

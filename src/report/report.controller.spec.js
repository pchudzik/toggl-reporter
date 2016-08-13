'use strict';

import * as angular from 'angular';
import moment from 'moment';
import ReportController from './report.controller';


describe('report.controller.spec.js', () => {
	const now = moment('2016-07-19');
	const weekStart = moment('2016-07-18T00:00:00');
	const weekEnd = moment('2016-07-24T23:59:59');

	const timeLineEntries = ['entry1', 'entry2'];
	const generatedReport = {report: 'generated report'};

	let $q;
	let $rootScope;
	let scope;
	let momentMock;
	let togglEntriesServiceMock;
	let byProjectDailyReportGeneratorMock;

	beforeEach(() => {
		angular.mock.inject((_$q_, _$rootScope_) => {
			$q = _$q_;
			$rootScope = _$rootScope_;
		});
		scope = $rootScope.$new();
		momentMock = jasmine.createSpy('moment').and.callFake(() => moment(now));
		togglEntriesServiceMock = {
			getTimeLineEntries: jasmine
				.createSpy('togglEntriesServiceg.etTimeLineEntries')
				.and
				.callFake(() => $q.when(timeLineEntries))
		};
		byProjectDailyReportGeneratorMock = {
			generateReport: jasmine
				.createSpy('byProjectDailyReportgenerator.generateReport')
				.and
				.callFake(() => $q.when(generatedReport))
		};
	});
	
	it('should initialize date range to beginning and end of current week', () => {
		//when
		createController();

		//then
		const startDate = moment(scope.formData.startDate).format();
		const endDate = moment(scope.formData.endDate).format();

		//and
		expect(startDate).toEqual(weekStart.format());
		expect(endDate).toEqual(weekEnd.format());
	});

	it('should toggle report form when report generation in progress', () => {
		//when
		createController();

		//then
		expect(scope.reportGenerationInProgress).toEqual(false);

		//when
		scope.generateReport();

		//then
		expect(scope.reportGenerationInProgress).toEqual(true);

		//when
		$rootScope.$apply();

		//then
		expect(scope.reportGenerationInProgress).toEqual(false);
	});

	it('should show report form when report generation failed', () => {
		//given
		togglEntriesServiceMock.getTimeLineEntries.and.callFake(() => $q.reject('error'));

		//when
		createController();

		//then
		expect(scope.reportGenerationInProgress).toEqual(false);

		//when
		scope.generateReport();

		//then
		expect(scope.reportGenerationInProgress).toEqual(true);

		//when
		$rootScope.$apply();

		//then
		expect(scope.reportGenerationInProgress).toEqual(false);
		expect(byProjectDailyReportGeneratorMock.generateReport).not.toHaveBeenCalled();
	});

	it('should fetch entries from selected date range', () => {
		//given
		createController();

		//when
		scope.generateReport();

		//then
		const timeLineEntriesCall = togglEntriesServiceMock.getTimeLineEntries.calls.mostRecent();
		expect(togglEntriesServiceMock.getTimeLineEntries.calls.count()).toEqual(1);
		expect(togglEntriesServiceMock.getTimeLineEntries).toHaveBeenCalled();
		expect(moment(timeLineEntriesCall.args[0]).format()).toEqual(weekStart.format());
		expect(moment(timeLineEntriesCall.args[1]).format()).toEqual(weekEnd.format());
	});

	it('should save generated report in scope', () => {
		//given
		createController();

		//when
		scope.generateReport();
		$rootScope.$apply();

		//then
		expect(byProjectDailyReportGeneratorMock.generateReport).toHaveBeenCalledWith(timeLineEntries);
		expect(scope.report).toEqual(generatedReport);
	});

	it('should calculate total effort from selected time range', () => {
		//given
		const reports = [
			{projectDuration: 1 * 3600},
			{projectDuration: 2 * 3600},
			{projectDuration: 3 * 3600},
		];
		byProjectDailyReportGeneratorMock.generateReport.and.returnValue($q.when(reports));
		createController();

		//when
		scope.generateReport();
		$rootScope.$apply();

		//then
		expect(scope.totalEffort).toEqual((reports[0].projectDuration + reports[1].projectDuration + reports[2].projectDuration)/3600);
	});
	
	function createController() {
		return new ReportController(
			scope,
			togglEntriesServiceMock,
			byProjectDailyReportGeneratorMock,
			momentMock);
	}
});

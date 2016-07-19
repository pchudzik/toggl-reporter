'use strict';

import _ from 'lodash';
import moment from 'moment';

import ByProjectDailyReportGenerator from './byProjectDailyReportGenerator.service';

describe('byProjectDailyReportGenerator.service.spec.js', () => {
	const anyDuration = 90;
	const anyDate = '2016-07-16T08:24:12';
	const anyDateRounded = '2016-07-16T00:00:00';

	let generator;

	beforeEach(() => {
		generator = new ByProjectDailyReportGenerator(_, moment);
	});

	describe('report format', () => {
		it('should group entries daily and sort by date', () => {
			//given
			const projectId = 1;
			const sunday = moment('2016-07-17T08:02:17').format();
			const monday = moment('2016-07-18T10:34:33').format();
			const entry1Sunday = entry(1, projectId, anyDuration, sunday);
			const entry2Sunday = entry(2, projectId, anyDuration, sunday);
			const entry1Monday = entry(10, projectId, anyDuration, monday);
			const entry2Monday = entry(11, projectId, anyDuration, monday);

			//when
			const report = generator.generateReport([entry1Monday, entry1Sunday, entry2Monday, entry2Sunday]);

			//then
			expect(report.length).toEqual(1);
			expect(JSON.stringify(report[0], null, 2)).toEqual(JSON.stringify({	//stringify it to avoid moment dates comparision issues
				project: {id: projectId},
				projectDuration: entry1Sunday.duration + entry2Sunday.duration + entry1Monday.duration + entry2Monday.duration,
				entries: [
					{
						date: moment('2016-07-17T00:00:00').format(),
						activities: [entry1Sunday, entry2Sunday],
						duration: entry1Sunday.duration + entry2Sunday.duration
					},
					{
						date: moment('2016-07-18T00:00:00').format(),
						activities: [entry1Monday, entry2Monday],
						duration: entry1Monday.duration + entry2Monday.duration
					}
				]
			}, null, 2));
		});

		it('should group entries by project', () => {
			//given
			const entry1 = entry(1, 10);
			const entry2 = entry(2, 10);
			const entry3 = entry(2, 20);

			//when
			const report = generator.generateReport([entry1, entry2, entry3]);

			//then
			expect(report.length).toEqual(2);
			expect(JSON.stringify(report, null, 2)).toEqual(JSON.stringify([
				{
					project: {id: 10},
					projectDuration: entry1.duration + entry2.duration,
					entries: [
						{
							date: moment(anyDateRounded).format(),
							activities: [entry1, entry2],
							duration: entry1.duration + entry2.duration
						}
					]
				},
				{
					project: {id: 20},
					projectDuration: entry3.duration,
					entries: [
						{
							date: moment(anyDateRounded).format(),
							activities: [entry3],
							duration: entry3.duration
						}
					]
				}
			], null, 2));
		});
	});

	it('should calculate total project duration', () => {
		//given
		const projectId = 10;
		const entry1 = entry(1, projectId, 10);
		const entry2 = entry(2, projectId, 20);
		const entry3 = entry(3, projectId, 30);

		//when
		const report = generator.generateReport([entry1, entry2, entry3]);

		//then
		expect(report.length).toEqual(1);
		expect(report[0].projectDuration).toEqual(entry1.duration + entry2.duration + entry3.duration);
	});

	it('should calculate daily effort', () => {
		const projectId = 1;
		const sunday = moment('2016-07-17T08:02:17').format();
		const monday = moment('2016-07-18T10:34:33').format();
		const entry1Sunday = entry(1, projectId, 10, sunday);
		const entry2Sunday = entry(2, projectId, 20, sunday);
		const entry1Monday = entry(10, projectId, 30, monday);
		const entry2Monday = entry(11, projectId, 40, monday);

		//when
		const report = generator.generateReport([entry1Sunday, entry2Sunday, entry1Monday, entry2Monday]);

		//then
		expect(report.length).toEqual(1);
		expect(report[0].entries[0].duration).toEqual(entry1Sunday.duration + entry2Sunday.duration);
		expect(report[0].entries[1].duration).toEqual(entry1Monday.duration + entry2Monday.duration);
	});

	function entry(id, projectId, duration, startDate) {
		return {
			id: id,
			pid: projectId,
			project: {
				id: projectId
			},
			duration: duration || anyDuration,
			start: moment(startDate || anyDate).format()
		};
	}
});

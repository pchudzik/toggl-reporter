'use strict';

import _ from 'lodash';
import EntriesDurationCalculator from './entriesDurationCalculator.service';
import EntriesMerger from './entriesMerger.service';

describe('entriesMerger.service.spec.js', () => {
	const anyProject = {id: 1, name: 'any project'};

	const merger = new EntriesMerger(_, new EntriesDurationCalculator(_));

	it('should merge entries by description', () => {
		//given
		const entry11 = entry('e1');
		const entry12 = entry('e1');
		const entry13 = entry('e1');
		const entry21 = entry('e2');
		const entry22 = entry('e2');

		//when
		const merged = merger.mergeEntriesByDescription([entry11, entry21, entry12, entry22, entry13]);

		//then
		expect(merged).toEqual([
			{
				description: 'e1',
				project: anyProject,
				duration: 0,
				entries: [entry11, entry12, entry13]
			},
			{
				description: 'e2',
				project: anyProject,
				duration: 0,
				entries: [entry21, entry22]
			},
		]);
	});

	it('should sum entries duration', () => {
		//given
		const entry11 = entry('e1', 10);
		const entry12 = entry('e1', 20);
		const entry21 = entry('e2', 100);
		const entry22 = entry('e2', 200);

		//when
		const merged = merger.mergeEntriesByDescription([entry11, entry12, entry21, entry22]);

		//then
		expect(merged[0].duration).toEqual(entry21.duration + entry22.duration);
		expect(merged[1].duration).toEqual(entry11.duration + entry12.duration);
	});

	it('should skip merge entries from different projects even if name is the same', () => {
		//given
		const entry1 = entry('e', 10, {id: 1});
		const entry2 = entry('e', 20, {id: 2});

		//when
		const merged = merger.mergeEntriesByDescription([entry1, entry2]);

		//then
		expect(merged).toEqual([entry2, entry1]);
	});

	it('should return input entries if all unique', () => {
		//given
		const entry1 = entry('e1');
		const entry2 = entry('e2');

		//when
		const merged = merger.mergeEntriesByDescription([entry2, entry1]);

		//then
		expect(merged).toEqual([entry1, entry2]);
	});

	it('should sort entries by duration desc, name asc', () => {
		//given
		const entry1 = entry('a', 10, {id:1});
		const entry2 = entry('a', 20, {id: 2});
		const entryA = entry('ea', 100);
		const entryB = entry('eb', 100);

		//when
		const merged = merger.mergeEntriesByDescription([entry1, entry2, entryA, entryB]);

		//then
		expect(merged).toEqual([entryA, entryB, entry2, entry1]);
	});

	function entry(description, duration, project) {
		return {
			description: description,
			duration: duration || 0,
			project: project || anyProject
		};
	}
});

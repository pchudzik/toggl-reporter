'use strict';

function EntriesMerger(_, entriesDurationCalculator) {
	return {
		mergeEntriesByDescription: mergeEntriesByDescription
	};

	function mergeEntriesByDescription(entries) {
		const entriesByDescription = _.groupBy(entries, entry => _.toLower(entry.project.id + entry.description));
		return _.chain(entriesByDescription)
			.reduce((result, entries) => {
				if (entries.length === 1) {
					return _.concat(result, entries);
				} else {
					const firstEntry = _.head(entries);
					return _.concat(result, {
						description: firstEntry.description,
						project: firstEntry.project,
						duration: entriesDurationCalculator.calculateTotalDuration(entries),
						entries: entries
					});
				}
			}, [])
			.flatten()
			.orderBy(['duration', 'description'], ['desc', 'asc'])
			.value();
	}
}

export default EntriesMerger;

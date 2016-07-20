'use strict';

function EntriesDurationCalculator(_) {
	return {
		calculateTotalDuration: totalDuration
	};

	function totalDuration(entries) {
		return _.reduce(
			entries,
			(result, entry) => result + entry.duration,
			0);
	}
}

export default EntriesDurationCalculator;

'use strict';

function ByProjectDailyReportGenerator(_, moment) {
	return {
		generateReport: generateReport
	};

	function generateReport(entries) {
		const projects = extractProjects(entries);
		const totalProjectDurations = calculateTotalProjectsDuration(entries);

		return _.reduce(projects, (result, project) => {
			const projectEntry = {
				project: project,
				projectDuration: totalProjectDurations['' + project.id],
				entries: activitiesByDayForProject(project, entries)
			};
			return _.concat(result, projectEntry);
		}, []);
	}

	function extractProjects(entries) {
		return _.chain(entries)
			.map(entry => entry.project)
			.uniqBy('id')
			.value();
	}

	function calculateTotalProjectsDuration(entries) {
		return _.reduce(entries, (result, entry) => {
			const projectId = entry.project.id;
			const oldDuration = _.get(result, projectId, 0);
			return _.set(result, projectId, oldDuration + entry.duration);
		}, {});
	}

	function activitiesByDayForProject(project, entries) {
		const entryDateFormat = 'DD-MM-YYYY';
		return _.chain(entries)
			.filter(entry => entry.pid === project.id)
			.reduce((result, entry) => {
				const entryDate = moment(entry.start).format(entryDateFormat);
				const entriesForDate = _.get(result, entryDate, []);
				return _.set(result, entryDate, _.concat(entriesForDate, entry));
			}, {})
			.map((entries, entryDate) => {
				return {
					date: roundToFullDay(moment(entryDate, entryDateFormat)).format(),
					activities: entries,
					duration: calculateDuration(entries)
				};
			})
			.sortBy('date')
			.value();
	}

	function calculateDuration(entries) {
		return _.reduce(
			entries,
			(result, entry) => result + entry.duration,
			0);
	}

	function roundToFullDay(entryDate) {
		return moment(entryDate).set({
			millisecond: 0,
			second: 0,
			minute: 0,
			hour: 0
		});
	}
}

export default ByProjectDailyReportGenerator;

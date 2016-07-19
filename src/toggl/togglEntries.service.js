'use strict';

function TogglEntriesService($q, httpClient, togglProjectsService, togglAuthService, _, moment, TOGGL_API) {
	const timeEntriesApiUrl = TOGGL_API.API_VERSION + '/time_entries';

	return {
		getTimeLineEntries: getTimeLineEntries,
	};

	function getTimeLineEntries(startDate, endDate) {
		const requestOptions = _.assign(
			{},
			togglAuthService.authHttpOptions(),
			{
				params: {
					start_date: formatDate(startDate),
					end_date: formatDate(endDate)
				}
			});

		return $q.all({
			entries: httpClient.httpGet(timeEntriesApiUrl, requestOptions),
			allProjects: togglProjectsService.getProjects()
		}).then(result => _.map(
			result.entries,
			entry => assignProjectToEntry(result.allProjects, entry)));
	}

	function assignProjectToEntry(allProjects, entry) {
		const entryProject = _.find(allProjects, {id: entry.pid});
		return _.assign(entry, {project: entryProject});
	}

	function formatDate(date) {
		return moment(date).format(TOGGL_API.DATE_FORMAT);
	}
}

export default TogglEntriesService;

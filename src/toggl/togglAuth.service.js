'use strict';

function TogglAuthService($cookies, moment, TOGGL_COOKIE) {
	let apiKey = null;

	initialize();

	return {
		getApiKey: () => apiKey,
		initialize: initialize,
		authHttpOptions: createAuthHttpOptions
	};

	function createAuthHttpOptions() {
		if(!apiKey) {
			throw 'toggl api key not initialized';
		}

		return {
			headers: {Authorization: 'Basic ' + btoa(apiKey + ':api_token')}
		};
	}

	function initialize(maybeApiKey) {
		if (maybeApiKey) {
			apiKey = maybeApiKey;
			$cookies.put(TOGGL_COOKIE.COOKIE, apiKey, {
				expires: apiKeyCookieExpiration()
			});
		} else {
			apiKey = $cookies.get(TOGGL_COOKIE.COOKIE);
		}
	}

	function apiKeyCookieExpiration() {
		return moment()
			.add(TOGGL_COOKIE.EXPIRE)
			.toDate();
	}
}

export default TogglAuthService;

'use strict';

function TogglAuthService($cookie, moment, TOGGL_COOKIE) {
	let apiKey = null;

	initialize();

	return {
		initialize: initialize,
		authHttpOptions: createAuthHttpOptions
	};

	function createAuthHttpOptions() {
		if(!apiKey) {
			throw "toggl api key not initialized";
		}

		return {
			headers: {Authorization: 'Basic ' + btoa(apiKey + ':api_token')}
		}
	}

	function initialize(maybeApiKey) {
		if (maybeApiKey) {
			apiKey = maybeApiKey;
			$cookie.put(TOGGL_COOKIE.COOKIE, apiKey, {
				expires: apiKeyCookieExpiration()
			});
		} else {
			apiKey = $cookie.get(TOGGL_COOKIE.COOKIE)
		}
	}

	function apiKeyCookieExpiration() {
		return moment()
			.add(TOGGL_COOKIE.EXPIRE)
			.toDate();
	}
}

export default TogglAuthService;

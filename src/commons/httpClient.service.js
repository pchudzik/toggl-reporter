'use strict';

function HttpClient($http, API_URL) {
	return {
		httpGet: httpGetWithOptions
	};

	function httpGetWithOptions(url, options) {
		return $http
			.get(API_URL + url, options)
			.then(res => res.data);
	}
}

export default HttpClient;

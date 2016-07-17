'use strict';

function HttpClient($http, API_URL) {
	return {
		httpGet: httpGet
	};

	function httpGet(url) {
		return $http
			.get(API_URL + url)
			.then(res => res.data);
	}
}

export default HttpClient;

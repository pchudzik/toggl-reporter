'use strict';

function HttpClient($http, API_URL) {
	return {
		httpGet: httpGet
	};

	function httpGet(url, options) {
		return $http
			.get(API_URL + url, {params: options || {}})
			.then(res => res.data);
	}
}

export default HttpClient;

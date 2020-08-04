/** @format */

const axios = require("axios");
const config = require("./config");
require("../../util/colors");

// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8;text/plain;";
axios.defaults.responseType = "json;text/plain;charset=utf-8;";

// let uURL = 'https:/u.y.qq.com/cgi-bin/musicu.fcg';

function request(url, method, options = {}) {
	return axios[method](url, options).then(
		(response) => {
			if (!response) {
				throw Error("response is null");
			}
			console.log(`${url} request success`.info);
			return response;
		},
		(error) => {
			console.log(`${url} request error`.error);
			throw error;
		}
	);
}

//module.exports = request;
module.exports = ({
	url,
	method = "get",
	options = {},
	hasCommonParams = true,
}) => {
	let commonParams = hasCommonParams ? config.commonParams : {};
	let opts = null,
		cUrl = /^https:\/\/c.y.qq.com\//,
		yUrl = /^https:\/\/y.qq.com\//;

	if (cUrl.test(url)) {
		opts = Object.assign(options, commonParams, {
			headers: {
				referer: "https://c.y.qq.com/",
				host: "c.y.qq.com",
			},
		});
	} else {
		opts = Object.assign(options, config.commonParams, {
			headers: {
				referer: "https://y.qq.com/portal/player.html",
				host: "u.y.qq.com",
				"content-type": "application/x-www-form-urlencoded",
			},
		});
	}
	//console.log(opts);
	return request(url, method, opts);
};

/** @format */

const { lyricParse } = require("../../util/lyricParse");
const moment = require("moment");
const request = require("./request");

module.exports = (
	params = {}
	//isFormat = true,
) => {
	const { id: songmid, isFormat } = params;
	const data = {
		songmid,
		format: "json",
		outCharset: "utf-8",
		pcachetime: moment().valueOf(),
	};
	const options = {
		params: data,
	};
	return request({
		url: "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
		method: "get",
		options,
	})
		.then((res) => {
			const lyricString =
				res.data &&
				res.data.lyric &&
				new Buffer.from(res.data.lyric, "base64").toString();
			const lyric = lyricParse(lyricString);
			const response = {
				...res.data,
				lyric,
			};
			return {
				status: 200,
				body: {
					response,
				},
			};
		})
		.catch((error) => {
			console.log("error", error);
			return {
				status: 500,
				body: {
					error,
				},
			};
		});
};

/** @format */
const request = require("./request");
const parseLyric = require("../../util/parseLyric");
// 歌词

module.exports = (query) => {
	//query.cookie.os = "pc";
	const data = {
		id: query.id,
		lv: -1,
		kv: -1,
		tv: -1,
	};
	return request("POST", `https://music.163.com/api/song/lyric`, data, {
		crypto: "weapi",
		cookie: query.cookie,
		proxy: query.proxy,
	}).then((response) => {
		const { status, body } = response;
		if (status !== 500) {
			return {
				status,
				body: {
					lyric: parseLyric(body.lrc.lyric),
				},
			};
		}
		return {
			status,
			body,
		};
	});
};

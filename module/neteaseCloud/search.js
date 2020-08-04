/** @format */

// 搜索
const request = require("./request");

const transformResponse = (response) => {
	return {
		hasMore: response.result.hasMore,
		songCount: response.result.songCount,
		songs: response.result.songs.map((song) => {
			return {
				id: song.id,
				name: song.name,
				artists: song.artists,
				album: song.album,
				pay: song.fee === 1,
			};
		}),
	};
};
module.exports = (query) => {
	const data = {
		s: query.keywords,
		type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
		limit: query.limit || 10,
		offset: query.offset ? (query.offset - 1) * (query.limit || 10) : 0,
	};
	return request("POST", `https://music.163.com/weapi/search/get`, data, {
		crypto: "weapi",
		cookie: query.cookie,
		proxy: query.proxy,
	}).then((response) => {
		const { status, body } = response;
		if (status !== 500) {
			return {
				status,
				body: {
					result: transformResponse(body),
					//body,
				},
			};
		}
		return {
			status,
			body,
		};
	});
};

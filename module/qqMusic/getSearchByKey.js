/** @format */

const request = require("./request");

const transformResponse = (response) => {
	return {
		songs: response.data.song.list.map((song) => ({
			id: song.mid,
			name: song.name,
			album: {
				id: song.album.mid,
				name: song.album.name,
			},
			artists: song.singer.map((singer) => ({
				id: singer.mid,
				name: singer.name,
			})),
			pay: song.pay.pay_play === 1,
		})),
		songCount: response.data.song.totalnum,
	};
};

module.exports = (params = {}) => {
	const { keywords: w, limit: n, offset: p, catZhida } = params;
	const data = {
		w,
		n: +n || 10,
		p: +p || 1,
		catZhida: +catZhida || 1,
		format: "json",
		outCharset: "utf-8",
		ct: 24,
		qqmusic_ver: 1298,
		new_json: 1,
		remoteplace: "txt.yqq.song",
		// searchid: 58932895599763136,
		t: 0,
		aggr: 1,
		cr: 1,
		lossless: 0,
		flag_qc: 0,
	};
	const options = {
		params: data,
	};
	return request({
		url: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
		method: "get",
		options,
	})
		.then((res) => {
			const response = res.data;
			//console.log(transformResponse(response));
			return {
				status: 200,
				body: {
					result: transformResponse(response),
					//result: response,
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

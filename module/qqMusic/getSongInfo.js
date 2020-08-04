/** @format */

//const { UCommon } = require("../../module");
//const { commonParams } = require("../../module/config");
const request = require("./request");

// songmid=001CLC7W2Gpz4J
module.exports = async (params = {}) => {
	const song_mid = params.id;
	const song_id = params.songid || "";

	const data = {
		format: "json",
		inCharset: "utf8",
		outCharset: "utf-8",
		notice: 0,
		platform: "yqq.json",
		needNewCode: 0,
		data: {
			comm: {
				ct: 24,
				cv: 0,
			},
			songinfo: {
				method: "get_song_detail_yqq",
				param: {
					song_type: 0,

					song_mid,
					song_id,
				},

				module: "music.pf_song_detail_svr",
			},
		},
	};
	const options = {
		params: data,
	};

	return request({
		url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
		method: "get",
		options,
	})
		.then((res) => {
			const response = res.data;
			console.log(response.toString());
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
				status: 400,
				body: {
					error,
				},
			};
		});
};

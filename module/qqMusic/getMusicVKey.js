/** @format */

//const { UCommon } = require("../../module");
const { _guid } = require("./config");
const request = require("./request");

// songmid=003rJSwm3TechU
module.exports = (params = {}) => {
	const songmid = params.id + "";
	const guid = _guid ? _guid + "" : "1429839143";
	const data = {
		req: {
			module: "CDN.SrfCdnDispatchServer",
			method: "GetCdnDispatch",
			param: {
				guid,
				calltype: 0,
				userip: "",
			},
		},
		req_0: {
			module: "vkey.GetVkeyServer",
			method: "CgiGetVkey",
			param: {
				guid,
				songmid: [songmid],
				songtype: [0],
				uin: "0",
				loginflag: 1,
				platform: "20",
			},
		},
		comm: {
			uin: 0,
			format: "json",
			ct: 24,
			cv: 0,
		},
	};
	/*
	const data = Object.assign({
		format: "json",
		data: JSON.stringify(data),
	});
	*/
	/*
	const props = {
		method: 'get',
		params,
		option: {},
	};
	*/
	const options = {
		params: {
			format: "json",
			data: JSON.stringify(data),
		},
	};
	//if (songmid) {
	return request({
		url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
		method: "get",
		options,
	})
		.then((res) => {
			const response = res.data;
			let playLists = [];
			const req_0 = response.req_0.data;
			req_0.sip.map((sipURL) => {
				const purl = req_0.midurlinfo[0].purl;
				const URI = `${sipURL}${purl}`;
				playLists.push(URI);
			});
			response.playLists = playLists;
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
	/*
	} else {
		ctx.status = 400;
		ctx.body = {
			response: 'no songmid',
		};
	}
	*/
};

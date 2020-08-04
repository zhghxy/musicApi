/** @format */

const { song_url } = require("../../module/neteaseCloud");
module.exports = async (ctx, next) => {
	const { status, body } = await song_url(ctx.query);
	console.log("test" + status);
	Object.assign(ctx, {
		status,
		body,
	});
};

/** @format */

const { song_detail } = require("../../module/neteaseCloud");
module.exports = async (ctx, next) => {
	const { status, body } = await song_detail(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

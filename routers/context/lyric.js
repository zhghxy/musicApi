/** @format */

const { lyric } = require("../../module/neteaseCloud");
module.exports = async (ctx, next) => {
	const { status, body } = await lyric(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

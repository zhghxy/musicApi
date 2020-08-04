/** @format */

const { getSongInfo } = require("../../module/qqMusic");
module.exports = async (ctx, next) => {
	const { status, body } = await getSongInfo(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

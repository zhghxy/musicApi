/** @format */

const { search } = require("../../module/neteaseCloud");
module.exports = async (ctx, next) => {
	const { status, body } = await search(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

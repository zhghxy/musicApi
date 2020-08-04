/** @format */

const { getMusicVKey } = require("../../module/qqMusic");
module.exports = async (ctx, next) => {
	const { status, body } = await getMusicVKey(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

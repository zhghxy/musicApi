/** @format */

const { getImageUrl } = require("../../module/qqMusic");
module.exports = (ctx, next) => {
	const { status, body } = getImageUrl(ctx.query);
	Object.assign(ctx, {
		status,
		body,
	});
};

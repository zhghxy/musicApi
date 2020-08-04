/** @format */

const { getSearchByKey } = require("../../module/qqMusic");
const { search } = require("../../module/neteaseCloud");

module.exports = async (ctx, next) => {
	let type = ctx.query.vendor || 0;
	try {
		if (type == 0) {
			const data = await getSearchByKey(ctx.query);
			Object.assign(ctx, data);
		} else {
			const data = await search(ctx.query);
			Object.assign(ctx, data);
		}
	} catch (error) {
		console.log(error);
		Object.assign(ctx, {
			status: 500,
			error,
		});
	}
};

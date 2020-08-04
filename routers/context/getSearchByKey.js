/** @format */

const { getSearchByKey } = require("../../module/qqMusic");

// w：搜索关键字
// p：当前页
// n：每页歌曲数量
// catZhida: 0表示歌曲, 2表示歌手, 3表示专辑, 4, 5
module.exports = async (ctx, next) => {
	if (ctx.query.keywords) {
		const { status, body } = await getSearchByKey(ctx.query);
		Object.assign(ctx, {
			status,
			body,
		});
	} else {
		ctx.status = 400;
		ctx.body = {
			response: "search key is null",
		};
	}
};

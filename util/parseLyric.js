/** @format */

module.exports = function parseLyric(lyric) {
	let arrLyric = lyric.split("\n");
	let res = [];
	arrLyric.forEach((lyr) => {
		const reg = lyr.match(/\[(\d*):(.*)\](.*)/);
		//console.log(reg);
		if (reg)
			res.push({
				time: parseInt(reg[1]) * 60000 + parseFloat(reg[2]) * 1000,
				txt: reg[3],
			});
	});
	return res;
};

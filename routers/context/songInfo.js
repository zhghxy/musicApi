/** @format */

const {
	getSongInfo: qqSongInfo,
	getImageUrl: qqImageUrl,
	getMusicVKey: qqMusicUrl,
	getLyric: qqLyric,
} = require("../../module/qqMusic");

const {
	song_detail: neteaseSongInfo,
	song_url: neteaseSongUrl,
	lyric: neteaseLyric,
} = require("../../module/neteaseCloud");
const getImageUrl = require("../../module/qqMusic/getImageUrl");

module.exports = async (ctx, next) => {
	let type = ctx.query.vendor || 0;
	try {
		if (type == 0) {
			let [info, music, lyric] = await Promise.all([
				qqSongInfo(ctx.query),
				qqMusicUrl(ctx.query),
				qqLyric(ctx.query),
			]);
			info = info.body.response.songinfo.data.track_info;
			let img = await getImageUrl({ id: info.album.mid });
			const data = {
				name: info.name,
				id: info.mid,
				musicUrl: music.body.response.playLists,
				album: {
					id: info.mid,
					name: info.name,
					imgUrl: img.body.response.data.imageUrl,
				},
				artists: info.singer.map((singer) => ({
					id: singer.mid,
					name: singer.name,
				})),
				lyric: lyric.body.response.lyric.lines,
			};
			Object.assign(ctx, {
				status: music.status,
				body: {
					result: data,
				},
			});
		} else {
			let [info, music, lyric] = await Promise.all([
				neteaseSongInfo(ctx.query),
				neteaseSongUrl(ctx.query),
				neteaseLyric(ctx.query),
			]);
			const data = {
				id: info.body.songs[0].id,
				musicUrl: music.body.data.map((data) => data.url),
				name: info.body.songs[0].name,
				album: {
					id: info.body.songs[0].al.id,
					name: info.body.songs[0].al.name,
					imgUrl: info.body.songs[0].al.picUrl,
				},
				artists: info.body.songs[0].ar,
				lyric: lyric.body.lyric,
			};
			Object.assign(ctx, {
				status: info.status,
				body: {
					result: data,
				},
			});
		}
	} catch (error) {
		console.log(error);
		Object.assign(ctx, {
			status: 500,
			error,
		});
	}
};

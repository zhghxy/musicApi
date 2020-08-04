/** @format */

const Router = require("koa-router");
const router = new Router();
const context = require("./context");

router.get(
	"/getSearchByKey/:keywords?/:limit?/:offset?/:catZhida?",
	context.getSearchByKey
);

// music
// getLyric
// songmid=003I86Ke2ZVu3g
router.get("/getLyric/:songmid?/:isFormat?", context.getLyric);
// getImageUrl
router.get("/getImageUrl", context.getImageUrl);
// getSongInfo
router.get("/getSongInfo/:songmid?/:songid?", context.getSongInfo);
// songmid=003I86Ke2ZVu3g
router.get("/getMusicVKey/:songmid?", context.getMusicVKey);

//neteaseCloud

router.get("/search/:keywords?/:type?/:limit?/:offset?", context.search);
router.get("/lyric/:id?", context.lyric);
router.get("/song_detail/:ids?", context.song_detail);
router.get("/song_url/:id?/:br?", context.song_url);

router.get("/songInfo/:id?/:vendor?", context.songInfo);
router.get(
	"/getSearch/:keywords?/:limit?/:offset?/:vendor?",
	context.getSearch
);

module.exports = router;

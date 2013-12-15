OneMatch.Preloader = function (game) {
	this.preloadBg = null;
	this.preloadLoad = null;
	this.timer = null;
};

OneMatch.Preloader.prototype = {

	preload: function () {
		this.preloadBg = this.add.sprite(0, 0, 'preloaderBg');
		this.preloadBg.centerOn(this.game.world.centerX, this.game.world.centerY);
		this.preloadLoad = this.add.sprite(0, 0, 'preloaderLoad');
		this.preloadLoad.centerOn(this.game.world.centerX, this.game.world.centerY);

		this.load.setPreloadSprite(this.preloadLoad);

		this.load.atlas('sprites', 'assets/playBtn.png', 'assets/playBtn.json');
		this.load.atlas('twitterBtn', 'assets/twitterBtn.png', 'assets/twitterBtn.json');
		this.load.atlas('music', 'assets/music.png', 'assets/music.json');
		this.load.image('match', 'assets/match.png');
		this.load.image('matchfire', 'assets/matchfire.png');
		this.load.image('wind', 'assets/wind.png');
		this.load.image('wind2', 'assets/wind2.png');
		this.load.image('fire', 'assets/fire.png');
		this.load.image('menuBg', 'assets/menu.png');
		this.load.image('winBg', 'assets/winBg.png');
		this.load.image('level', 'assets/level.png');
		this.load.audio('gamemusic', ['assets/audio/gamemusic.ogg', 'assets/audio/gamemusic.mp3']);
		this.load.audio('menumusic', ['assets/audio/menumusic.ogg', 'assets/audio/menumusic.mp3']);
		this.load.audio('winmusic', ['assets/audio/winmusic.ogg', 'assets/audio/winmusic.mp3']);

	},

	create: function () {
		this.preloadLoad.crop.width = 157;
		this.preloadLoad.cropEnabled = false;
		this.timer = this.game.time.now;
		fade = this.game.add.tween(this.preloadLoad)
        fade.to({ alpha: 0 }, 1000, null, true, 500)
		fadebg = this.game.add.tween(this.preloadBg)
        fadebg.to({ alpha: 0 }, 1000, null, true, 500)
	},

	update: function () {
		delay = this.game.time.now - this.timer;
		if(delay > 2000)
			this.game.state.start('MainMenu');
	},

};

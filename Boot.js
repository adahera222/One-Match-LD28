OneMatch = {};

OneMatch.Boot = function (game) {};

OneMatch.Boot.prototype = {

	preload: function () {
		this.load.image('preloaderLoad', 'assets/preloader-load.png');
		this.load.image('preloaderBg', 'assets/preloader-bg.png');
	},

	create: function () {
		this.game.state.add('Preloader', OneMatch.Preloader);
		this.game.state.add('MainMenu', OneMatch.MainMenu);
		this.game.state.add('Game', OneMatch.Game);
		this.game.state.add('Win', OneMatch.Win);

		this.game.input.maxPointers = 1;
		this.game.stage.disableVisibilityChange = true;

		this.game.state.start('Preloader');

	}

};

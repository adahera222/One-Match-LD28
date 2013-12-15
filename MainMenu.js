
OneMatch.MainMenu = function (game) {};

OneMatch.MainMenu.prototype = {

	create: function () {
 		this.background = this.add.sprite(0, 0, 'menuBg');
        this.music = this.add.audio('menumusic', 1, true);
        this.music.play('',0,1,true);
		fire = this.add.sprite(346, 174, 'matchfire');
		fire.anchor.setTo(0.5, 1);
		fire.angle = -20;
		lean = this.add.tween(fire);
	    lean.to({ angle: 30 }, 1000 + Math.random()*3000, Phaser.Easing.Linear.in, true, 10, true, true);
	    lean.repeat(100);
	    lean.start();
		this.playButton = this.add.button(0, 0, 'sprites', this.startGame, this, 'playIn', 'playOut');
		this.playButton.centerOn(this.game.world.centerX, this.game.world.centerY + 100);

		this.twitterButton = this.add.button(30, 100, 'twitterBtn', this.twitter, this, 'twitterIn', 'twitterOut');


		this.musicBtn = this.add.button(590, 20, 'music', this.musicSwitch, this, 'musicIn', (!this.sound.mute)?'musicOn':'musicOff');
	},

	twitter: function () {
		window.open("http://twitter.com/tannernetwork");
	},

	musicSwitch: function (){
		this.sound.mute = !this.sound.mute;
		this.musicBtn.setFrames('musicIn', (!this.sound.mute)?'musicOn':'musicOff');
	},

	startGame: function () {

        this.music.stop();
		this.game.state.start('Game');

	}

};

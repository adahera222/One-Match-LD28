
OneMatch.Win = function (game) {};

OneMatch.Win.prototype = {

	create: function () {
 		this.background = this.add.sprite(0, 0, 'winBg');
        this.music = this.add.audio('winmusic', 1, true);
        this.music.play('',0,1,true);

		fire = this.add.sprite(this.world.centerX, 280, 'matchfire');
		fire.anchor.setTo(0.5, 1);
		fire.angle = -20;
		lean = this.add.tween(fire);
	    lean.to({ angle: 30 }, 1000 + Math.random()*3000, Phaser.Easing.Linear.in, true, 10, true, true);
	    lean.repeat(100);
	    lean.start();

	    this.musicBtn = this.add.button(590, 20, 'music', this.musicSwitch, this, 'musicIn', (!this.sound.mute)?'musicOn':'musicOff');
		this.twitterButton = this.add.button(this.world.centerX-110, 126, 'twitterBtn', this.twitter, this, 'twitterIn', 'twitterOut');

		this.playButton = this.add.button(0, 0, 'sprites', this.startGame, this, 'playIn', 'playOut');
		this.playButton.scale.setTo(0.4, 0.4);
		this.playButton.centerOn(170, 350);
	},

	twitter: function () {
		window.open("http://twitter.com/tannernetwork");
	},

	musicSwitch: function (){
		this.sound.mute = !this.sound.mute;
		this.musicBtn.setFrames('musicIn', (!this.sound.mute)?'musicOn':'musicOff');
	},

	startGame: function (pointer) {

        this.music.stop();
		this.game.state.start('Game');

	}

};

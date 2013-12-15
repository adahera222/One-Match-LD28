OneMatch.Game = function (game) {
    this.maxLifeTime = 25000;
    this.maxDistance = 30000;
};

OneMatch.Game.prototype = {

	create: function () {
        this.background = this.add.sprite(0, 0, 'level');

        this.enemiesGroup = this.add.group();
        this.fireGroup = this.add.group();

        this.progress = this.add.text(30, 20, "0%", { font: "32px Arial", fill: "#ff0044" });

        this.match = this.add.sprite(0, 0, 'match');
        this.match.anchor.setTo(0.5, 0.5);
        this.match.cropEnabled = true;

        this.lost = false;
        this.won = false;
        this.distanceLeft = this.maxDistance;
        this.lifeTimeLeft = this.maxLifeTime;
        this.game.stage.canvas.style.cursor = "none";
        this.music = this.add.audio('gamemusic', 1, true);
        this.music.play('',0,1,true);

        this.fire = this.add.sprite(0, 0, 'matchfire');
        this.fire.anchor.setTo(0.5, 1);
        this.fire.angle = -20;
	},

	update: function () {
        if(Math.ceil(this.time.now) % 2 == 0 && this.rnd.integerInRange(0,10) == 0){
            if(this.rnd.integerInRange(1, 100) < 90){
                enemy = this.enemiesGroup.create(this.world.width, this.rnd.integerInRange(0, this.world.height), 'wind2');
                enemy.body.velocity.x = this.rnd.integerInRange(-100,-1000);
            } else {
                enemy = this.fireGroup.create(this.world.width, this.rnd.integerInRange(0, this.world.height), 'fire');
                enemy.body.velocity.x = this.rnd.integerInRange(-500,-1000);
            }
        }
        this.lifeTimeLeft -= this.time.elapsed;
        this.distanceLeft -= this.time.elapsed;
        cropWidth = this.lifeTimeLeft/this.maxLifeTime*50;

        if(!this.physics.overlap(this.match, this.enemiesGroup, this.hurt, null, this)){
            this.fire.angle = this.rnd.integerInRange(-20, -10);
        }
        this.physics.overlap(this.match, this.fireGroup, this.heal, null, this);

        this.match.crop.x = 50 - cropWidth;
        this.match.crop.width = cropWidth;
        percentComplete = Math.ceil((this.maxDistance-this.distanceLeft)/this.maxDistance*100);
        percentComplete = (percentComplete <= 100) ? percentComplete : 100;

        this.background.x = - 860 * ((this.maxDistance-this.distanceLeft)/this.maxDistance);

        this.progress.setText(percentComplete+"%");
        if(this.lost){
            this.quitGame();
        }
        if(this.won){
            this.winGame();
        }
        if(this.lifeTimeLeft < 0){
            this.lost = true;
        } else if(percentComplete == 100){
            this.won = true;
        }
        this.physics.moveToPointer(this.match, null, this.input.activePointer, 50);
        this.fire.x = this.match.x + cropWidth / 2;
        this.fire.y = this.match.y + 2;
	},

    hurt: function () {
        this.lifeTimeLeft -= 250;
        this.fire.angle = -40;
    },

    heal: function () {
        this.lifeTimeLeft += 500;
        this.fire.angle = -5;
    },

    winGame: function () {
        this.music.stop();
        this.game.stage.canvas.style.cursor = "default";
        this.game.state.start('Win');
    },

	quitGame: function () {
        this.music.stop();
        this.game.stage.canvas.style.cursor = "default";
		this.game.state.start('MainMenu');
	}

};

//defining special objects

//BOMB
var Bomb = function(x, y) {
	Sprite.call(this);
	this.index = 1;
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.timer = 25;
	this.image = Textures.load("images/bomb.png");
};
Bomb.prototype = Object.create(Sprite.prototype);
Bomb.prototype.detonate = function() {
	
	if (text != null) text.text = ("Now use the 'E' key to build some bridges across that pit before this guy jumps!");
	
	for (var i = 0; i < walls.length; i++) {
		if (walls[i].x >= this.x - 32 && walls[i].x <= this.x + 32 && walls[i].y >= this.y - 32 && walls[i].y <= this.y + 32) {
			world.removeChild(walls[i]);
			walls.splice(i, 1);
			i--;
		}
	}
	explosion = new Sprite();
	explosion.x = this.x-48;
	explosion.y = this.y-48;
	explosion.width = 128;
	explosion.height = 128;
	explosion.image = Textures.load("images/explosion.png");
	explosion.index = 0;
	explosion.timer = 25;
	world.addChild(explosion);
	
	console.log(explosion);
	
	laserupdate(0);
	laserupdate(1);
	laserupdate(2);
	laserupdate(3);
	if (dudeInVicinity(this.x, this.y)) {
		gameOver();
	}
	world.removeChild(this);
	bomb = null;
};
//BRIDGE
var Bridge = function(x, y) {
	Sprite.call(this);
	this.index = 5;
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.image = Textures.load("http://i.imgur.com/aN3i4MU.png");
};
Bridge.prototype = Object.create(Sprite.prototype);
//LASER
var Laser = function(x, y, dir) {
	Sprite.call(this);
	this.index = 1;
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.image = Textures.load("http://i.imgur.com/U8DNnZa.png");

	this.frameWidth = 200;
	this.frameHeight = 200;
	this.frameCount = 8;
	this.frameRate = 12;
	this.addAnimations(["horz", "vert"], [4, 4]);
	if (dir == 0 || dir == 2) {
		this.animation = "vert";
	} else
		this.animation = "horz";
};
Laser.prototype = Object.create(Sprite.prototype);
//TRAP
var Trap = function(x,y) {
	Sprite.call(this);
	this.index = 2;
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.image = Textures.load("images/trap.png");
};
Trap.prototype = Object.create(Sprite.prototype);
var attractor = function(x, y) {
	Sprite.call(this);
	this.index = 1;
	this.x = x;
	this.y = y;
	this.width = 32;
	this.height = 32;
	this.image = Textures.load("images/attractor.png");
};
attractor.prototype = Object.create(Sprite.prototype);
attractor.prototype.remove = function() {
	world.removeChild(this);
	console.log("hue");
	for (var k = 0; k < attractors.length; k++) {
		if (attractors[k] == this) attractors.splice(k, 1);
	}
};

attractor.prototype.calcturn = function() {
	var newturn = false;
	var gotdist;
	console.log("dude's dir is :" + theDude.dir);
	console.log("step initial");
	if (theDude.x == this.x) {
		console.log("step I1");
		if ((this.y < theDude.y) && (theDude.dir == 0)) {	
			console.log("step I2");
			arrow.y = randomIntFromInterval(this.y, getDist(theDude.x, theDude.y, 0));
			arrow.y = arrow.y - arrow.y % 32;
			setTurnDir(0);
			//newturn = true;
		} else if ((this.y > theDude.y) && (theDude.dir == 2)){
			console.log("step I3");
			arrow.y = randomIntFromInterval(this.y, getDist(theDude.x, theDude.y, 2));
			arrow.y = arrow.y - arrow.y % 32;
			setTurnDir(2);
			//newturn = true;
		}
	}else if (theDude.y == this.y) {
		console.log("step I4");
		if ((this.x > theDude.x) && (theDude.dir == 1)) {
			console.log("step I5");
			arrow.x = randomIntFromInterval(this.x, getDist(theDude.x, theDude.y, 1));
			arrow.x = arrow.x - arrow.x % 32;
			setTurnDir(1);
			//newturn = true;
		} else if ((this.x < theDude.x) && (theDude.dir == 3)){
			console.log("step I6");
			arrow.x = randomIntFromInterval(this.x, getDist(theDude.x, theDude.y, 3));
			arrow.x = arrow.x - arrow.x % 32;
			setTurnDir(3);
			//newturn = true;
		}
	} else switch (theDude.dir) {
		case 0: 
		console.log("step 0");
		if (this.y < theDude.y) {
			console.log("step 1");
			gotdist = getDist(theDude.x, theDude.y, 0);
			if (gotdist < this.y) {
				console.log("step 2");
				if (this.x > theDude.x) {
					console.log("step 3");
					gotdist = getDist(theDude.x, this.y, 1);
					if (gotdist > this.x) {
						console.log("step 4");
						arrow.x = theDude.x - theDude.x % 32;
						arrow.y = this.y;
						arrow.dir = 1;
						newturn = true;
					}
				} else {
					console.log("step 5");
					gotdist = getDist(theDude.x, this.y, 3);
					if (gotdist < this.x) {
						console.log("step 6");
						arrow.x = theDude.x - theDude.x % 32;
						arrow.y = this.y;
						arrow.dir = 3;
						newturn = true;
					}
				}
			}
		}
		break;
		case 1:
		console.log("step 6.5");
		console.log("this.x = " + this.x + "theDude.x = " + theDude.x);
		if (this.x > theDude.x) {
			console.log("step 7");
			gotdist = getDist(theDude.x, theDude.y, 1);
			if (gotdist > this.x) {
				console.log("step 8");
				if (this.y < theDude.y) {
					console.log("step 9");
					gotdist = getDist(this.x, theDude.y, 0);
					if (gotdist < this.y) {
						arrow.x = this.x;
						arrow.y = theDude.y - theDude.y % 32;
						arrow.dir = 0;
						newturn = true;
					}
				} else {
					console.log("step 10");
					gotdist = getDist(this.x, theDude.y, 2);
					if (gotdist > this.y) {
						console.log("step 11");
						arrow.x = this.x;
						arrow.y = theDude.y - theDude.y % 32;
						arrow.dir = 2;
						newturn = true;
					}
				}
			}
		}
		break;
		case 2:
		console.log("step 11.5");
		if (this.y > theDude.y) {
			console.log("step 12");
			gotdist = getDist(theDude.x, theDude.y, 2);
			if (gotdist > this.y) {
				console.log("step 13");
				if (this.x > theDude.x) {
					console.log("step 14");
					gotdist = getDist(theDude.x, this.y, 1);
					if (gotdist > this.x) {
						console.log("step 15");
						arrow.x = theDude.x - theDude.x % 32;
						arrow.y = this.y;
						arrow.dir = 1;
						newturn = true;
					}
				} else {
					console.log("step 16");
					gotdist = getDist(theDude.x, this.y, 3);
					if (gotdist < this.x) {
						console.log("step 17");
						arrow.x = theDude.x - theDude.x % 32;
						arrow.y = this.y;
						arrow.dir = 3;
						newturn = true;
					}
				}
			}
		}
		break;
		case 3:
		console.log("step 18");
		if (this.x < theDude.x) {
			console.log("step 19");
			gotdist = getDist(theDude.x, theDude.y, 3);
			if (gotdist < this.x) {
				console.log("step 20");
				if (this.y < theDude.y) {
					console.log("step 21");
					gotdist = getDist(this.x, theDude.y, 0);
					if (gotdist < this.y) {
						console.log("step 22");
						arrow.x = this.x;
						arrow.y = theDude.y - theDude.y % 32;
						arrow.dir = 0;
						newturn = true;
					}
				} else {
					console.log("step 22");
					gotdist = getDist(this.x, theDude.y, 2);
					if (gotdist > this.y) {
						console.log("step 23");
						arrow.x = this.x;
						arrow.y = theDude.y - theDude.y % 32;
						arrow.dir = 2;
						newturn = true;
					}
				}
			}
		}
		break;
		default:
		console.log("no dir");
		break;
	}
	if (newturn == true) console.log("set new turn");
};

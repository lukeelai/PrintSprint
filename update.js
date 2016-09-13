//object update functions

theDude.update = function(d) {
	if (runtime) {
		if (this.moving) {
			switch (this.dir) {
			case 0:
				this.y -= playerSpeed;
				theDude.animation = "back";
				break;
			case 1:
				this.x += playerSpeed;
				theDude.animation = "right";
				break;
			case 2:
				this.y += playerSpeed;
				theDude.animation = "front";
				break;
			case 3:
				this.x -= playerSpeed;
				theDude.animation = "left";
				break;
			default:
				console.log("direction is invalid");
				break;
			}
		}
		else {
			this.timer--;
			if (this.timer <= 0) {
				this.moving = true;
				this.timer = 200;
				//remove active trap that was transferred to theDude with dudeGotUpgrade()
				world.removeChild(this.trap);
				this.trap = null;
			}
		}
		if (theDude.x % 32 == 0 && theDude.y % 32 == 0 && this.moving) {
			
			//get trap, then check if null or not in long condition
			this.trap = getTrapAtDude();
			dudeInattractor();
			if (dudeGotUpgrade() == true) {
				changeInk(128);
			}
			if (dudeInPit() == true) {
				gameOver();
			} else if (dudeInLaser() == true) {
				gameOver();
			} else if (this.trap != null) {
				theDude.moving = false;
			} else if (this.x == end.x && this.y == end.y) {
				changeLevel();
			} else if (this.x == arrow.x && this.y == arrow.y) {
				snapToClosestBlock(this);
				this.dir = arrow.dir;
				setTurn(this.x, this.y, this.dir);
			}
		}
	}
};

arrow.update = function(d) {
	if (runtime) {
		switch (this.dir) {
		case 0:
			this.frame = 3;
			break;
		case 1:
			this.frame = 0;
			break;
		case 2:
			this.frame = 1;
			break;
		case 3:
			this.frame = 2;
			break;
		default:
			break;
		}
	}
};

manager.update = function(d) {
	selection.x = 56;
	selection.y = 110 + (placing * 56);
	for (var i = 0; i < placementArray.length; i++) {
		placementArray[i].x = 64;
		placementArray[i].y = 118 + (i*56);	
	}
	for (var i = 0; i < buildArray.length; i++) {
		buildArray[i].x = 64;
		buildArray[i].y = 438 + (i*56);
	}
	if (runtime) {
		//inkFill.width=((currInk/maxInk[levelnum])*100);
		if (gInput.one && !gInput.two && !gInput.three) {
			placing = 0;
			console.log("place array pos is one");
		}
		else if (!gInput.one && !gInput.two && gInput.three) {
			placing = 2;
			console.log("place array pos is three");
		}
		else if (!gInput.one && gInput.two && !gInput.three) {
			placing = 1;
			console.log("place array pos is two");
		}
		else if(gInput.paused)
			pause();
		if (bomb != null) {
			bomb.timer--;
			if (bomb.timer <= 0) {
				bomb.detonate();
			}
		}
		if (explosion != null) {
			explosion.timer--;
			if (explosion.timer <=0) {
				world.removeChild(explosion);
				explosion = null;
			}
		}
		
		if (placementArray[placing] != null) {
			placementArray[placing].x = gInput.mouse.x-16;
			placementArray[placing].y = gInput.mouse.y-16;
		}
	}
};

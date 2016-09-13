//helper functions
function placeObj(x, y, objName) {
	var obj = new Sprite();
	obj.x = x - (x % 32);
	obj.y = y - (y % 32);
	obj.width = 32;
	obj.height = 32;
	snapToClosestBlock(obj);
	switch(objName) {
	case "wall":
		if ((runtime == false || !dudeInVicinity(x, y) || (theDude.moving == false && !dudeAt(obj.x,obj.y))) && !wallAt(obj.x, obj.y) && !laserBaseAt(obj.x, obj.y)) {
			obj.index = 4;
			obj.image = Textures.load("http://i.imgur.com/OYNQ3zP.png");
			walls.push(obj);
			world.addChild(obj);
			if (runtime == true) {
				checkTurn();
				laserupdate(0);
				laserupdate(1);
				laserupdate(2);
				laserupdate(3);
			}//Need to check if new wall is in character's way
			return true;
		} else
			return false;
		break;
	case "unbreakable":
		obj.index = 4;
		obj.image = Textures.load("http://i.imgur.com/yhmlxDR.png");
		unbreakables.push(obj);
		world.addChild(obj);
		break;
	case "laserup":
		obj.beams = new Array();
		obj.isfiring = false;
		obj.olddist = 0;
		obj.index = 4;
		obj.image = Textures.load("images/laserup.png");
		laserups.push(obj);
		world.addChild(obj);
		break;
	case "laserright":
		obj.beams = new Array();
		obj.isfiring = false;
		obj.olddist = 0;
		obj.index = 4;
		obj.image = Textures.load("images/laserright.png");
		laserrights.push(obj);
		world.addChild(obj);
		break;
	case "laserdown":
		obj.beams = new Array();
		obj.isfiring = false;
		obj.olddist = 0;
		obj.index = 4;
		obj.image = Textures.load("images/laserdown.png");
		laserdowns.push(obj);
		world.addChild(obj);
		break;
	case "laserleft":
		obj.beams = new Array();
		obj.isfiring = false;
		obj.olddist = 0;
		obj.index = 4;
		obj.image = Textures.load("images/laserleft.png");
		laserlefts.push(obj);
		world.addChild(obj);
		break;
	case "pit":
		obj.index = 6;
		obj.image = Textures.load("images/pit.png");
		pits.push(obj);
		world.addChild(obj);
		break;
	case "ink":
		obj.image = Textures.load("images/ink.png");
		inks.push(obj);
		world.addChild(obj);
		break;
	case "start":
		obj.index = 4;
		obj.image = Textures.load("images/start.png");
		start = obj;
		world.addChild(obj);
		break;
	case "end":
		obj.index = 4;
		obj.image = Textures.load("images/exit.png");
		end = obj;
		world.addChild(obj);
		break;
	case "bomb":
		if (bomb == null) {
			//inkCost=2;
			//if(currInk >= inkCost){
				//currInk -= inkCost;
				//console.log(currInk);
				obj = new Bomb(obj.x, obj.y);
				bomb = obj;
				world.addChild(obj);
				return true;
			//}
		} else
			return false;
		break;
	case "attractor":
		if ((!dudeInVicinity(x, y)) && !wallAt(obj.x, obj.y) && !laserBaseAt(obj.x, obj.y)) {
			obj = new attractor(obj.x, obj.y);
			world.addChild(obj);
			attractors.push(obj);
			obj.calcturn();
			return true;
			break;
		} else return false;
	case "bridge":
		var go = false;
		var stop = false;
		for (var i = 0; i < pits.length; i++) {
			if (obj.x == pits[i].x && obj.y == pits[i].y) {
				go = true;
				for (var i = 0; i < bridges.length; i++) {
					if (obj.x == bridges[i].x && obj.y == bridges[i].y) {
						stop = true;
						break;
					}
				}
				break;
			}
		}
		if (go == true && stop == false) {
			//inkCost=2;
			//if(currInk >= inkCost){
				//currInk -= inkCost;
				//console.log(currInk);
				obj = new Bridge(obj.x, obj.y);
				bridges.push(obj);
				world.addChild(obj);
				return true;
			//}
		} else
			return false;
		break;
	case "trap":
		if (!wallAt(obj.x, obj.y) && !laserBaseAt(obj.x, obj.y)) {
			obj = new Trap(obj.x, obj.y);
			traps.push(obj);
			world.addChild(obj);
			return true;
		}
		else 
			return false;
		break;
	default:
		break;
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function dudeInattractor() {
	for (var k = 0; k < attractors.length; k++) {
		if ((attractors[k].x == theDude.x) && (attractors[k].y == theDude.y)) attractors[k].remove();
	}
}

function wallAt(x, y) {
	for (var i = 0; i < walls.length; i++) {
		if (walls[i].x == x && walls[i].y == y) {
			return true;
		}
	}
	for (var i = 0; i < unbreakables.length; i++) {
		if (unbreakables[i].x == x && unbreakables[i].y == y) {
			return true;
		}
	}
	if (x >= canwidth || x < 0 || y >= canheight || y < 0) {
		return true;
	} else {
		return false;
	}
}

function getWallAt(x, y) {
	for (var i = 0; i < walls.length; i++) {
		if (walls[i].x == x && walls[i].y == y) {
			return walls[i];
		}
	}
	return null;
}

function laserAt(x, y) {
	for (var i = 0; i < laserups.length; i++) {
		for (var j = 0; j < laserups[i].beams.length; j++) {
			if (x == laserups[i].beams[j].x && y == laserups[i].beams[j].y) {
				return true;
			}
		}
	}
	for (var i = 0; i < laserdowns.length; i++) {
		for (var j = 0; j < laserdowns[i].beams.length; j++) {
			if (x == laserdowns[i].beams[j].x && y == laserdowns[i].beams[j].y) {
				return true;
			}
		}
	}
	for (var i = 0; i < laserlefts.length; i++) {
		for (var j = 0; j < laserlefts[i].beams.length; j++) {
			if (x == laserlefts[i].beams[j].x && y == laserlefts[i].beams[j].y) {
				return true;
			}
		}
	}
	for (var i = 0; i < laserrights.length; i++) {
		for (var j = 0; j < laserrights[i].beams.length; j++) {
			if (x == laserrights[i].beams[j].x && y == laserrights[i].beams[j].y) {
				return true;
			}
		}
	}
	return false;
}

function laserBaseAt(x, y) {
	for (var i = 0; i < laserups.length; i++) {
		if (x == laserups[i].x && y == laserups[i].y) {
			return true;
		}
	}
	for (var i = 0; i < laserdowns.length; i++) {
		if (x == laserdowns[i].x && y == laserdowns[i].y) {
			return true;
		}
	}
	for (var i = 0; i < laserlefts.length; i++) {
		if (x == laserlefts[i].x && y == laserlefts[i].y) {
			return true;
		}
	}
	for (var i = 0; i < laserrights.length; i++) {
		if (x == laserrights[i].x && y == laserrights[i].y) {
			return true;
		}
	}
	return false;
}

function dudeAt(x,y) {
	if (theDude.x == x && theDude.y == y) {
		return true;
	}
	else return false;
}

function dudeInVicinity(x, y) {
	if (Math.sqrt(Math.pow(theDude.x - x, 2) + Math.pow(theDude.y - y, 2)) < 64) {
		return true;
	} else
		return false;
}

function dudeInMoreVicinity(x, y) {
	if (Math.sqrt(Math.pow(theDude.x - x, 2) + Math.pow(theDude.y - y, 2)) < 32) {
		return true;
	} else
		return false;
}

function dudeInPit() {
	for (var i = 0; i < pits.length; i++) {
		if (theDude.x == pits[i].x && theDude.y == pits[i].y) {
			for (var i = 0; i < bridges.length; i++) {
				if (theDude.x == bridges[i].x && theDude.y == bridges[i].y) {
					return false;
				}
			}
			return true;
		}
	}
	return false;
}

function dudeInLaser() {
	if (laserAt(theDude.x, theDude.y)) {
		return true;
	} else
		return false;
}

function getTrapAtDude() {
	for (var i = 0; i < traps.length; i++) {
		if (theDude.x == traps[i].x && theDude.y == traps[i].y) {
			var temp = traps[i];
			traps.splice(i,1);
			return temp;
		}
	}
	return null;
}

function dudeGotUpgrade() {
	for (var i = 0; i < inks.length; i++) {
		if (theDude.x == inks[i].x && theDude.y == inks[i].y) {
			world.removeChild(inks[i]);
			inks.splice(i, 1);
			return true;
		}
	}
	return false;
}
//Keypress functions --------------------------------------------------------------------

function increaseSpeed() {
	if (playerSpeed < 32 && !dudeInMoreVicinity(arrow.x,arrow.y)) {
		playerSpeed = playerSpeed * 2;
		theDude.frameRate = theDude.frameRate * 2;
		snapToClosestBlock(theDude);
	}
}

function decreaseSpeed() {
	if (playerSpeed > 1) {
		playerSpeed = playerSpeed / 2;
		theDude.frameRate = theDude.frameRate / 2;
	}
}

function addBomb() {
	if (buildArray.length < 3) {
		var dummy = new Sprite();
		dummy.width = 32;
		dummy.height = 32;
		dummy.index = 1;
		dummy.image = Textures.load("images/bomb.png");
		dummy.name = "bomb";
		buildArray.push(dummy);
		world.addChild(dummy);
	}
}

function addBridge() {
	if (buildArray.length < 3) {
		var dummy = new Sprite();
		dummy.width = 32;
		dummy.height = 32;
		dummy.index = 1;
		dummy.image = Textures.load("http://i.imgur.com/aN3i4MU.png");
		dummy.name = "bridge";
		buildArray.push(dummy);
		world.addChild(dummy);
	}
}

function addWall() {
	if (buildArray.length < 3) {
		var dummy = new Sprite();
		dummy.width = 32;
		dummy.height = 32;
		dummy.index = 1;
		dummy.image = Textures.load("http://i.imgur.com/OYNQ3zP.png");
		dummy.name = "wall";
		buildArray.push(dummy);
		world.addChild(dummy);
	}
}

function addAttractor() {
	if (buildArray.length < 3) {
		var dummy = new Sprite();
		dummy.width = 32;
		dummy.height = 32;
		dummy.index = 1;
		dummy.image = Textures.load("images/attractor.png");
		dummy.name = "attractor";
		buildArray.push(dummy);
		world.addChild(dummy);
	}
}

function addTrap() {
	if (buildArray.length < 3) {
		var dummy = new Sprite();
		dummy.width = 32;
		dummy.height = 32;
		dummy.index = 1;
		dummy.image = Textures.load("images/trap.png");
		dummy.name = "trap";
		buildArray.push(dummy);
		world.addChild(dummy);
	}
}

//Keypress functions --------------------------------------------------------------------
function snapToClosestBlock(obj) {
	if (obj.x % 32 > 16) {
		obj.x += 32 - (obj.x % 32);
	} else {
		obj.x -= obj.x % 32;
	}
	if (obj.y % 32 > 16) {
		obj.y += 32 - (obj.y % 32);
	} else {
		obj.y -= obj.y % 32;
	}
}

function changeInk(changeAmount) {
	ink.amount += changeAmount;
	if (ink.amount < 0)
		ink.amount = 0;
	if (ink.amount > 512)
		ink.amount = 512;
	ink.width = ink.amount;
} 

//gamestate functions




//levels saved as strings

//var maxInk = [10,20];
//var currInk=0;
use2D = true;

var levelnum = -1;
loadLevel(levelnum);
init();
gameStart();



function loadLevel(levelnum) {
	/*if(levelnum == -1){
		start();		
	}*/
	if(levelnum == 17){
		credits();
	}
	else{
		var strlist = levels[levelnum].split(" ");
		var levelArray = new Array;
		var stritr = 0;
		for (var i = 0; i < canheight / 32; i++) {
			levelArray[i] = new Array;
			for (var j = 0; j < canwidth / 32; j++) {
				if (stritr >= strlist.length)
					levelArray[i][j] = "empty";
				else
					levelArray[i][j] = strlist[stritr];
				//if (levelArray[i][j] != "empty") console.log(levelArray[i][j] + " i is " + i + " j is " + j);
				stritr++;
			}
		}
		for (var i = 0; i < levelArray.length; i++) {
			for (var j = 0; j < levelArray[i].length; j++) {
				placeObj(j * 32, i * 32, levelArray[i][j]);
			}
		}
	}
	if (levelnum == 20) {
		for (var i = 0; i < 3; i++) {
			tuts[i] = new TextBox();
			tuts[i].fontSize = 20;
			tuts[i].x = 192;
			tuts[i].y = 64 + (32*i);
			tuts[i].drawBG = true;
			tuts[i].bgColor = "white";
			tuts[i].border = 2;
			world.addChild(tuts[i]);
		}
		tuts[0].text = ("This man is trying to escape our laser and bottomless pit factory. Keep him alive and guide him to the exit, that red teleporter."); 
		tuts[1].text = ("Using super-advanced future 3d printing technology, you can put walls in the build queue with the 'Q' key, and use mouse click or '1','2','3' to select items from the placeable queue.");
		tuts[2].text = ("If you're tired of waiting for him to figure it out you can use the 'I' and 'O' keys to increase and decrease his speed, respectively.");
	}
	else if (levelnum == 21) {
		text = new TextBox();
		text.fontSize = 20;
		text.x = 192;
		text.y = 64;
		text.drawBG = true;
		text.bgColor = "white";
		text.border = 2;
		text.text = ("Sometimes walls simply won't cut it. Use the 'W' key to build a bomb, and blow up all adjacent tiles in its vicinity!"); 
		world.addChild(text);
		
		for (var i = 0; i < 2; i++) {
			tuts[i] = new TextBox();
			tuts[i].fontSize = 20;
			tuts[i].x = 192;
			tuts[i].y = 96 + (32*i);
			tuts[i].drawBG = true;
			tuts[i].bgColor = "white";
			tuts[i].border = 2;
			world.addChild(tuts[i]);
		}
		tuts[0].text = "Bombs and bridges use lots of printer ink, so make sure he collects enough that you can get him through the level.";
		tuts[1].text = "You can click on objects in the build queue to cancel building them and conserve ink. If you mess up, restart or skip the level through the pause menu using 'Esc'";
	}
	else if (levelnum == 22) {
		text = new TextBox();
		text.fontSize = 20;
		text.x = 192;
		text.y = 64;
		text.drawBG = true;
		text.bgColor = "white";
		text.border = 2;
		text.text = ("Lasers are just as deadly as pits, but our patented wall technology blocks them effectively."); 
		world.addChild(text);
	}
	else if (levelnum == 23) {
		for (var i = 0; i < 3; i++) {
			tuts[i] = new TextBox();
			tuts[i].fontSize = 20;
			tuts[i].x = 640;
			tuts[i].y = 64 + (32*i);
			tuts[i].drawBG = true;
			tuts[i].bgColor = "white";
			tuts[i].border = 2;
			world.addChild(tuts[i]);
		}
		tuts[0].text = ("Final tips:");
		tuts[1].text = ("'R' will give you a trap, which will keep the guy in place for a few seconds and give you time to save his life.");
		tuts[2].text = ("'T' will give you an attractor, an expensive but useful device that will draw him in a certain direction when he passes it.");
		 
	}
	else if (levelnum == 0) {
		text = new TextBox();
		text.fontSize = 20;
		text.x = 640;
		text.y = 64;
		text.drawBG = true;
		text.bgColor = "white";
		text.border = 2;
		text.text = ("You're on your own."); 
		world.addChild(text);
	}
	
}

function changeLevel() {
	runtime = false;
	if (levelnum == -1) levelnum = 20;
	else if (levelnum == 23) levelnum = 0;
	else levelnum++;
	clearLevel();
	loadLevel(levelnum);
	reInit();
	runtime = true;
	//changelevel.play();
}

//changeLevel but back to current
function gameOver() {
	runtime = false;
	clearLevel();
	loadLevel(levelnum);
	reInit();
	runtime = true;
}

function clearLevel() {
	for (var i = 0; i < walls.length; i++) {
		world.removeChild(walls[i]);
	}
	walls.length = 0;
	for (var i = 0; i < unbreakables.length; i++) {
		world.removeChild(unbreakables[i]);
	}
	unbreakables.length = 0;
	for (var i = 0; i < pits.length; i++) {
		world.removeChild(pits[i]);
	}
	pits.length = 0;
	for (var i = 0; i < inks.length; i++) {
		world.removeChild(inks[i]);
	}
	inks.length = 0;
	for (var i = 0; i < attractors.length; i++) {
		world.removeChild(attractors[i]);
	}
	for (var i = 0; i < bridges.length; i++) {
		world.removeChild(bridges[i]);
	}
	bridges.length = 0;
	for (var i = 0; i < traps.length; i++) {
		world.removeChild(traps[i]);
	}
	traps.length = 0;
	for (var i = 0; i < laserups.length; i++) {
		for (var j = 0; j < laserups[i].beams.length; j++) {
			world.removeChild(laserups[i].beams[j]);
		}
		world.removeChild(laserups[i]);
	}
	for (var i = 0; i < laserdowns.length; i++) {
		for (var j = 0; j < laserdowns[i].beams.length; j++) {
			world.removeChild(laserdowns[i].beams[j]);
		}
		world.removeChild(laserdowns[i]);
	}
	for (var i = 0; i < laserrights.length; i++) {
		for (var j = 0; j < laserrights[i].beams.length; j++) {
			world.removeChild(laserrights[i].beams[j]);
		}
		world.removeChild(laserrights[i]);
	}
	for (var i = 0; i < laserlefts.length; i++) {
		for (var j = 0; j < laserlefts[i].beams.length; j++) {
			world.removeChild(laserlefts[i].beams[j]);
		}
		world.removeChild(laserlefts[i]);
	}
	for (var i = 0; i < buildArray.length; i++) {
		world.removeChild(buildArray[i]);
	}
	for (var i = 0; i < placementArray.length; i++) {
		world.removeChild(placementArray[i]);
	}
	for (var i = 0; i < tuts.length; i++) {
		world.removeChild(tuts[i]);
	}
	tuts.length = 0;
	if (text != null) world.removeChild(text);
	text = null;
	
	if (building != null) world.removeChild(building);
	
	laserups.length = 0;
	laserdowns.length = 0;
	laserrights.length = 0;
	laserlefts.length = 0;
	attractors.length = 0;
	islaser = false;
	world.removeChild(bomb);
	world.removeChild(start);
	world.removeChild(end);
	
	buildArray.length = 0;
	placementArray.length = 0;
	building = null;
	printer.animation = "idle";
}

function init() {
	placing = 0;
	background = new Sprite();
	background.x = 0;
	background.y = 0;
	background.width = canwidth;
	background.height = canheight;
	background.index = 20;
	background.image = Textures.load("images/background8.png");
	world.addChild(background);
	
	placeBar = new Sprite();
	placeBar.x = 32;
	placeBar.y = 96;
	placeBar.height = 192;
	placeBar.width = 96;
	placeBar.image = Textures.load("images/uibar.png");
	placeBar.index = 6;
	world.addChild(placeBar);

	buildBar = new Sprite();
	buildBar.x = 32;
	buildBar.y = 416;
	buildBar.height = 192;
	buildBar.width = 96;
	buildBar.image = Textures.load("images/uibar.png");
	buildBar.index = 6;
	world.addChild(buildBar);

	selection = new Sprite();
	selection.x = -64;
	selection.y = -64;
	selection.height = 48;
	selection.width = 48;
	selection.image = Textures.load("images/selection.png");
	selection.index = 5;
	world.addChild(selection);
	
	console.log("initialized game");
	manager = new Sprite();
	manager.mode = "wall";
	manager.dragOffsetX = 0;
	manager.dragOffsetY = 0;
	world.addChild(manager);
	gInput.addMouseDownListener(manager);
	printer = new Sprite();
	printer.image = Textures.load("http://i.imgur.com/FTgBvUy.png");
	printer.width = 64;
	printer.height = 64;
	printer.x = 32;
	printer.y = 304;
	printer.frameWidth = 64;
	printer.frameHeight = 64;
	printer.frameCount = 8;
	printer.frameRate = 2;
	printer.addAnimation("print", 0, 9);
	printer.addAnimation("idle",0,1);
	printer.animation = "idle";
	printer.index = 2;
	building = null;
	world.addChild(printer);	
	arrow = new Sprite();
	arrow.width = 32;
	arrow.height = 32;
	arrow.index = 2;
	arrow.image = Textures.load("images/arrow.png");
	arrow.frameCount = 4;
	arrow.frameHeight = 32;
	arrow.frameWidth = 32;
	arrow.frame = 0;
	arrow.frameRate = 0;
	world.addChild(arrow);
	theDude = new Sprite();
	theDude.x = start.x;
	theDude.y = start.y;
	theDude.width = 32;
	theDude.height = 32;
	theDude.index = 0;
	theDude.image = Textures.load("images/thedude.png");
	theDude.dir = 2;
	theDude.moving = true;
	theDude.timer = 200;
	theDude.trap = null;
	theDude.frameWidth = 32;
	theDude.frameHeight = 32;
	theDude.frameCount = 17;
	theDude.frameRate = 16;
	theDude.addAnimation("right",0,5);
	theDude.addAnimation("left",4,5);
	theDude.addAnimation("back",8,5);
	theDude.addAnimation("front",12,5);
	theDude.animation = "front";
	world.addChild(theDude);
	ink = new Sprite();
	ink.amount = 256;
	ink.x = 928;
	ink.y = 800;
	ink.width = ink.amount;
	ink.height = 32;
	ink.index = 3;
	ink.image = Textures.load("http://i.imgur.com/eDSYYld.png");
	world.addChild(ink);
	
	/*inkBorder = new Sprite();
	inkBorder.x = 100;
	inkBorder.y = 100;
	inkBorder.width = 100;
	inkBorder.height = 40;
	inkBorder.image = Textures.load("images/inkBarBorder.png");
	world.addChild(inkBorder);
	inkFill = new Sprite();
	inkFill.x=100;
	inkFill.y=100;
	inkFill.width = 100;
	inkFill.height = 40;
	inkFill.image = Textures.load("images/inkBar.png");
	world.addChild(inkFill);*/

	laserupdate(0);
	laserupdate(1);
	laserupdate(2);
	laserupdate(3);
	
	playerSpeed = 4;
	setTurn(theDude.x, theDude.y, theDude.dir);
	runtime = true;
}

function reInit() {
	placing = 0;
	theDude.x = start.x;
	theDude.y = start.y;
	theDude.dir = 2;
	playerSpeed = 4;
	theDude.frameRate = 16;
	setTurn(theDude.x, theDude.y, theDude.dir);
	laserupdate(0);
	laserupdate(1);
	laserupdate(2);
	laserupdate(3);

	ink.amount = 256;
	ink.width = ink.amount;
}

function pause(){
	//turn off game
	runtime=false;
	//+fixing exploit where printer keeps printing while game is paused
	var save = printer.frameRate;
	printer.frameRate = 0;
	//make/show pause menu
	var pauseMenu = new Sprite();
	pauseMenu.image = Textures.load("images/pauseMenu2.png");
	pauseMenu.x=canwidth/2;
	pauseMenu.y=canheight/2;
	pauseMenu.width=800;
	pauseMenu.height=500;
	pauseMenu.xoffset = -pauseMenu.width/2;
	pauseMenu.yoffset = -pauseMenu.height/2;
	world.addChild(pauseMenu);
	gInput.addMouseDownListener(pauseMenu);

	pauseMenu.onMouseDown = function(button) {
		console.log("clicked");
		var mouseX = gInput.mouse.x;
		var mouseY = gInput.mouse.y;
		console.log("mouseX:"+ mouseX + " mouseY:"+ mouseY);
		console.log("pmx:"+ pauseMenu.x + " pmx + pmw:" + (pauseMenu.x + pauseMenu.width) + " pmy:" + pauseMenu.y + " pmy+pmh:"+ (pauseMenu.y+pauseMenu.height));
	
		//for picture to sprite scaling
		var resumeX=((165/500)*pauseMenu.width+pauseMenu.x+pauseMenu.xoffset);
		var resumeY=((165/400)*pauseMenu.height+pauseMenu.y+pauseMenu.yoffset);
		var resumeWidth=((340-165)/500)*pauseMenu.width;
		var resumeHeight=((205-165)/400)*pauseMenu.height;
		var restartX=((120/500)*pauseMenu.width+pauseMenu.x+pauseMenu.xoffset);
		var restartY=((230/400)*pauseMenu.height+pauseMenu.y+pauseMenu.yoffset);
		var restartWidth=((380-120)/500)*pauseMenu.width;
		var restartHeight=((260-230)/400)*pauseMenu.height;
		var quitX=((200/500)*pauseMenu.width+pauseMenu.x+pauseMenu.xoffset);
		var quitY=((290/400)*pauseMenu.height+pauseMenu.y+pauseMenu.yoffset);
		var quitWidth=((290-200)/500)*pauseMenu.width;
		var quitHeight=((320-290)/400)*pauseMenu.height;
		//new code
		var skipX=((410/500)*pauseMenu.width+pauseMenu.x+pauseMenu.xoffset);
		var skipY=((330/400)*pauseMenu.height+pauseMenu.y+pauseMenu.yoffset);
		var skipWidth=((475-410)/500)*pauseMenu.width;
		var skipHeight=((375-330)/400)*pauseMenu.height;
		
		//if resume if pressed, start game and remove menu
		if(mouseX > resumeX && mouseX < (resumeX + resumeWidth) && mouseY > resumeY && mouseY < (resumeY + resumeHeight)){
			runtime=true;
			printer.frameRate = save;
			gInput.removeMouseDownListener(pauseMenu);
			world.removeChild(pauseMenu);
		}
		
		//if restart is pressed, call gameOver to reset level
		if(mouseX > restartX && mouseX < (restartX + restartWidth) && mouseY > restartY && mouseY < (restartY + restartHeight)){
			//open(location, '_self').close();
			gameOver();
			gInput.removeMouseDownListener(pauseMenu);
			world.removeChild(pauseMenu);
			runtime=true;
		}
		
		//if quit is pressed, close window
		if(mouseX > quitX && mouseX < (quitX + quitWidth) && mouseY > quitY && mouseY < (quitY + quitHeight)){
			open(location, '_self').close();
		}
		//new code
		//if skip level is pressed, load next level
		if(mouseX > skipX && mouseX < (skipX + skipWidth) && mouseY > skipY && mouseY < (skipY + skipHeight)){
			gInput.removeMouseDownListener(pauseMenu);
			world.removeChild(pauseMenu);
			changeLevel();
		}
	};	
}

function gameStart(){
	console.log("here?");
	//turn off game
	runtime=false;
	
	//make/show start menu
	var startMenu = new Sprite();
	startMenu.image = Textures.load("images/startmenuonon.png");
	startMenu.x=0;
	startMenu.y=0;
	startMenu.width=canwidth;
	startMenu.height=canheight;
	startMenu.xoffset = 0;
	startMenu.yoffset = 0;
	world.addChild(startMenu);
	gInput.addMouseDownListener(startMenu);
	
	musicToggle = true;
	soundToggle = true;

	startMenu.onMouseDown = function(button) {
		var mouseX = gInput.mouse.x;
		var mouseY = gInput.mouse.y;
		console.log("mouseX:"+ mouseX + " mouseY:"+ mouseY);
		console.log("pmx:"+ startMenu.x + " pmx + pmw:" + (startMenu.x + startMenu.width) + " pmy:" + startMenu.y + " pmy+pmh:"+ (startMenu.y+startMenu.height));
	
		//for picture to sprite scaling
		var startX=((765/1824)*startMenu.width+startMenu.x+startMenu.xoffset);
		var startY=((325/832)*startMenu.height+startMenu.y+startMenu.yoffset);
		var startWidth=((1080-765)/1824)*startMenu.width;
		var startHeight=((410-325)/832)*startMenu.height;
		var musicX=((660/1824)*startMenu.width+startMenu.x+startMenu.xoffset);
		var musicY=((430/832)*startMenu.height+startMenu.y+startMenu.yoffset);
		var musicWidth=((1180-660)/1824)*startMenu.width;
		var musicHeight=((510-430)/832)*startMenu.height;
		var soundX=((610/1824)*startMenu.width+startMenu.x+startMenu.xoffset);
		var soundY=((520/832)*startMenu.height+startMenu.y+startMenu.yoffset);
		var soundWidth=((1210-610)/1824)*startMenu.width;
		var soundHeight=((620-520)/832)*startMenu.height;
		
		//if start is pressed, remove menu and load level 1
		if(mouseX > startX && mouseX < (startX + startWidth) && mouseY > startY && mouseY < (startY + startHeight)){
			gInput.removeMouseDownListener(startMenu);
			world.removeChild(startMenu);
			changeLevel();			
		}
		
		//if music is pressed, switch sprites and turn on/off music
		if(mouseX > musicX && mouseX < (musicX + musicWidth) && mouseY > musicY && mouseY < (musicY + musicHeight)){
			if(musicToggle == true){
	    		musicToggle = false;
	    		//TURN MUSIC OFF HERE
	    		if(soundToggle == true)
	    			startMenu.image = Textures.load("images/startmenuoffon.png");
	    		else startMenu.image = Textures.load("images/startmenuoffoff.png");
			}
			else if(musicToggle == false){
				musicToggle= true;
				//TURN MUSIC ON HERE
				if(soundToggle == true)
					startMenu.image = Textures.load("images/startmenuonon.png");
				else startMenu.image = Textures.load("images/startmenuonoff.png");
			}
		}
		
		//if sound is pressed, switch sprites and turn on/off sound
		if(mouseX > soundX && mouseX < (soundX + soundWidth) && mouseY > soundY && mouseY < (soundY + soundHeight)){
			if(soundToggle == true){
	    		soundToggle = false;
	    		//TURN SOUNDS OFF HERE
	    		if(musicToggle == true)
	    			startMenu.image = Textures.load("images/startmenuonoff.png");
	    		else startMenu.image = Textures.load("images/startmenuoffoff.png");
			}
			else{
				soundToggle= true;
				//TURN SOUNDS ON HERE
				if(musicToggle == true)
					startMenu.image = Textures.load("images/startmenuonon.png");
				else startMenu.image = Textures.load("images/startmenuoffon.png");
			}
		}
		console.log("musicToggle: "+ musicToggle);
		console.log("soundToggle: "+ soundToggle);
	};	
}

function credits(){
	//turn off game
	runtime=false;
	
	//make/show pause menu
	var creditMenu = new Sprite();
	creditMenu.image = Textures.load("images/credits.png");
	creditMenu.x=0;
	creditMenu.y=0;
	creditMenu.width=canwidth;
	creditMenu.height=canheight;
	creditMenu.xoffset = 0;
	creditMenu.yoffset = 0;
	creditMenu.index = 1;
	world.addChild(creditMenu);
	gInput.addMouseDownListener(creditMenu);
	
	creditMenu.onMouseDown = function(button) {
		var mouseX = gInput.mouse.x;
		var mouseY = gInput.mouse.y;
		
		//for picture to sprite scaling
		var startX=((650/1824)*creditMenu.width+creditMenu.x+creditMenu.xoffset);
		var startY=((270/832)*creditMenu.height+creditMenu.y+creditMenu.yoffset);
		var startWidth=((1200-650)/1824)*creditMenu.width;
		var startHeight=((350-270)/832)*creditMenu.height;
		var exitX=((800/1824)*creditMenu.width+creditMenu.x+creditMenu.xoffset);
		var exitY=((355/832)*creditMenu.height+creditMenu.y+creditMenu.yoffset);
		var exitWidth=((1020-800)/1824)*creditMenu.width;
		var exitHeight=((430-355)/832)*creditMenu.height;
		
		//if startOver is pressed, remove menu and load level 1
		if(mouseX > startX && mouseX < (startX + startWidth) && mouseY > startY && mouseY < (startY + startHeight)){
			gInput.removeMouseDownListener(creditMenu);
			world.removeChild(creditMenu);
			//set to -1 so that changeLevel will increment to 0
			levelnum = -1;
			changeLevel();			
		}
		
		//if exit is pressed, close down game
		if(mouseX > exitX && mouseX < (exitX + exitWidth) && mouseY > exitY && mouseY < (exitY + exitHeight)){
			open(location, '_self').close();
		}
	};	
}

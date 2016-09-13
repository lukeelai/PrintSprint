//Initialization and declaration of game vars

var walls = [];
var unbreakables = [];
var pits = [];
var inks = [];
var attractors = [];
var laserups = [];
var laserrights = [];
var laserdowns = [];
var laserlefts = [];
var bomb;
var explosion;
var bridges = [];
var traps = [];
var start;
var end;
var arrow;
var islaser = false;
var theDude;
var manager;
var ink;
var printer;
var building;

var musicToggle;
var soundToggle;

var levels = [];
var tuts = [];
var text;

var buildArray = [];
var placementArray = [];
var placing;
var placeBar;
var buildBar;
var selection;
//var inkFill;
//var inkBorder;
//player ink level
var runtime = false;
var playerSpeed;
gInput.addFunc(81, addWall, false);
gInput.addFunc(87, addBomb, false);
gInput.addFunc(69, addBridge, false);
gInput.addFunc(82, addAttractor, false);
gInput.addFunc(84, addTrap, false);
gInput.addBool(27, "paused");
gInput.addBool(49, "one");
gInput.addBool(50, "two");
gInput.addBool(51, "three");
gInput.addFunc(73, increaseSpeed, false);
gInput.addFunc(79, decreaseSpeed, false);

canwidth = 1888 - 2 * 32;
// this is the width inside the level editor
canheight = 928 - 3 * 32;

//Laser beam sprite
var beamup = new Sprite();
beamup.width = 32;
beamup.height = 32;
beamup.image = Textures.load();
beamup.name = "beamup";

var placeText = new TextBox();
placeText.x = 32;
placeText.y = 64;
placeText.fontSize = 24;
placeText.text = "Placeable:";
placeText.index = 2;
placeText.drawBG = true;
placeText.bgColor = "white";
placeText.border = 2;
world.addChild(placeText);

var buildText = new TextBox();
buildText.x = 32;
buildText.y = 384;
buildText.fontSize = 24;
buildText.text = "Building:";
buildText.index = 2;
buildText.drawBG = true;
buildText.bgColor = "white";
buildText.border = 2;
world.addChild(buildText);

var inkText = new TextBox();
inkText.x = 928;
inkText.y = 800;
inkText.fontSize = 24;
inkText.text = "Ink";
inkText.index = 2;
world.addChild(inkText);

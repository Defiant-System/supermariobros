/* mario.js */
// Starts everything.


// Know when to shut up
const verbosity = {
	Maps: false,
	Sounds: false,
};

const Global = {};


function Mario() {
	// I keep this cute little mini-library for some handy functions
	TonedJS(true);

	// Resetting everything may take a while
	resetMeasurements();
	resetLibrary();
	resetEvents();
	resetCanvas();
	resetMaps();
	resetScenery();
	resetTriggers();
	resetSeed();
	resetSounds();
	
	// With that all set, set the map to World11.
	Global.gameon = true;
	setMap(1,1);
	
	// Load sounds after setting the map, since it uses clearAllTimeouts
	startLoadingSounds();
}

/* Basic reset operations */
function resetMeasurements() {
	resetUnitsize(4);
	resetTimer(1000 / 60);
	
	Global.jumplev1 = 32;
	Global.jumplev2 = 64;
	Global.ceillev  = 88; // The floor is 88 spaces (11 blocks) below the yloc = 0 level
	Global.ceilmax  = 104; // The floor is 104 spaces (13 blocks) below the top of the screen (yloc = -16)
	Global.castlev  = -48;
	Global.paused   = true;
	
	resetGameScreen();
}

// Unitsize is kept as a measure of how much to expand (typically 4)
function resetUnitsize(num) {
	Global.unitsize = num;
	for(var i = 2; i <= 64; ++i) {
		Global["unitsizet" + i] = Global.unitsize * i;
		Global["unitsized" + i] = Global.unitsize / i;
	}
	Global.scale = Global.unitsized2; // Typically 2
	Global.gravity = Global.round(12 * Global.unitsize) / 100; // Typically .48
}

function resetTimer(num) {
	num = Global.roundDigit(num, .001);
	Global.timer = Global.timernorm = num;
	Global.timert2 = num * 2;
	Global.timerd2 = num / 2;
	Global.fps = Global.fps_target = Global.roundDigit(1000 / num, .001);
	Global.time_prev = Date.now();
}

function resetGameScreen() {
	Global.gamescreen = new getGameScreen();
}

function getGameScreen() {
	resetGameScreenPosition(this);
	// Middlex is static and only used for scrolling to the right
	this.middlex = (this.left + this.right) / 2;
	// this.middlex = (this.left + this.right) / 3;
	
	// This is the bottom of the screen - water, pipes, etc. go until here
	Global.botmax = this.height - Global.ceilmax;
	if (Global.botmax < Global.unitsize) {
		body.innerHTML = "<div><br>Your screen isn't high enough. Make it taller, then refresh.</div>";
	}
	
	// The distance at which Things die from falling
	this.deathheight = this.bottom + 48;
}
function resetGameScreenPosition(me) {
	me = me || Global.gamescreen;
	me.left = me.top = 0;
	me.bottom = innerHeight;
	me.right = innerWidth;
	me.height = innerHeight / Global.unitsize;
	me.width = innerWidth / Global.unitsize;
	me.unitheight = innerHeight;
	me.unitwidth = innerWidth;
}

// Events are done with EventHandlr.js
// This helps make timing obey pauses, and makes class cycles much easier
function resetEvents() {
	Global.EventHandler = new EventHandlr({
		onSpriteCycleStart: "onadding",
		doSpriteCycleStart: "placed",
		cycleCheckValidity: "alive",
		timingDefault: 9
	});
}

// Variables regarding the state of the game
// This is called in setMap to reset everything
function resetGameState(nocount) {
	// HTML is reset here
	clearAllTimeouts();
	// Also reset data
	resetData();
	Global.nokeys = Global.spawning = Global.spawnon =
		Global.notime = Global.editing = Global.qcount = Global.lastscroll = 0;
	Global.paused = Global.gameon = true;
	// Shifting location shouldn't wipe the gamecount (for key histories)
	if (!nocount) Global.gamecount = 0;
	// And quadrants
	resetQuadrants();
	// Keep a history of pressed keys
	Global.gamehistory = [];
	// Clear audio
	pauseAllSounds();
	sounds = {};
}

function scrollWindow(x, y) {
	x = x || 0; y = y || 0;
	var xinv = -x, yinv = -y;
	
	gamescreen.left += x; gamescreen.right += x;
	gamescreen.top += y; gamescreen.bottom += y;
	
	shiftAll(characters, xinv, yinv);
	shiftAll(solids, xinv, yinv);
	shiftAll(scenery, xinv, yinv);
	shiftAll(quads, xinv, yinv);
	shiftElements(texts, xinv, yinv);
	updateQuads(xinv);
}
function shiftAll(stuff, x, y) {
	for(var i = stuff.length - 1; i >= 0; --i)
			shiftBoth(stuff[i], x, y);
}
function shiftElements(stuff, x, y) {
	for(var i = stuff.length - 1, elem; i >= 0; --i) {
		elem = stuff[i];
		elementShiftLeft(elem, x);
		elementShiftTop(elem, y);
	}
}

// Similar to scrollWindow, but saves mario's x-loc
function scrollMario(x, y, see) {
	var saveleft = mario.left,
			savetop = mario.top;
	y = y || 0;
	scrollWindow(x,y);
	setLeft(mario, saveleft, see);
	setTop(mario, savetop + y * unitsize, see);
	updateQuads();
}

// Calls log if window.verbosity has the type enabled
function mlog(type) {
	if (verbosity[type]) {
		log.apply(console, arguments);
	}
}

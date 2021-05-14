/* Maps.js */
// Contains functions for creating, populating, and using maps

/* Basic Map Functions */

function resetMaps() {
	var i, j, mapfunc;
	Global.currentmap = [1,1];
	Global.defaultsetting = { setting: "Overworld" };
	
	// Mapfuncs starts off such that [X][Y] is window.WorldXY, if it exists
	Global.mapfuncs = new Array(9);

	// For each [i][j], if window.WorldIJ exists, it's used
	// Otherwise it will be queried via AJAX later
	for(var i = 1, j; i <= 9; ++i) {
		mapfunc = Global.mapfuncs[i] = [0,0,0,0,0];
		for(j = mapfunc.length; j >= 0; --j)
			mapfunc[j] = Global.worlds["World" + i + "" + j];
	}
	
	// Random maps are all window functions
	Global.mapfuncs["Random"] = {
		Overworld:  WorldRandomOverworld,
		Underworld: WorldRandomUnderworld,
		Underwater: WorldRandomUnderwater,
		Bridge:     WorldRandomBridge,
		Sky:        WorldRandomSky,
		Castle:     WorldRandomCastle
	};
	
	// Right now there aren't too many special maps
	Global.mapfuncs["Special"] = {
		Blank: BlankMap
	}
}

function setNextLevelArr(arr) {
	if (arr[1]++ == 4) {
		++arr[0];
		arr[1] = 1;
	}
	return arr;
}

// A new map, which contains general settings for the game run
function Map() {
	this.underwater = this.current_character = this.current_solid = this.current_scenery = this.xloc = 0;
	this.canscroll = true;
	this.floor = 104;
	this.time = 400; // optionally specified later
	this.curloc = -1;
	this.gravity = Global.gravity;
	this.maxyvel = Global.unitsize * 1.75;
	this.maxyvelinv = this.maxyvel * -2.1;
}

// An Area within a map, which contains the PreThings
function Area(setting, rawfunc) {
	this.creation = rawfunc || function() {};
	this.precharacters = [];
	this.presolids = [];
	this.prescenery = [];
	this.floor = 140;
	this.width = 0;
	this.underwater = false;
	setAreaSetting(this, setting || "");
}

function setAreaSetting(area, setting, sound) {
	Global.map.shifting = true;
	if (arguments.length == 1) {
		setting = arguments[0];
		area = Global.map.area;
	}
	area.setting = area.background = setting;
	area.theme = setting.split(" ")[0];
	area.fillStyle = getAreaFillStyle(area.setting);
	// Water fixen
	if (area.fillStyle.indexOf("Underwater") != -1) goUnderWater();
	else goOntoLand();
	
	if (sound) playTheme();
	if (Global.gameon) clearAllSprites();
	Global.map.shifting = false;
}

// A location within an Area
// Specifies the entry function and xloc if needed
function Location(area, entry, xloc) {
	this.area = area;
	this.xloc = xloc || 0;
	this.yloc = this.floor = 0;
	// If entry is true, use entryPlain (beginning of level).
	// If it's valid, use it.
	// Otherwise, use entryNormal (drop from top)
	this.entry = ((entry == true) ? entryPlain : (entry || entryNormal));
}

// A holder for a thing to be placed in a Location
// Stores the coordinates, constructor, and any other arguments
function PreThing(xloc, yloc, type) {
	this.xloc = xloc;
	this.yloc = yloc;
	this.type = type;
	// Pass any arguments after type into the Thing
	var args = Global.arrayMake(arguments),
			// Blank Things are just basically {}, just with the name Thing in devtools :)
			object = new Thing();
	args[2] = type;
	args = args.splice(2); // args is now [type, arg1, arg2...]
	Thing.apply(object, args);
	
	this.object = object;
}

/* Map Setting */
// Resets the board and starts
function setMap(one, two) {
	if (!Global.gameon) return;
	
	// Unless it's ok to, kill the editor
	if (!Global.canedit && Global.editing) editorClose(true);
	
	// Remove random stuff
	window.find(".randomdisplay").remove();
	
	// If arguments[0] is an array, it's [one, two]
	if (one instanceof Array) {
		two = one[1];
		one = one[0];
	}
	
	var newcurrentmap = one ? [one, two] : Global.currentmap,
		newmap = new Map(),
		func = Global.mapfuncs[newcurrentmap[0]];
	
	// Create the new map using the mapfunc, making sure it's loaded
	if (!func) {
		console.log("No such map section exists (yet?):", func);
		return;
	}

	newcurrentmap.func = func = func[newcurrentmap[1]];

	if (!func) {
		console.log("No such map exists (yet?):", func);
		return;
	}
	
	// Since the func exists, set and use it
	Global.map = newmap;
	Global.currentmap = newcurrentmap;
	func(newmap);
	
	// Set the map variables back to 0
	newmap.areanum = newmap.curloc =/* Global.playediting =*/ 0;
	Global.area = newmap.area = newmap.areas[0];
	
	// Save the score if need be
	if (Global.mario && Global.mario.power) storeMarioStats();
	if (Global.data) Global.data.scoreold = Global.data.score.amount;
	
	// Actual resetting is done in shiftToLocation
	shiftToLocation(0);
}

// For ease of transfer
// Random map pipe transports are ["Random", "XXXworld", LocationType]
// LocationType is either 1 (down) or -1 (up)
// Down means Mario is moving down; Up means Mario is moving up.
function setMapRandom(transport) {
	if (!Global.gameon) return;
	
	resetSeed();
	
	// Determine how to get into the map
	if (typeof(transport) == "string") transport = ["Random", transport];
	else if (!transport) transport = ["Random", "Overworld"];
	
	// Actually set the map and shift to the location
	setMap(transport[0], transport[1]);
	
	// Record random-specific stuff
	Global.data.traveledold = Global.data.traveled;
	Global.map.sincechange = Global.map.num_random_sections = 0;
	Global.map.entrancetype = transport[2];
	Global.map.random = true;
	if (Global.map.randname == "Sky") Global.map.exitloc = ["Random", "Overworld", "Down"];
}



/* Map Traversal */
function shiftToLocation(loc) {
	// Make sure this is the right function
	if (Global.map.random && typeof(loc) != "number") {
		return setMapRandom(loc);
	}
	if (typeof(loc) == "number") 
		loc = Global.map.locs[loc]; 
	
	// Reset everything game-related
	pause();
	resetGameState();
	resetGameScreenPosition();
	resetQuadrants();
	
	// Set this location's area as current
	Global.map.areanum = loc.area;
	Global.area = Global.map.area = Global.map.areas[Global.map.areanum];
	
	// Clear everything, create the map, then set post-creation settings
	setAreaPreCreation(Global.area);
	Global.area.creation();
	setAreaPostCreation(Global.area);
	
	// Start off by spawning, then placing Mario
	spawnMap();
	Global.mario = placeMario();
	scrollMario(loc.xloc * Global.unitsize);
	locMovePreparations(Global.mario);
	// Note that some locs will pause manually after this
	unpause();
	// Typically this will do nothing or be from a pipe
	loc.entry(Global.mario, loc.entrything);
	// Don't forget the least annoying part of programming this!
	Global.EventHandler.addEvent(playTheme, 2);
	
	// Texts are bound-check checked periodically for peformance reasons
	Global.EventHandler.addEventInterval(checkTexts, 117, Infinity);
}

// To do: add in other stuff
function setAreaPreCreation(area) {
	// Clear the containers
	Global.events = [];
	Global.EventHandler.clearAllEvents();
	Global.characters = [];
	Global.solids = [];
	Global.scenery = [];
	clearTexts();
	area.precharacters = [];
	area.presolids = [];
	area.prescenery = [];
	
	// Reset the spawn & scroll settings
	Global.map.current_solid = Global.map.current_character = Global.map.current_scenery = Global.map.shifting = 0;
	Global.map.canscroll = true;
	
	Global.data.time.amount = Global.map.time;
	Global.data.world.amount = Global.currentmap[0] + "-" + Global.currentmap[1];
	setDataDisplay();
	startDataTime();
	
	if (Global.map.random) {
		Global.data.world.amount = "Random Map";
		Global.data.world.element.innerHTML = "WORLD<br>Random Map";
	}
}

function clearTexts() {
	if (Global.texts)
		for(var i = Global.texts.length - 1; i >= 0; --i) {
			let el = Global.texts[i];
			if (el && el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
	Global.texts = [];
}

function setAreaPostCreation() {
	Global.map.current_character = Global.map.current_solid = Global.map.current_scenery = 0;
	Global.area.width = Global.max(Global.area.width, Global.gamescreen.width);
	
	// Reset gravity and underwater
	Global.map.underwater = Global.map.area.underwater;
	Global.map.jumpmod = 1.056 + 3.5 * Global.map.underwater;
	Global.map.has_lakitu = false;
	Global.EventHandler.addEvent(setMapGravity, 1);
	
	// If it's underwater, give it the waves on top and mario's bubble event
	if (Global.area.underwater) {
		// Random maps have a block to stop mario from swimming too high
		Global.area.presolids.push(new PreThing(0, 0, WaterBlock, Global.area.width));
		// Non-random maps also have a water sprite (randoms set it themselves)
		if (!Global.map.random) Global.area.presolids.push(new PreThing(0, 16, Sprite, "Water", [Global.area.width / 3, 1]));
	}
	
	let prethingsorter = (a, b) => {
		if (a.xloc == b.xloc) return b.yloc - a.yloc;
		else return a.xloc - b.xloc;
	};

	// Sort everything using ascending order
	Global.area.presolids.sort(prethingsorter);
	Global.area.precharacters.sort(prethingsorter);
	Global.area.prescenery.sort(prethingsorter);
	
	// If the area has loops (really just castles), do this.
	if (Global.area.sections && Global.area.sections[0]) {
		setBStretch();
		Global.area.sections.current = 0;
		Global.area.sections[0](Global.area.sections.start);
	}
	// Otherwise, give it a ScrollBlocker at the area.width if it's not a random Sky
	else if (!Global.map.random && Global.area.setting != "Sky") {
		var blocker = new PreThing(Global.area.width, 0, ScrollBlocker);
		Global.area.presolids.push(blocker);
	}
	
	// The fillstyle is the background color
	Global.area.fillStyle = getAreaFillStyle(Global.area.setting);
}

// Given a setting, returns the background color
function getAreaFillStyle(setting) {
	if (Global.stringHas(setting, "Underworld") ||
		 Global.stringHas(setting, "Castle") ||
		 Global.stringHas(setting, "Night")) {
			return Global.stringHas(setting, "Underwater") ? "#2038ec" : "black";
	}
	if (Global.stringHas(setting, "Underwater")) return "#2038ec";
	return "#5c94fc";
}


// Moves generation to a specific location #
function setLocationGeneration(num) {
	Global.map.curloc = num;
	Global.map.refx = Global.map.locs[Global.map.curloc].xloc;
	Global.map.refy = Global.map.locs[Global.map.curloc].yloc + Global.map.floor;
	Global.map.areanum = Global.map.locs[Global.map.curloc].area;
}

/* Gamplay Functions */
// Solids are spawned a little bit before characters
function spawnMap() {
	var area = Global.map.area,
		rightdiff = Global.quads.rightdiff,
		screenright = Global.gamescreen.right + rightdiff,
		quadswidtht2 = Global.quads.width * 2 + rightdiff,
		screenrightpq = screenright + quadswidtht2,
		arr, arrlen, prething, thing, current;
	
	// Spawn characters
	arr = area.precharacters;
	arrlen = arr.length;
	current = Global.map.current_character;
	while(arrlen > current && screenright >= (prething = arr[current]).xloc * Global.unitsize) {
		thing = prething.object;
		addThing(thing, prething.xloc * Global.unitsize - Global.gamescreen.left, prething.yloc * Global.unitsize);
		thing.placenum = current;
		++current;
	}
	Global.map.current_character = current;
	
	// Spawn solids
	arr = area.presolids;
	arrlen = arr.length;
	current = Global.map.current_solid;
	while(arrlen > current && screenrightpq >= (prething = arr[current]).xloc * Global.unitsize) {
		thing = prething.object;
		addThing(thing, prething.xloc * Global.unitsize - Global.gamescreen.left, prething.yloc * Global.unitsize);
		thing.placenum = current;
		++current;
	}
	Global.map.current_solid = current;
	
	// Spawn scenery
	arr = area.prescenery;
	arrlen = arr.length;
	current = Global.map.current_scenery;
	while(arrlen > current && screenrightpq >= (prething = arr[current]).xloc * Global.unitsize) {
		thing = prething.object;
		addThing(thing, prething.xloc * Global.unitsize - Global.gamescreen.left, prething.yloc * Global.unitsize);
		thing.placenum = current;
		++current;
	}
	Global.map.current_scenery = current;
}


// Entry Functions
function goToTransport(transport) {
	// Goes to a new map
	if (transport instanceof Array) { 
		Global.map.ending = true;
		storeMarioStats();
		pause();
		if (Global.map.random) {
			setMapRandom(transport);
			// entryRandom(mario);
		}
		else setMap(transport);
	}
	// Goes to a new Location
	else shiftToLocation(Global.map.locs[transport]);
}

function entryPlain(me) {
	// pause();
	setLeft(me, Global.unitsizet16);
	setBottom(me, Global.map.floor * Global.unitsize);
	me.nocollide = me.piping = false;
	me.placed = true;
	// unpause();
}

function entryNormal(me) {
	// pause();
	setLeft(me, Global.unitsizet16);
	setTop(me, Global.unitsizet16);
	me.nocollide = me.piping = false;
	me.placed = true;
	// unpause();
}

function entryBlank(me) {
	setLeft(me, Global.unitsizet16);
	setBottom(me, Global.map.floor * Global.unitsize);
	me.nocollide = me.piping = me.movement = false;
	me.placed = me.nofall = me.nocollide = Global.notime = Global.nokeys = true;
	thingStoreVelocity(me);
	clearDataDisplay();
}

function entryRandom(me) {
	Global.data.time.amount = 0;
	Global.data.time.dir = 1;
	updateDataElement(Global.data.time);
	if (Global.map.startwidth) {
		if (!Global.map.nofloor) pushPreFloor(0, 0, Global.map.startwidth);
	}
	else Global.map.startwidth = 0;
	Global.map.firstRandomThings(map);
	Global.map.randtype((Global.map.startwidth + 1) * 8); //17 * 8
	entryPlain(me);
	addDistanceCounter();
	addSeedDisplay();
	// To do: remember to set the text & width of the curmap datadisplay
	switch(Global.map.entrancetype) {
		case "Down": 
			entryNormal(Global.mario);
		break;
		case "Up":
			// Use a pipe
			locMovePreparations(Global.mario);
			exitPipeVert(Global.mario, addThing(new Thing(Pipe, 32), Global.unitsizet8, (Global.map.floor - 32) * Global.unitsize));
		break;
		case "Vine":
			// Do that vine stuff
			locMovePreparations(Global.mario);
			Global.EventHandler.addEvent(function() { enterCloudWorld(Global.mario, true); }, 1);
			Global.mario.nofall = true;
			spawnMap();
		break;
		case "Castle":
			startCastle(Global.mario);
		break;
		default:
			// Only reached by Overworld the first time
			// if (Global.map.randname == "Overworld") addThing(new Thing(Sprite, "Castle", 1), unitsizet16 * -1, (map.floor - 88) * unitsize);
		break;
	}
}

function enterCloudWorld(me) {
	// There are four cloud blocks to the left
	// The vine goes up until it has four blocks above the clouds, then waits 2 seconds
	// Mario climbs up the left until two blocks from the top, then switches & jumps
	// if (paused) unpause();
	
	if (Global.map.random) Global.map.exitloc = getAfterSkyTransport();
	
	var screenbottom = 140 * Global.unitsize,
		screentop = 72 * Global.unitsize;
	me.placed = me.nofall = true;
	setTop(me, screenbottom);
	setLeft(me, Global.unitsize * 30);
	removeClass(me, "jumping");
	addClasses(me, ["climbing", "animated"]);
	me.climbing = Global.EventHandler.addSpriteCycle(me, ["one", "two"], "climbing");
	
	me.attached = new Thing(Vine, -1);
	addThing(me.attached, Global.unitsizet32, screenbottom - Global.unitsizet8);
	
	var movement = setInterval(function() {
		// Vine moving up
		if (me.attached.top <= screentop) {
			clearInterval(movement);
			setTop(me.attached, screentop, true);
			me.attached.movement = false;
			var stopheight = me.attached.top + Global.unitsizet16;
			movement = setInterval(function() {
				// Mario moving up
				shiftVert(me, Global.unitsized4 * -1, true);
				if (me.top <= stopheight) {
					// Mario stops moving up
					removeClass(me, "animated");
					clearInterval(movement);
					setTop(me, stopheight, true);
					clearInterval(movement);
					setTimeout(function() {
						// Mario switches sides
						setLeft(me, Global.unitsize * 36, true);
						addClass(me, "flipped");
						setTimeout(function() {
							// Mario hops off
							marioHopsOff(me, me.attached, true);
							Global.EventHandler.clearClassCycle(me, "climbing");
							me.running = Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "two"], "running", setMarioRunningCycler);
						}, Global.timer * 28);
					}, Global.timer * 14);
				}
			}, Global.timer);
		}
	}, Global.timer);
}

function walkToPipe() {
	Global.mario = placeMario();
	startWalking(Global.mario);
	Global.map.canscroll = false;

	var hasPipingStarted = false;
	var move = setInterval(function() {
		if (Global.mario.piping && !hasPipingStarted) {
			// We have started piping
			hasPipingStarted = true;
		}
		else if ( !Global.mario.piping && hasPipingStarted ) {
			// piping has finished
			if (sounds[0]) sounds[0].pause();
			Global.nokeys = Global.mario.keys.run = Global.notime = false;
			clearInterval(move);
			Global.mario.maxspeed = Global.mario.maxspeedsave;
		}
	}, Global.timer);
	unpause();
}

function startWalking(me) {
	me.movement = moveMario;
	me.maxspeed = me.walkspeed;
	Global.nokeys = Global.notime = me.keys.run = true;
	me.nofall = me.nocollide = false;
}

function intoPipeVert(me, pipe, transport) {
	if (!pipe.transport || !me.resting || 
		me.right + Global.unitsizet2 > pipe.right ||
		me.left - Global.unitsizet2 < pipe.left) return;
	pipePreparations(me);
	switchContainers(me, Global.characters, Global.scenery);
	unpause();
	var move = setInterval(function() {
		shiftVert(me, Global.unitsized4, true);
		if (me.top >= pipe.top) {
			clearInterval(move);
			setTimeout(function() { goToTransport(transport); }, 700);
		}
	}, Global.timer);
}

function intoPipeHoriz(me, pipe, transport) {
	if (!me.keys.run || !(me.resting || Global.map.underwater)) return;
	pipePreparations(me);
	switchContainers(me, Global.characters, Global.scenery);
	unpause();
	var move = setInterval(function() {
		shiftHoriz(me, Global.unitsized4, true);
		if (me.left >= pipe.left) {
			clearInterval(move);
			setTimeout(function() { goToTransport(transport); }, 700);
		}
	}, Global.timer);
}

function pipePreparations(me) {
	pauseTheme();
	play("Pipe");
	locMovePreparations(me);
	me.nofall = me.nocollide = Global.nokeys = Global.notime = true;
	me.movement = me.xvel = me.yvel = 0;
}

function locMovePreparations(me) {
	// pause();
	me.keys = new Keys();
	me.nocollide = me.piping = 1;
	me.placed = false;
	removeCrouch();
	removeClass(me, "running");
	removeClass(me, "jumping");
	removeClass(me, "flipped");
}

function startCastle(me) {
	me = me || Global.mario;
	if (!me) return;
	setBottom(me, Global.unitsize * 56);
	setLeft(me, Global.unitsizet2);
	me.nocollide = me.piping = false;
	me.placed = true;
}
// Exit functions
function exitPipeVert(me, pipe) {
	switchContainers(me, Global.characters, Global.scenery);
	me.nofall = Global.nokeys = Global.notime = true;
	play("Pipe");
	setTop(me, pipe.top);
	setMidXObj(me, pipe, true);
	var dy = Global.unitsize / -4, move = setInterval(function() {
		shiftVert(me, dy, true);
		if (me.bottom <= pipe.top) {
			switchContainers(me, Global.scenery, Global.characters);
			clearInterval(move);
			me.nocollide = me.piping = me.nofall = Global.nokeys = Global.notime = false;
			me.placed = true;
		}
	}, Global.timer);
}

function endLevel() {
	if (Global.map.ending) return;
	Global.map.ending = true;
	Global.map.random ? setMapRandom(["Random", "Castle"]) : setNextLevelArr(Global.currentmap);
	storeMarioStats();
	pause();
	setMap();
}

function setExitLoc(num) {
	Global.map.exitloc = num;
}


/* Shortcut Functions */
// Most of which call pushPre---
function pushPreThing2(type, xloc, yloc, extras, more) {
	var prething = new PreThing(Global.map.refx + xloc, Global.map.refy - yloc, type, extras, more);
	if (prething.object.solid && !prething.object.nostretch) {
		Global.map.area.width = Global.max(Global.map.area.width, prething.xloc + prething.object.width);
		Global.map.area.presolids.push(prething);
	} else {
		Global.map.area.prechars.push(prething);
	}
	return prething;
}

function pushPreScenery(name, xloc, yloc, repx, repy) {
	repx = Global.round(repx || 1); repy = Global.round(repy || 1);
	var prething = new PreThing(Global.map.refx + xloc, Global.map.refy - yloc, Sprite, name, [repx, repy]);
	prething.yloc -= prething.object.height;
	Global.map.area.prescenery.push(prething);
	return prething;
}

function pushPreScenerySolid(name, xloc, yloc, repx, repy) {
	repx = repx || 1; repy = repy || 1;
	var prething = new PreThing(Global.map.refx + xloc, Global.map.refy - yloc, Sprite, name, [repx, repy]);
	prething.yloc -= prething.object.height;
	Global.map.area.presolids.push(prething);
	return prething;
}

function pushPreText(settings, xloc, yloc) {
	var prething = new PreThing(Global.map.refx + xloc, Global.map.refy - yloc, FuncSpawner, spawnText, settings);
	Global.map.area.presolids.push(prething);
	return prething;
}

function fillPreThing(type, xloc, yloc, numx, numy, width, height, extras, more) {
	var x = xloc, y;
	for(var i = 0, j; i < numx; ++i) {
		y = yloc;
		for(j = 0; j < numy; ++j) {
			pushPreThing(type, x, y, extras, more);
			y += height;
		}
		x += width;
	}
}

function pushPreFloor(xloc, yloc, length) {
	pushPreThing(Floor, xloc, yloc || 0, length || 1, DtB(yloc, 8));
}

function makeCeiling(xloc, num) {
	num = num || 1;
	for(var i=0; i<num; ++i) {
		pushPreThing(Brick, xloc + i * 8, Global.ceillev);
	}
}
function makeCeilingCastle(xloc, bwidth, bheight) {
	pushPreThing(Stone, xloc, Global.ceillev, bwidth || 1, bheight || 1);
}

function pushPreBridge(xloc, yloc, length, sides) {
	pushPreScenery("Railing", xloc, yloc, length * 2);
	pushPreThing(BridgeBase, xloc, yloc, length);
	if (sides instanceof Array) {
		if (sides[0]) pushPreThing(Stone, xloc - 8, yloc, 1, 64);
		if (sides[1]) pushPreThing(Stone, xloc + length * 8, yloc, 1, 64);
	}
}

function fillPreWater(xloc, yloc, width) {
	// Water is 3 x 5.5
	var dtb = DtB(yloc),
		numy = Global.ceil(dtb / 5.5),
		dtby = numy * 5;
	pushPreScenery("Water", xloc, yloc - 5.5, width * 4 / 3);
	pushPreScenery("WaterFill", xloc, yloc - dtby - 15.5, width * 4 / 3, numy + 2);
}

function pushPrePlatformGenerator(xloc, width, dir) {
	pushPreThing(PlatformGenerator, xloc, Global.ceilmax + 16, width, dir);
}

// settings = [platwidth, offy1, offy2] (offy is distance from top to platform)
function pushPreScale(xloc, yloc, width, settings) {
	var platwidth = settings[0],
		offx = platwidth * 2,
		offy1 = settings[1] + 1.5,
		offy2 = settings[2] + 1.5,
		me = pushPreThing(Scale, xloc, yloc, width).object;
	
	// Set the platforms
	platleft = pushPreThing(Platform, xloc - offx, yloc - offy1 * 4, platwidth, moveFallingScale).object;
	platright = pushPreThing(Platform, xloc + width * 4 - platwidth - 6, yloc - offy2 * 4, platwidth, moveFallingScale).object;
	platleft.parent = me; platright.parent = me;
	platleft.partner = platright; platright.partner = platleft;
	platleft.tension = offy1 * Global.unitsizet4 - Global.unitsize * 10; 
	platright.tension = offy2 * Global.unitsizet4 - Global.unitsize * 10;
	
	// Set the tension
	me.tensionleft = offy1 * Global.unitsize;
	me.tensionright = offy2 * Global.unitsize;
	
	// Add the strings
	platleft.string = pushPreScenery("String", xloc, yloc - offy1 * 4, 1, (offy1 - .5) * 4).object;
	platright.string = pushPreScenery("String", xloc + width * 4 - 1, yloc - offy2 * 4, 1, (offy2 - .5) * 4).object;
}

// worlds gives the pipe [X,Y]
// offset is how far between scrollblocker and main area (8 before first pipe)
// block is whether the screen should be blocked from scrolling to this
function pushPreWarpWorld(xloc, yloc, worlds, offset, block) {
	if (worlds.length == 1) {
		worlds = [-1, worlds[0], -1];
	}
	var startx = (offset || 0) + xloc + 10,
		len = worlds.length,
		pipe, i;
	
	Global.warp = pushPreThing(WarpWorld, xloc, yloc + Global.ceilmax).object;
	var title = pushPreText({innerText: "WELCOME TO WARP ZONE!", style: {visibility: "hidden"} }, startx, 58);
	Global.warp.texts.push(title.object);
	
	for(i = 0; i < len; ++i) {
		if (worlds[i] != -1) {
			Global.warp.pipes.push(pipe = pushPrePipe(startx, yloc, 24, true, worlds[i]).object);
			Global.warp.pirhanas.push(pipe.pirhana);
			if (worlds[i] instanceof Array)
				Global.warp.texts.push(pushPreText({innerText: worlds[i][0], style: {visibility: "hidden"}}, startx + 4, 38).object);
		}
		startx += 32;
	}
	
	if (block) {
		Global.block = pushPreThing(ScrollBlocker, xloc, Global.ceilmax);
		pushPreThing(ScrollBlocker, startx + 16, Global.ceilmax);
	}
}

// Can be called either in a map function or during gameplay
function goUnderWater() {
	if (Global.map) {
		if (Global.map.area) {
			if (Global.mario && !Global.map.shifting) {
				setAreaSetting(String(Global.map.area.setting || "") + " Underwater");
			}
			Global.map.area.underwater = true;
		}
		setMapGravity();
		Global.EventHandler.clearEvent(Global.map.bubbling);
		Global.map.bubbling = Global.EventHandler.addEventInterval(marioBubbles, 96, Infinity);
		Global.map.underwater = true;
	}
}

function goOntoLand() {
	if (Global.map) {
		if (Global.map.area) {
			if (Global.mario && !Global.map.shifting) {
				setAreaSetting(Global.map.area.setting.replace("Underwater", "") || "Overworld");
			}
			Global.map.area.underwater = false;
		}
		setMapGravity();
		Global.EventHandler.clearEvent(Global.map.bubbling);
		Global.map.underwater = false;
	}
}

function setMapGravity() {
	if (Global.mario) {
		if (Global.map.underwater) Global.mario.gravity = Global.gravity / 2.8;
		else Global.mario.gravity = Global.gravity;
	}
}

function setBStretch() {
	Global.bstretch = Global.gamescreen.width / 8 - 2; 
}

/*
 * Specific creation of often-used stuff
 */
// The detector has stuff stored in it, so the animation functions can use them
// Some worlds (8-3, for example) have an unusual distance from flag to castle
// To do: use typical FuncColliders instead of detectors
function endCastleOutside(xloc, yloc, castlevel, wall, dist) {
	xloc = xloc || 0;
	yloc = yloc || 0;
	if (castlevel) castlevel = Global.castlev;
	dist = dist || 20;
	var detect = pushPreThing(FlagDetector, xloc + 7, yloc + 108).object,
		detect2 = pushPreThing(CastleDoorDetector, xloc + 60 + (Global.castlev == 0) * 8, 8).object;
	detect.flag = pushPreThing(Flag, xloc + .5, yloc + 79.5).object;
	detect.stone = pushPreThing(Stone, xloc + 4, yloc + 8).object;
	detect.top = pushPreThing(FlagTop, xloc + 6.5, 84).object;
	detect.pole = pushPreThing(FlagPole, xloc + 8, 80).object;
	
	// detect2.castle = pushPreScenery("Castle", xloc + dist, yloc + castlevel).object;
	if (wall) pushPreScenery("CastleWall", xloc + dist + 72, yloc, wall);
	if (castlevel == 0) shiftHoriz(detect2, Global.unitsizet8);
	
	pushPreCastle(xloc + dist + 16, yloc, castlevel);
}

function startCastleInside() {
	pushPreThing(Stone, 0, 88, 5, 3);
	pushPreThing(Stone, 0, 48, 3, DtB(48, 8));
	pushPreThing(Stone, 24, 40, 1, DtB(40, 8));
	pushPreThing(Stone, 32, 32, 1, DtB(32, 8));
}

function endCastleInside(xloc, last) {
	var collider = pushPreThing(FuncCollider, xloc + 104, 48, CastleAxeFalls, [16, 24]).object,
		axe = collider.axe = pushPreThing(CastleAxe, xloc + 104, 40).object;
	axe.bridge = pushPreThing(CastleBridge, xloc, 24, 13).object;
	axe.chain = pushPreThing(CastleChain, xloc + 96.5, 32).object;
	axe.bowser = pushPreThing(Bowser, xloc + 69, 42).object;
	pushPreThing(ScrollBlocker, xloc + 112, Global.ceilmax); // 104 + 16
	
	pushPreThing(Stone, xloc, 88, 32);
	fillPreWater(xloc, 0, 26);
	pushPreFloor(xloc + 104, 32, 3);
	pushPreFloor(xloc + 104, 0, 19);
	pushPreThing(Stone, xloc + 112, 80, 2, 3);
	
	// Stop that scrolling... again
	pushPreThing(ScrollBlocker, xloc + 256, Global.ceilmax);
	
	// Place the NPC
	endCastleInsideFinal(xloc, last);
}

function endCastleInsideFinal(xloc, last) {
	var stopper = pushPreFuncCollider(xloc + 180, collideCastleNPC).object,
		style = { visibility: "hidden" },
		text, i;
	// Either put Peach... 
	if (last) {
		pushPreThing(Peach, xloc + 194, 13).object;
		text = stopper.text = [
			pushPreText({innerHTML: "THANK YOU MARIO!", style: style}, xloc + 160, 66).object,
			pushPreText({innerHTML: "YOUR QUEST IS OVER.<BR>WE PRESENT YOU A NEW QUEST.", style: style}, xloc + 148, 50).object,
			pushPreText({innerHTML: "PRESS BUTTON B<BR>TO SELECT A WORLD.", style: style}, xloc + 148, 26).object
		];
	} else {
		// ...or that jerk Toad
		pushPreThing(Toad, xloc + 194, 12).object;
		text = stopper.text = [
			pushPreText({innerHTML: "THANK YOU MARIO!", style: style}, xloc + 160, 66).object,
			pushPreText({innerHTML: "BUT OUR PRINCESS IS IN<BR>ANOTHER CASTLE!", style: style}, xloc + 148, 50).object
		];
	}
}

function pushPreSectionPass(xloc, yloc, width, height, secnum) {
	var passer = pushPreThing(Collider, xloc, yloc, [width, height], [sectionPass, sectionColliderInit]).object,
		secnum = Global.map.area.sections.current || 0,
		section = Global.map.area.sections[secnum];
	
	if (section.numpass) ++section.numpass;
	else section.numpass = 1;
	
	if (!section.colliders) section.colliders = [passer];
	else section.colliders.push(passer);
}
function pushPreSectionFail(xloc, yloc, width, height, secnum) {
	var failer = pushPreThing(Collider, xloc, yloc, [width, height], [sectionFail, sectionColliderInit]).object,
		secnum = Global.map.area.sections.current || 0,
		section = Global.map.area.sections[secnum];
	
	if (!section.colliders) section.colliders = [failer];
	else section.colliders.push(failer);
}
function pushCastleDecider(xloc, secnum) {
	pushPreThing(castleDecider, xloc, Global.ceilmax, xloc, secnum);
}
function sectionColliderInit(me) {
	me.sections = Global.map.area.sections;
	me.parent = me.sections[me.sections.current];
	me.movement = false;
}
function sectionPass(character, collider) {
	if (character.type != "mario") return false;
	collider.nocollide = true;
	var parent = collider.parent;
	if (--parent.numpass) return;
	activateSection(collider.parent, true);
}
function sectionFail(character, collider) {
	if (character.type != "mario") return false;
	collider.nocollide = true;
	
	activateSection(collider.parent, false);
}
function activateSection(parent, status) {
	var colliders = parent.colliders;
	for(var i=colliders.length-1; i>=0; --i) {
		killNormal(colliders[i]);
	}
	
	parent.activated = true;
	parent.passed = status;
}

function pushPreTree(xloc, yloc, width) {
	pushPreThing(TreeTop, xloc, yloc, width);
	// Although the tree trunks in later trees overlap earlier ones, it's ok because
	// the pattern is indistinguishible when placed correctly.
	var dtb = DtB(yloc);
	pushPreScenerySolid("TreeTrunk", xloc + 8, yloc - dtb - 8, width - 2 , dtb / 8); 
}
function pushPreShroom(xloc, yloc, width) {
	pushPreThing(ShroomTop, xloc, yloc, width);
	var dtb = DtB(yloc - 4);
	pushPreScenery("ShroomTrunk", xloc + width * 4 - 4, yloc - dtb - 8, 1, dtb / 8);
}

function pushPrePipe(xloc, yloc, height, pirhana, intoloc, exitloc) {
	if (!isFinite(height)) {
		height = Global.gamescreen.height;
		yloc -= Global.gamescreen.height;
	}
	
	var prepipe = pushPreThing(Pipe, xloc, yloc + height, height / 8, intoloc),
		pipe = prepipe.object/*,
		vert = pushPreThing(PipeVertical, xloc, yloc + height - 8, height - 8)*/;
	
	if (pirhana) pipe.pirhana = pushPreThing(Pirhana, xloc + 4, yloc + height + 12).object;
	if (exitloc) {
		Global.map.locs[exitloc].entrything = pipe;
		Global.map.locs[exitloc].xloc = xloc;
	}
	return prepipe;
}

function pushPreCastle(xloc, yloc, big) {
	xloc = xloc || 0;
	yloc = yloc || 0;
	if (big) pushPreCastleBig(xloc, yloc);
	else pushPreCastleSmall(xloc, yloc);
}

// Note: off by 16 or so
function pushPreCastleBig(xloc, yloc) {
	var i, j;
	pushPreCastleSmall(xloc + 16, yloc + 48);
	// Top alternate fillings
	for(i = 0; i < 3; ++i) {
		for(j = 0; j < 2; ++j) {
			pushPreScenerySolid("BrickPlain", xloc + 16 + i * 16, yloc + 24 + j * 8);
		}
	}
	// Top alternate doors
	for(i = 0; i < 2; ++i) {
		pushPreScenerySolid("CastleDoor", xloc + 24 + i * 16, yloc + 24);
	}
	// Top half filling
	for(i = 0; i < 5; ++i) {
		if (i == 2) continue; 
		else pushPreScenerySolid("BrickHalf", xloc + 16 + i * 8, yloc + 48);
	}
	
	// Left railings
	for(i = 0; i < 2; ++i) {
		pushPreScenerySolid("CastleRailing", xloc + i * 8, yloc + 44);
	}
	// Middle railings
	for(i = 0; i < 5; ++i) {
		pushPreScenerySolid("CastleRailingFilled", xloc + 16 + i * 8, yloc + 44);
	}
	// Right railings
	for(i = 5; i < 7; ++i) {
		pushPreScenerySolid("CastleRailing", xloc + 16 + i * 8, yloc + 44);
	}
	
	// Bottom alternate fillings
	for(i = 0; i < 2; ++i) {
		for(j = 0; j < 3; ++j) {
			pushPreScenerySolid("BrickPlain", xloc + 24 + i * 16, yloc + j * 8);
		}
	}
	// Bottom alternate doors
	for(i = 0; i < 3; ++i) {
		pushPreScenerySolid("CastleDoor", xloc + 16 + i * 16, yloc);
	}
		
	// Left fill
	for(i = 0; i < 2; ++i) {
		for(j = 0; j < 5; ++j) {
			pushPreScenerySolid("BrickPlain", xloc + i * 8, yloc + j * 8);
		}
		pushPreScenerySolid("BrickHalf", xloc + i * 8, yloc + 40);
	}
	
	// Right fill
	for(i = 0; i < 2; ++i) {
		for(j = 0; j < 5; ++j) {
			pushPreScenerySolid("BrickPlain", xloc + 56 + i * 8, yloc + j * 8);
		}
		pushPreScenerySolid("BrickHalf", xloc + 56 + i * 8, yloc + 40);
	}
	
	for(i = 0; i < 3; ++i) {
		for(j = 0; j < 2; ++j) {
			pushPreScenerySolid("BrickHalf", xloc + 16 + i * 16, yloc + 20 + j * 20);
		}
	}
}

// To do: y u no work scenery
function pushPreCastleSmall(xloc, yloc) {
	var i, j;
	
	// Top railing
	for(i = 0; i < 3; ++i) {
		pushPreScenerySolid("CastleRailing", xloc + 8 + i * 8, yloc + 36);
	}
	// Top bricking
	for(i = 0; i < 2; ++i) {
		pushPreScenerySolid("CastleTop", xloc + 8 + i * 12, yloc + 24);
	}
	// Med railing
	pushPreScenerySolid("CastleRailing", xloc, yloc + 20);
	for(i = 1; i <= 3; ++i) {
		pushPreScenerySolid("CastleRailingFilled", xloc + i * 8, yloc + 20);
	}
	pushPreScenerySolid("CastleRailing", xloc + 32, yloc + 20);
	// Base filling left
	for(i = 0; i < 2; ++i) { // x
		pushPreScenerySolid("BrickHalf", xloc + i * 8, yloc);
		for(j = 0; j < 2; ++j) {
			// y
			pushPreScenerySolid("BrickPlain", xloc + i * 8, yloc + 4 + j * 8);
		}
	}
	// Base filling right
	for(i = 0; i < 2; ++i) { // x
		pushPreScenerySolid("BrickHalf", xloc + 24 + i * 8, yloc);
		for(j = 0; j < 2; ++j) {
			// y
			pushPreScenerySolid("BrickPlain", xloc + 24 + i * 8, yloc + 4 + j * 8);
		}
	}
	// Door
	pushPreScenerySolid("CastleDoor", xloc + 16, yloc);
}

function pushPreFuncCollider(position, func) {
	// Fancy positions are [xloc, yloc, width, height]
	if (position instanceof Array) {
		console.log("position", position);
		return pushPreThing(FuncCollider, position[0], position[1], func, [position[2], position[3]]);
	} else {
		// Normally position is xloc
		return pushPreThing(FuncCollider, position, Global.ceilmax + 40, func);
	}
}

function pushPreFuncSpawner(xloc, func) {
	return pushPreThing(FuncSpawner, xloc, Global.jumplev1, func);
}

function zoneEnableLakitu() {
	Global.map.zone_lakitu = true;
	enterLakitu();
}

function zoneDisableLakitu() {
	if (!Global.map.has_lakitu) return;// killNormal(me);
	
	var lakitu = Global.map.has_lakitu;
	Global.map.zone_lakitu = Global.map.has_lakitu = false;
	
	if (!lakitu.lookleft) {
		lakitu.lookleft = true;
		removeClass(lakitu, "flipped");
	}
	lakitu.movement = function(me) {
		me.xvel = Global.max(me.xvel - Global.unitsized32, Global.unitsize * -1);
	};
}

function zoneStartCheeps(xloc) {
	pushPreFuncCollider(xloc, zoneEnableCheeps);
}

function zoneStopCheeps(xloc) {
	pushPreFuncCollider(xloc, zoneDisableCheeps);
}

function zoneEnableCheeps(me) {
	if (Global.map.zone_cheeps || !me.mario) return;
	startCheepSpawn();
}
function zoneDisableCheeps(me) {
	if (!me.mario) return;
	Global.map.zone_cheeps = false;
}

// This is for patterns
// Sprites will have optional inputs for how many vertically/horizontally
function pushPrePattern(name, xloc, yloc, reps) {
	var xpos = xloc,
		pattern = Global.Scenery.patterns[name],
		info, i, j;
	for(i = 0; i < reps; ++i) {
		for(j in pattern) {
			// Get the sprite information
			info = pattern[j];
			if (!(info instanceof Array)) continue;
			//[0] is name, [1/2] are x/yloc, [3/4] are repx/y (1 by default)
			pushPreScenery(info[0], xpos + info[1], yloc + info[2], info[3], info[4]);
		}
		xpos += pattern.width;
	}
}

/* Misc. Helpers */

// Distance from the yloc to botmax
//// Assumes yloc is in the form given by mapfuncs - distance from floor
function DtB(yloc, divider) {
	return (yloc + Global.botmax) / (divider || 1);
}

// Used for the editor
function BlankMap(map) {
	map.locs = [ new Location(0, entryBlank) ];
	map.areas = [ new Area("Overworld", function() {
		setTimeout(refillCanvas, Global.timer + 2);
	}) ];
}

/* Random Maps */
function randMapType(map) {
	map.locs = [
		new Location(0, entryRandom)
	];
	map.areas = [
		new Area(map.areatype, function() {
			setLocationGeneration(0);
			if (map.randname == "Underwater") {
				goUnderWater();
				// To do: make a unified function for adding in water & blocker, by the block width
				pushPreScenery("Water", 0, Global.ceilmax - 21, (map.startwidth + 1) * 8 / 3, 1)
				pushPreThing(WaterBlock, 0, Global.ceilmax, (map.startwidth + 1) * 8);
			}
			// if (map.randname == "Sky")
				// map.locs[0].entry = enterCloudWorld
		})
	];
	map.treefunc = randTrue(3) ? pushPreTree : pushPreShroom;
	map.treeheight = map.treelev = map.sincechange = 0;
}

function randDayNight() {
	return randTrue(3) ? "" : " Night";
}

function WorldRandomOverworld(map) {
	map.random = true;
	map.randtype = pushRandomSectionOverworld;
	map.randname = "Overworld";
	map.areatype = "Overworld" + randDayNight();
	map.firstRandomThings = function(map) {
		// castle added by entrancetype
		for(var i=0; i<10; ++i) {
			if (randTrue()) pushRandomGroundScenery(i * 8);
		}
	}
	map.startwidth = 14;
	map.onlysmartkoopas = false;
	randMapType(map);
}

function WorldRandomTrees(map) {
	map.random = true;
	map.randtype = pushRandomSectionTrees;
	map.randname = "Overworld";
	map.areatype = "Overworld" + randDayNight();
	map.firstRandomThings = function(map) {
		map.treefunc(100, (map.treelev = randTrue() + 2) * 8, randTrue() + 4);
		map.startwidth += 7;
	}
	map.startwidth = 11;
	map.onlysmartkoopas = randTrue();
	randMapType(map);
}

function WorldRandomUnderworld(map) {
	map.random = true;
	map.randtype = pushRandomSectionUnderworld;
	map.randname = map.areatype = "Underworld";
	map.firstRandomThings = function(map) {
		fillPreThing(Brick, 0, 8, 1, 11, 8, 8);
	}
	map.startwidth = randTrue(3) + 7;
	map.onlysmartkoopas = true;
	map.respawndist = 42;
	map.entrancetype = "Up";
	randMapType(map);
}

function WorldRandomUnderwater(map) {
	map.random = true;
	map.randtype = pushRandomSectionUnderwater;
	map.randname = "Underwater";
	map.areatype = "Underwater" + randDayNight();
	map.firstRandomThings = function(map) {}
	map.startwidth = randTrue(3) + 7;
	map.entrancetype = "Up";
	map.countCheep = map.countBlooper = 0;
	map.respawndist = 42;
	map.onlysmartkoopas = true;
	randMapType(map);
}

function WorldRandomBridge(map) {
	map.random = true;
	map.randtype = startRandomSectionBridge;
	map.randname = "Overworld";
	map.areatype = "Overworld" + randDayNight();
	map.firstRandomThings = function(map) {}
	map.startwidth = 14;
	randMapType(map);
}

function WorldRandomSky(map) {
	map.random = true;
	map.randtype = startRandomSectionSky;
	map.randname = "Sky";
	map.areatype = "Sky" + randDayNight();
	map.entrancetype = "Vine";
	map.firstRandomThings = function(map) {
		pushPreThing(Stone, 0, 0, 4);
	}
	map.startwidth = 4;
	map.nofloor = true;
	randMapType(map);
}

function WorldRandomCastle(map) {
	map.random = true;
	map.randtype = startRandomSectionCastle;
	map.randname = map.areatype = map.entrancetype = "Castle";
	map.firstRandomThings = function(map) {
		startCastleInside();
		startCastle();
	};
	map.respawndist = 35;
	randMapType(map);
}

/* Things.js */
// Stores Thing creators, functions, and manipulators

/* Typical Things */
// There is a lot of information stored in each of these.
// Variable amounts of arguments are passed to the constructor:
// * var mything = new Thing(ConstructionFunc[, arg1[, arg2[, ...]]]);
// * var mygoomb = new Thing(Goomba);
// * var mykoopa = new Thing(Koopa, true);

function Thing(type) {
	// If there isn't a type, don't do anything
	if (arguments.length == 0 || !type) return;
	
	// Otherwise make this based off the type
	// Make sure this is legally created
	var self = this === window ? new Thing() : this,
		args = self.args = Global.arrayMake(arguments);
	args[0] = self;
	type.apply(self, args);
	self.alive = true;
	self.placed = this.outerok = 0;
	self.xvel = this.xvel || 0;
	self.yvel = this.yvel || 0;
	if (self.tolx == null) self.tolx = 0;
	if (self.toly == null) self.toly = Global.unitsized8;
	
	self.movement = self.movement; // why..?
	self.collide = self.collide || function() {}; // To do: why does taking this out mess things up?
	self.death = self.death || killNormal;
	self.animate = self.animate || emergeUp;
	
	if (self.width * Global.unitsize < Global.quads.width && self.height * Global.unitsize < Global.quads.height) {
		// self could be done with modular stuff... beh
		self.maxquads = 4;
	} else {
		self.maxquads = Global.quads.length;
	}
	
	self.quads = new Array(self.maxquads)
	self.overlaps = [];
	
	self.title = self.title || type.name;
	self.spritewidth = self.spritewidth || self.width;
	self.spriteheight = self.spriteheight || self.height;
	self.sprite = "";
	
	try {
		setContextStuff(self, self.spritewidth, self.spriteheight);
	} catch(err) {
		console.log("Thing context fail", err, self.title, self);
		setTimeout(function() { setContextStuff(self, self.spritewidth, self.spriteheight); }, 1);
	}
	
	return self;
}

function setContextStuff(me, spritewidth, spriteheight) {
	me.spritewidthpixels = me.spritewidth * Global.unitsize;
	me.spriteheightpixels = me.spriteheight * Global.unitsize;
	me.canvas = getCanvas(me.spritewidthpixels, me.spriteheightpixels);
	me.context = me.canvas.getContext("2d", { willReadFrequently: true });
	me.imageData = me.context.getImageData(0, 0, me.spritewidthpixels, me.spriteheightpixels);
	me.sprite_type = me.sprite_type || "neither";
	canvasDisableSmoothing(me, me.context);
}

// A helper function to make a Thing given the type and arguments
function ThingCreate(type, args) {
	var newthing = new Thing();
	Thing.apply(newthing, [type].concat(args));
	return newthing;
}

/* Thing Functions */

function setCharacter(me, type) {
	me.type = type.split(" ")[0]; // so 'shell smart' becomes 'shell'
	me.resting = me.under = me.undermid = false;
	me.alive = me.character = true;
	me.libtype = "characters";
	setClassInitial(me, "character " + type);
}

function setSolid(me, name) {
	me.type = "solid";
	me.name = name;
	me.solid = me.alive = true;
	me.speed = me.speed || 0; // vertical speed
	me.collide = me.collide || characterTouchedSolid;
	me.bottomBump = me.bottomBump ||  function() { /*play("Bump");*/ };
	me.action = me.action || function() {};
	me.jump = me.jump || function() {};
	me.spritewidth = me.spritewidth || 8;
	me.spriteheight = me.spriteheight || 8;
	me.libtype = "solids";
	setClassInitial(me, "solid " + name);
}

function setScenery(me, name) {
	setSolid(me, name);
	me.libtype = "scenery";
}

// The primary function for placing a thing on the map
function addThing(me, left, top) {
	// If me is a function (e.g. 'addThing(Goomba, ...)), make a new thing with that
	if (me instanceof Function) {
		me = new Thing(me);
	}
	placeThing(me, left, top);
	Global[me.libtype].push(me);
	me.placed = true;
	determineThingQuadrants(me);
	if (me.onadding) me.onadding(); // generally just for sprite cycles
	setThingSprite(me);
	Global["last_" + (me.title || me.group || "unknown")] = me;
	return me;
}

// Called by addThing for simple placement
function placeThing(me, left, top) {
	setLeft(me, left);
	setTop(me, top);
	updateSize(me);
	return me;
}

function addText(html, left, top) {
	var element = Global.createElement("div", {
			innerHTML: html,
			className: "text",
			left: left,
			top: top,
			onclick: Global.canvas.onclick, 
			// onclick: body.onclick || canvas.onclick, 
			style: {
				marginLeft: left + "px",
				marginTop: top + "px"
			}
		});

	window.find("content").append(element);
	
	Global.texts.push(element);
	return element;
}

// Called by funcSpawner placed by pushPreText
// Kills the text once it's too far away
function spawnText(me, settings) {
	var element = me.element = addText("", me.left, me.top);
	if (typeof(settings) == "object") Global.proliferate(element, settings);
	else element.innerHTML = settings;
	me.movement = false;
}

// Set at the end of shiftToLocation
function checkTexts() {
	var delx = Global.quads.delx,
		element, me, i;
	for(i = Global.texts.length - 1; i >= 0; --i) {
		me = Global.texts[i]
		element = Global.texts[i].element || me;
		me.right = me.left + element.clientWidth
		if (me.right < delx) {
			// body.removeChild(element);
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
			killNormal(me);
			deleteThing(element, Global.texts, i);
		}
	}
}

// To do: make this use a variable number of arguments!
function pushPreThing(type, xloc, yloc, extras, more) {
	var prething = new PreThing(Global.map.refx + xloc, Global.map.refy - yloc, type, extras, more);
	if (prething.object.solid) {
		Global.map.area.width = Global.max(Global.map.area.width, prething.xloc + prething.object.width);
		Global.map.area.presolids.push(prething);
	} else {
		Global.map.area.precharacters.push(prething);
	}
	return prething;
}

/*
 * Characters (except Mario, who has his own .js)
 */
 

/*
 * Items
 */

function Mushroom(me, type) {
	me.group = "item";
	me.width = me.height = 8;
	me.speed = .42 * Global.unitsize;
	me.animate = emergeUp;
	me.movement = moveSimple;
	me.collide = collideFriendly;
	me.jump = mushroomJump;
	me.death = killNormal;
	me.nofire = true;
	
	var name = "mushroom";
	switch(type) {
		case 1: me.action = gainLife; name += " gainlife"; break;
		case -1: me.action = killMario; name += " death"; break;
		default: me.action = marioShroom; name += " regular"; break;
	}
	setCharacter(me, name);
}

function mushroomJump(me) {
	me.yvel -= Global.unitsize * 1.4;
	me.top -= Global.unitsize;
	me.bottom -= Global.unitsize;
	updatePosition(me);
}

function FireFlower(me) {
	me.group = "item";
	me.width = me.height = 8;
	me.animate = emergeUp;
	me.collide = collideFriendly;
	me.action = marioShroom;
	me.nofall = me.nofire = true;
	me.movement = false;
	setCharacter(me, "fireflower");
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "four"]);
}

function FireBall(me, moveleft) {
	me.group = "item";
	me.width = me.height = 4;
	me.speed = Global.unitsize * 1.75;
	me.gravity = Global.gravity * 1.56;
	me.jumpheight = Global.unitsize * 1.56;
	me.nofire = me.nostar = me.collide_primary = true;
	me.moveleft = moveleft;
	me.animate = emergeFire;
	me.movement = moveJumping;
	me.collide = fireEnemy;
	me.death = fireExplodes;
	setCharacter(me, "fireball");
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "four"], 4);
}

function fireEnemy(enemy, me) {
	if (!me.alive || me.emerging || enemy.nofire || enemy.height <= Global.unitsize) return;

	if (enemy.solid) {
		playLocal("Bump", me.right);
	}
	else {
		playLocal("Kick", me.right);
		enemy.death(enemy, 2);
		scoreEnemyFire(enemy);
	}
	me.death(me);
}

function fireDeleted() {
	--Global.mario.numballs;
}

function fireExplodes(me) {
	var fire = new Thing(Firework);
	addThing(fire, me.left - fire.width / 2, me.top - fire.height / 2);
	fire.animate();
	killNormal(me);
}

function Star(me) { // GOLDEEN GOLDEEN
	me.group = "item";
	me.width = 7;
	me.height = 8;
	me.speed = Global.unitsize * .56;
	me.jumpheight = Global.unitsize * 1.17;
	me.gravity = Global.gravity / 2.8;
	me.animate = emergeUp;
	me.movement = moveJumping;
	me.collide = collideFriendly;
	me.action = marioStar;
	me.death = killNormal;
	me.nofire = true;
	setCharacter(me, "star item"); // Item class so mario's star isn't confused with this
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "four"], 0, 7);
}

function Shell(me, smart) {
	me.width = 8; me.height = 7;
	me.group = "item";
	me.speed = Global.unitsizet2;
	me.collide_primary = true;
	me.moveleft = me.xvel = me.move = me.hitcount = me.peeking = me.counting = me.landing = me.enemyhitcount = 0;
	me.smart = smart;
	me.movement = moveShell;
	me.collide = hitShell;
	me.death = killFlip;
	me.spawntype = Koopa;
	var name = "shell" + (smart ? " smart" : " dumb");
	setCharacter(me, name);
}

function hitShell(one, two) {
	// Assuming two is shell
	if (one.type == "shell" && two.type != one.type) return hitShell(two, one);
	
	switch(one.type) {
		// Hitting a wall
		case "solid": 
			if (two.right < one.right) {
				playLocal("Bump", one.left);
				setRight(two, one.left);
				two.xvel = -two.speed;
				two.moveleft = true;
			} else {
				playLocal("Bump", one.right);
				setLeft(two, one.right);
				two.xvel = two.speed;
				two.moveleft = false;
			}
			break;
		
		// Hitting Mario
		case "mario":
			var shelltoleft = objectToLeft(two, one),
				mariojump = one.yvel > 0 && one.bottom <= two.top + Global.unitsizet2;
			
			// Star Mario is pretty easy
			if (one.star) {
				scoreMarioShell(one, two);
				return two.death(two, 2);
			}
			
			// If the shell is already being landed on by Mario:
			if (two.landing) {
				// If the recorded landing direction hasn't changed:
				if (two.shelltoleft == shelltoleft) {
					// Increase the landing count, and don't do anything.
					++two.landing;
					// If it's now a count of 1, score the shell
					if (two.landing == 1) scoreMarioShell(one, two);
					// Reduce that count very soon
					Global.EventHandler.addEvent(function(two) { --two.landing; }, 2, two);
				}
				// Otherwise, the shell has reversed direction during land. Mario should die.
				else {
					// This prevents accidentally scoring Mario's hit
					Global.mario.death(Global.mario);
				}
				return;
			}
			
			// Mario is kicking the shell (either hitting a still shell or jumping onto a shell)
			if (two.xvel == 0 || mariojump) {
				// Mario has has hit the shell in a dominant matter. You go, Mario!
				two.counting = 0;
				scoreMarioShell(one, two);
				// The shell is peeking
				if (two.peeking) {
					two.peeking = false;
					removeClass(two, "peeking");
					two.height -= Global.unitsized8;
					updateSize(two);
				}
				
				// If the shell's xvel is 0 (standing still)
				if (two.xvel == 0) {
					if (shelltoleft) {
						two.moveleft = true;
						two.xvel = -two.speed;
					} else {
						two.moveleft = false;
						two.xvel = two.speed;
					}
					// Make sure to know not to kill Mario too soon
					++two.hitcount;
					Global.EventHandler.addEvent(function(two) { --two.hitcount; }, 2, two);
				}
				// Otherwise set the xvel to 0
				else two.xvel = 0;
				
				// Mario is landing on the shell (movements, xvels already set)
				if (mariojump) {
					play("Kick");
					// The shell is moving
					if (!two.xvel) {
						jumpEnemy(one, two);
						one.yvel *= 2;
						scoreMarioShell(one, two);
						setBottom(one, two.top - Global.unitsize, true);
					}
					// The shell isn't moving
					else {
						// shelltoleft ? setRight(two, one.left) : setLeft(two, one.right);
						scoreMarioShell(one, two);
					}
					++two.landing;
					two.shelltoleft = shelltoleft;
					Global.EventHandler.addEvent(function(two) { --two.landing; }, 2, two);
				}
			}
			else {
				// Since the shell is moving and Mario isn't, if the xvel is towards Mario, that's a death
				if (!two.hitcount && ((shelltoleft && two.xvel < 0) || (!shelltoleft && two.xvel > 0)))
					one.death(one);
			}
			break;
		
		// Shell hitting another shell
		case "shell":
			// If one is moving...
			if (one.xvel != 0) {
				// and two is also moving, knock off each other
				if (two.xvel != 0) {
					var temp = one.xvel;
					shiftHoriz(one, one.xvel = two.xvel);
					shiftHoriz(two, two.xvel = temp);
				}
				// otherwise one kills two
				else {
					score(two, 500);
					two.death(two);
				}
			}
			// otherwise two kills one
			else if (two.xvel != 0) {
				score(one, 500);
				one.death(one);
			}
			break;
		
		default:
			switch(one.group) {
				case "enemy":
					if (two.xvel) {
						// If the shell is moving, kill the enemy
						if (one.type.split(" ")[0] == "koopa") {
							// If the enemy is a koopa, make it a shell
							// To do: automate this for things with shells (koopas, beetles)
							var spawn = new Thing(Shell, one.smart);
							addThing(spawn, one.left, one.bottom - spawn.height * Global.unitsize);
							killFlip(spawn);
							killNormal(one);
						} // Otherwise just kill it normally
						else killFlip(one);
						
						play("Kick");
						score(one, findScore(two.enemyhitcount), true);
						++two.enemyhitcount;
					} // Otherwise the enemy just turns around
					else one.moveleft = objectToLeft(one, two);
				break;
				
				case "item":
					if (one.type == "shell") {
						if (two.xvel) killFlip(one);
						if (one.xvel) killFlip(two);
					}
					else return;
				break;
			}
			break;
	}
}

function moveShell(me) {
	if (me.xvel != 0) return;
	
	if (++me.counting == 350) { 
		addClass(me, "peeking");
		me.peeking = true;
		me.height += Global.unitsized8;
		updateSize(me);
	} else if (me.counting == 490) {
		var spawn = new Thing(me.spawntype, me.smart);
		addThing(spawn, me.left, me.bottom - spawn.height * Global.unitsize);
		killNormal(me);
	}
}

// Assuming one is Mario, two is item
function collideFriendly(one, two) {
	if (one.type != "mario") return;
	if (two.action) two.action(one);
	two.death(two);
}

/*
 * Enemies
 */
function jumpEnemy(me, enemy) {
	if (me.keys.up) me.yvel = Global.unitsize * -1.4;
	else me.yvel = Global.unitsize * -.7;
	me.xvel *= .91;
	play("Kick");
	if (enemy.group != "item" || enemy.type == "shell")
		score(enemy, findScore(me.jumpcount++ + me.jumpers), true);
	++me.jumpers;
	Global.EventHandler.addEvent(function(me) { --me.jumpers; }, 1, me);
}

function Goomba(me) {
	me.width = me.height = 8;
	me.speed = Global.unitsize * .21;
	me.toly = Global.unitsize;
	me.moveleft = me.noflip = true;
	me.smart = false;
	me.group = "enemy";
	me.movement = moveSimple;
	me.collide = collideEnemy;
	me.death = killGoomba;
	setCharacter(me, "goomba");
	Global.EventHandler.addSpriteCycleSynched(me, [unflipHoriz, flipHoriz]);
}

// Big: true if it should skip squash (fire, shell, etc)
function killGoomba(me, big) {
	if (!me.alive) return;
	if (!big) {
		var squash = new Thing(DeadGoomba);
		addThing(squash, me.left, me.bottom - squash.height * Global.unitsize);
		Global.EventHandler.addEvent(killNormal, 21, squash);
		killNormal(me);
	}
	else killFlip(me);
}

function DeadGoomba(me) {
	me.width = 8;
	me.height = 4;
	me.movement = false;
	me.nocollide = me.nocollide = true;
	me.death = killNormal;
	setSolid(me, "deadGoomba");
}

// If fly == true, then it's jumping
// If fly is otherwise true (an array), it's floating
function Koopa(me, smart, fly) {
	me.width = 8;
	me.height = 12;
	me.speed = me.xvel = Global.unitsize * .21;
	me.moveleft = me.skipoverlaps = true;
	me.group = "enemy";
	me.smart = smart; // will it run off the edge
	var name = "koopa"; 
	name += (me.smart ? " smart" : " dumb");
	if (me.smart) name+= " smart";
	if (fly) {
		name += " flying";
		me.winged = true;
		if (fly == true) {
			me.movement = moveJumping;
			me.jumpheight = Global.unitsize * 1.17;
			me.gravity = Global.gravity / 2.8;
		}
		else {
			me.movement = moveFloating;
			me.ytop = me.begin = fly[0] * Global.unitsize;
			me.ybot = me.end = fly[1] * Global.unitsize;
			me.nofall = me.fly = true;
			me.changing = me.xvel = 0;
			me.yvel = me.maxvel = Global.unitsized4;
		}
	}
	else {
		name += " regular";
		if (me.smart) me.movement = moveSmart;
		else me.movement = moveSimple;
	}
	me.collide = collideEnemy;
	me.death = killKoopa; 
	setCharacter(me, name);
	Global.EventHandler.addSpriteCycleSynched(me, ["one", "two"]);
	me.toly = Global.unitsizet2;
}

// Big: true if it should skip shell (fire, shell, etc)
function killKoopa(me, big) {
	if (!me.alive) return;
	var spawn;
	if ((big && big != 2) || me.winged) spawn = new Thing(Koopa, me.smart);
	else spawn = new Thing(Shell, me.smart);
	// Puts it on stack, so it executes immediately after upkeep
	Global.EventHandler.addEvent(
		function(spawn, me) { 
			addThing(spawn, me.left, me.bottom - spawn.height * Global.unitsize);
			spawn.moveleft = me.moveleft;
		},
		0,
		spawn, me
	);
	killNormal(me);
	if (big == 2) killFlip(spawn);
	else return spawn;
}

function Pirhana(me, evil) {
	me.width = 8;
	me.height = 12;
	me.counter = 0;
	me.countermax = me.height * Global.unitsize;
	me.dir = Global.unitsized8;
	me.toly = Global.unitsizet8;
	me.nofall = me.deadly = me.nocollidesolid = me.repeat = true;
	me.group = "enemy";
	me.collide = collideEnemy;
	me.death = killNormal;
	me.movement = movePirhanaInit;
	me.death = killPirhana;
	setCharacter(me, "pirhana");
}

// The visual representation of a pirhana is visual_scenery; the collider is a character
function movePirhanaInit(me) {
	me.hidden = true;
	var scenery = me.visual_scenery = new Thing(Sprite, "Pirhana");
	addThing(scenery, me.left, me.top);
	Global.EventHandler.addSpriteCycle(scenery, ["one", "two"]);
	me.movement = movePirhanaNew;
	// Pirhanas start out minimal
	movePirhanaNew(me, me.height * Global.unitsize);
}

// Moving a pirhana moves both it and its scenery
function movePirhanaNew(me, amount) {
	amount = amount || me.dir;
	me.counter += amount;
	shiftVert(me, amount);
	shiftVert(me.visual_scenery, amount);
	
	// Height is 0
	if (me.counter <= 0 || me.counter >= me.countermax) {
		me.movement = false;
		me.dir *= -1;
		Global.EventHandler.addEvent(movePirhanaRestart, 35, me);
	}
}

function movePirhanaRestart(me) {
	var marmid = getMidX(Global.mario);
	// If Mario's too close and counter == 0, don't do anything
	if (me.counter >= me.countermax && marmid > me.left - Global.unitsizet8 && marmid < me.right + Global.unitsizet8) {
		return setTimeout(() => movePirhanaRestart(me), 7);
	}
	// Otherwise start again
	me.movement = movePirhanaNew;
}

function killPirhana(me) {
	if (!me && !(me = this)) return;
	killNormal(me);
	killNormal(me.visual_scenery);
}

// Really just checks toly for pirhanas.
function marioAboveEnemy(mario, enemy) {
	if (mario.bottom < enemy.top + enemy.toly) return true;
	return false;
}

// Assuming one should generally be Mario/thing, two is enemy
function collideEnemy(one, two) {
	// Check for life
	if (!characterIsAlive(one) || !characterIsAlive(two)) return;
	
	// Check for nocollidechar
	if ((one.nocollidechar && !two.mario) || (two.nocollidechar && !one.mario)) return;
	
	// Items
	if (one.group == "item") {
		if (one.collide_primary) return one.collide(two, one);
		// if (two.height < Global.unitsized16 || two.width < Global.unitsized16) return;
		return;
	}
	
	// Mario on top of enemy
	if (!Global.map.underwater && one.mario && ((one.star && !two.nostar) || (!two.deadly && objectOnTop(one, two)))) {
		// Enforces toly
		if (marioAboveEnemy(one, two)) return;
		// Mario is on top of them (or star):
		if (one.mario && !one.star) Global.EventHandler.addEvent(function(one, two) { jumpEnemy(one, two); }, 0, one, two);
		else two.nocollide = true;
		// Kill the enemy
		//// If killed returns a Thing, then it's a shell
		//// Make sure Mario isn't immediately hitting the shell
		var killed = two.death(two, one.star * 2);
		if (one.star) scoreEnemyStar(two);
		else {
			scoreEnemyStomp(two);
			/*Global.EventHandler.addEvent(function(one, two) { */setBottom(one, Global.min(one.bottom, two.top + Global.unitsize));/* }, 0, one, two);*/
		}
		// Make Mario have the hopping thing
		addClass(one, "hopping");
		removeClasses(one, "running skidding jumping one two three")
		// addClass(one, "running three");
		one.hopping = true;
		if (Global.mario.power == 1)  setMarioSizeSmall(one);
	} else if (one.mario) {
		// Mario getting hit by an enemy
		if (!marioAboveEnemy(one, two)) one.death(one);
	}
	
	// Two regular characters colliding
	else two.moveleft = !(one.moveleft = objectToLeft(one, two));
}  

function Podoboo(me, jumpheight) {
	me.width = 7;
	me.height = 8;
	me.deadly =
	me.nofall =
	me.nocollidesolid =
	me.nofire = true;
	me.gravity = Global.map.gravity / 2.1;
	me.jumpheight = (jumpheight || 64) * Global.unitsize;
	me.speed = -Global.map.maxyvel;
	me.movement = movePodobooInit;
	me.collide = collideEnemy;
	me.betweentime = 70;
	
	setCharacter(me, "podoboo");
}

function movePodobooInit(me) {
	if (!characterIsAlive(me)) return;
	// For the sake of the editor, flip this & make it hidden on the first movement
	// flipVert(me);
	me.hidden = true;
	me.heightnorm = me.top;
	me.heightfall = me.top - me.jumpheight;
	Global.EventHandler.addEvent(podobooJump, me.betweentime, me);
	me.movement = false;
}

function podobooJump(me) {
	if (!characterIsAlive(me)) return;
	unflipVert(me);
	me.yvel = me.speed + me.gravity;
	me.movement = movePodobooUp;
	me.hidden = false;
	
	// Sadly, this appears to be occasionally necessary
	setThingSprite(me);
}

function movePodobooUp(me) {
	shiftVert(me, me.speed, true);
	if (me.top - Global.gamescreen.top > me.heightfall) return;
	me.nofall = false;
	me.movement = movePodobooSwitch;
}

function movePodobooSwitch(me) {
	if (me.yvel <= 0) return;
	flipVert(me);
	me.movement = movePodobooDown;
}

function movePodobooDown(me) {
	if (me.top < me.heightnorm) return;
	setTop(me, me.heightnorm, true);
	me.movement = false;
	me.nofall = me.hidden = true;
	me.heightfall = me.top - me.jumpheight;
	Global.EventHandler.addEvent(podobooJump, me.betweentime, me);
}

function HammerBro(me) {
	me.width = 8;
	me.height = 12;
	me.group = "enemy";
	me.collide = collideEnemy;
	me.statex =
	me.counter =
	me.statey =
	me.counterx =
	me.countery =
	me.level =
	me.throwcount = 0;
	me.death = killFlip;
	me.movement = moveHammerBro;
	setCharacter(me, "hammerbro");
	me.gravity = Global.gravity / 2;
	Global.EventHandler.addSpriteCycle(me, ["one", "two"]);
	Global.EventHandler.addEvent(throwHammer, 35, me, 7);
	Global.EventHandler.addEventInterval(jumpHammerBro, 140, Infinity, me);
}

function moveHammerBro(me) {
	// Slide side to side
	me.xvel = Math.sin(Math.PI * (me.counter += .007)) / 2.1;
	
	// Make him turn to look at mario if needed
	lookTowardMario(me);
	
	// If falling, don't collide with solids
	me.nocollidesolid = me.yvel < 0 || me.falling;
}

function throwHammer(me, count) {
	if (!characterIsAlive(me) || me.right < -Global.unitsizet32) return;
	if (count != 3) {
		switchClass(me, "thrown", "throwing");
	}
	Global.EventHandler.addEvent(function(me) {
		if (count != 3) {
			if (!characterIsAlive(me)) return;
			// Throw the hammer...
			switchClass(me, "throwing", "thrown");
			// var hammer = new Thing(Hammer, me.lookleft);
			addThing(new Thing(Hammer, me.lookleft), me.left - Global.unitsizet2, me.top - Global.unitsizet2);
			// ...and go again
		}
		if (count > 0) Global.EventHandler.addEvent(throwHammer, 7, me, --count);
		else {
			Global.EventHandler.addEvent(throwHammer, 70, me, 7);
			removeClass(me, "thrown");
		}
	}, 14, me);
}

function jumpHammerBro(me) {
	if (!characterIsAlive(me)) return true; // finish
	if (!me.resting) return; // just skip
	// If it's ok, jump down
	if (Global.map.floor - (me.bottom / Global.unitsize) >= Global.jumplev1 - 2 && me.resting.name != "floor" && Math.floor(Math.random() * 2)) {
		me.yvel = Global.unitsize * -.7;
		me.falling = true;
		Global.EventHandler.addEvent(function(me) { me.falling = false; }, 42, me);
	} else {
		// Otherwise, jump up
		me.yvel = Global.unitsize * -2.1;
	}
	me.resting = false;
}

function Hammer(me, left) {
	me.width = me.height = 8;
	me.nocollidesolid =
	me.nocollidechar =
	me.deadly =
	me.nofire = true;
	me.collide = collideEnemy;
	me.yvel = -Global.unitsize * 1.4;
	me.xvel = Global.unitsize / 1.4;
	if (left) me.xvel *= -1;
	me.gravity = Global.gravity / 2.1;
	setCharacter(me, "hammer");
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "four"], 3);
}

function Cannon(me, height, nofire) {
	me.width = 8;
	me.height = (height || 1) * 8;
	me.spriteheight = 16;
	if (!nofire) me.movement = moveCannonInit;
	me.timer = 117;
	me.repeat = true;
	setSolid(me, "cannon");
}

function moveCannonInit(me) {
	Global.EventHandler.addEventInterval(
		function(me) {
			if (Global.mario.right > me.left - Global.unitsizet8 && Global.mario.left < me.right + Global.unitsizet8) {
				return; // don't fire if Mario is too close
			}
			var spawn = new Thing(BulletBill);
			if (objectToLeft(Global.mario, me)) {
				addThing(spawn, me.left, me.top);
				spawn.direction = spawn.moveleft = true;
				spawn.xvel *= -1;
				flipHoriz(spawn);
			} else {
				addThing(spawn, me.left + me.width, me.top);
			}
			playLocal("Bump", me.right);
		}, 270, Infinity, me);
	me.movement = false;
}

function BulletBill(me) {
	me.width = 8; me.height = 7;
	me.group = "enemy";
	me.nofall = me.nofire = me.nocollidesolid = me.nocollidechar = true;
	me.speed = me.xvel = Global.unitsized2;
	me.movement = moveSimple;
	me.collide = collideEnemy;
	me.death = killFlip;
	setCharacter(me, "bulletbill");
}

function Bowser(me, hard) {
	me.width = me.height = 16;
	me.speed = .28 * Global.unitsize;
	me.gravity = Global.gravity / 2.8;
	me.deadly = me.dx = me.lookleft = me.nokillend = me.skipoverlaps = true;
	me.moveleft = me.smart = me.movecount = me.jumpcount = me.firecount = me.deathcount = 0;
	me.killonend = freezeBowser;
	me.counter = -.7;
	me.group = "enemy";
	me.movement = moveBowserInit;
	me.collide = collideEnemy;
	me.death = killBowser;
	setCharacter(me, "bowser");
	Global.EventHandler.addSpriteCycle(me, ["one", "two"]);
	if (hard) Global.EventHandler.addEvent(throwHammer, 35, me, 7);
}

function moveBowserInit(me) {
	Global.EventHandler.addEventInterval(bowserJumps, 117, Infinity, me);
	Global.EventHandler.addEventInterval(bowserFires, 280, Infinity, me);
	Global.EventHandler.addEventInterval(bowserFires, 350, Infinity, me);
	Global.EventHandler.addEventInterval(bowserFires, 490, Infinity, me);
	me.movement = moveBowser;
}

function moveBowser(me) {
	if (!characterIsAlive(Global.mario)) return;
	lookTowardMario(me);
	if (me.lookleft) me.xvel = Math.sin(Math.PI * (me.counter += .007)) / 1.4;
	else me.xvel = Global.min(me.xvel + .07, .84);
}

function bowserJumps(me) {
	if (!characterIsAlive(me)) return true;
	if (!me.resting || !me.lookleft) return;
	me.yvel = Global.unitsize * -1.4;
	me.resting = false;
	// If there is a platform, don't bump into it
	me.nocollidesolid = true;
	Global.EventHandler.addEventInterval(function(me) {
		if (me.yvel > Global.unitsize) {
			me.nocollidesolid = false;
			return true;
		}
	}, 3, Infinity, me);
}

function bowserFires(me) {
	if (!characterIsAlive(me) || !characterIsAlive(Global.mario)) return true;
	if (!me.lookleft) return;
	// Close the mouth
	addClass(me, "firing");
	playLocal("Bowser Fires", me.left);
	// After a little bit, open and fire
	Global.EventHandler.addEvent(function(me) {
		var top = me.top + Global.unitsizet4,
			fire = new Thing(BowserFire, Global.roundDigit(Global.mario.bottom, Global.unitsizet8));
		removeClass(me, "firing");
		addThing(fire, me.left - Global.unitsizet8, top);
		play("Bowser Fires");
	}, 14, me);
}

// This is for when Fiery Mario kills bowser - the normal one is listed under the castle things
function killBowser(me, big) {
	if (big) {
		me.nofall = false;
		return killFlip(me);
	}
	
	if (++me.deathcount == 5) {
		me.yvel = me.speed = me.movement = 0;
		killFlip(me, 350);
		score(me, 5000);
	}
}

// For when the axe is hit
function freezeBowser(me) {
	me.movement = false;
	thingStoreVelocity(me);
}

// Each fireball leaves his mouth, and while moving horizontally, shifts its yloc
function BowserFire(me, ylev) {
	me.width = 12;
	me.height = 4;
	me.xvel = Global.unitsize * -.63;
	me.deadly = me.nofall = me.nocollidesolid = me.nofire = true;
	me.collide = collideEnemy;
	if (ylev) {
		me.ylev = ylev;
		me.movement = moveFlying;
	}
	setCharacter(me, "bowserfire");
	Global.EventHandler.addSpriteCycle(me, [unflipVert, flipVert]);
}

function moveFlying(me) {
	if (Global.round(me.bottom) == Global.round(me.ylev)) {
		me.movement = false;
		return;
	}
	shiftVert(me, Global.min(Global.max(0, me.ylev - me.bottom), Global.unitsize));
}

function WaterBlock(me, width) {
	me.height = 16;
	me.width = width;
	me.spritewidth = me.spriteheight = 1 / Global.scale;
	me.repeat = true;
	setSolid(me, "water-block");
}

function Blooper(me) {
	me.width = 8;
	me.height = 12;
	me.nocollidesolid = me.nofall = me.moveleft = 1;
	me.squeeze = me.counter = 0;
	me.speed = Global.unitsized2;
	me.xvel = me.speedinv = -Global.unitsized4;
	me.movement = moveBlooper;
	me.collide = collideEnemy;
	me.death = killFlip;
	setCharacter(me, "blooper");
}

// Normally goes up at increasing rate
// Every X seconds, squeezes to go down
//// Minimum Y seconds, continues if Mario is below until bottom is 8 above floor
function moveBlooper(me) {
	switch(me.counter) {
		case 56: me.squeeze = true; ++me.counter; break;
		case 63: squeezeBlooper(me); break;
		default: ++me.counter; break;
	}
	if (me.squeeze) me.yvel = Global.max(me.yvel + .021, .7); // going down
	else me.yvel = Global.min(me.yvel - .035, -.7); // going up
	shiftVert(me, me.yvel, true);
	
	if (!me.squeeze) {
		if (Global.mario.left > me.right + Global.unitsizet8) {
			// Go to the right
			me.xvel = Global.min(me.speed, me.xvel + Global.unitsized32);
		}
		else if (Global.mario.right < me.left - Global.unitsizet8) {
			// Go to the left
			me.xvel = Global.max(me.speedinv, me.xvel - Global.unitsized32);
		}
	}
}

function squeezeBlooper(me) {
	if (me.squeeze != 2) addClass(me, "squeeze");
	// if (!me.squeeze) me.yvel = 0;
	me.squeeze = 2;
	me.xvel /= 1.17;
	setHeight(me, 10, true, true);
	// (104 (map.floor) - 12 (blooper.height) - 2) * unitsize
	if (me.top > Global.mario.bottom || me.bottom > 360) unsqueezeBlooper(me);
}

function unsqueezeBlooper(me) {
	me.squeeze = false;
	removeClass(me, "squeeze");
	me.counter = 0;
	setHeight(me, 12, true, true);
	// me.yvel /= 3;
}

// Red cheepcheeps are faster
function CheepCheep(me, red, jumping) {
	me.width = me.height = 8;
	me.group = "enemy";
	var name = "cheepcheep " + (red ? "red" : "");
	
	// Doubled for fun! (also editor checking)
	me.red = red;
	setCheepVelocities(me);
	
	if (jumping) {
		name += " jumping";
		me.jumping = true;
		me.movement = moveCheepJumping;
	} 
	else me.movement = moveCheepInit;
	
	me.nofall = me.nocollidesolid = me.nocollidechar = true;
	me.death = killFlip;
	me.collide = collideEnemy;
	setCharacter(me, name);
	Global.EventHandler.addSpriteCycle(me, ["one", "two"]);
}

function setCheepVelocities(me) {
	if (me.red) {
		me.xvel = -Global.unitsized4;
		me.yvel = Global.unitsize / -24;
	} else {
		me.xvel = Global.unitsize / -6;
		me.yvel = -Global.unitsized32;
	}
}

function moveCheepInit(me) {
	setCheepVelocities(me);
	if (me.top < Global.mario.top) me.yvel *= -1;
	moveCheep(me);
	me.movement = moveCheep;
}

function moveCheep(me) {
	shiftVert(me, me.yvel);
}

function moveCheepJumping(me) {
	shiftVert(me, me.yvel += Global.unitsize / 14);
}

function startCheepSpawn() {
	return Global.map.zone_cheeps = Global.EventHandler.addEventInterval(
		function() {
			if (!Global.map.zone_cheeps) return true;
			var spawn = new Thing(CheepCheep, true, true);
			addThing(spawn, Math.random() * Global.mario.left * Global.mario.maxspeed / Global.unitsized2, Global.gamescreen.height * Global.unitsize);
			spawn.xvel = Math.random() * Global.mario.maxspeed;
			spawn.yvel = Global.unitsize * -2.33;
			flipHoriz(spawn);
			spawn.movement = function(me) {
				if (me.top < Global.ceilmax) me.movement = moveCheepJumping; 
				else shiftVert(me, me.yvel);
			};
		}, 21, Infinity
	);
}

function Bubble(me) {
	me.width = me.height = 2;
	me.nofall = me.nocollide = true;
	me.movement = function(me) {
		me.top < Global.unitsizet16 ? killNormal(me) : shiftVert(me, me.yvel);
	};
	me.yvel = -Global.unitsized4;
	setCharacter(me, "bubble");
}

// Typically at height ??
function Lakitu(me, norepeat) {
	me.width = 8;
	me.height = 12;
	me.nofall = me.noshiftx = me.nocollidesolid = true;
	me.mariodiff = me.counter = 0;
	me.dir = -1;
	me.norepeat = norepeat;
	me.mariodiff = Global.unitsizet16;
	me.group = "enemy";
	me.collide = collideEnemy;
	me.movement = moveLakituInit;
	me.death = killLakitu;
	setCharacter(me, "lakitu out");
	Global.map.has_lakitu = me;
}

// The lakitu's position starts to the right of mario ...
function moveLakituInit(me) {
	if (Global.map.has_lakitu && me.norepeat) return killNormal(me);
	Global.EventHandler.addEventInterval(function(me) {
		if (me.alive) throwSpiny(me);
		else return true;
	}, 140, Infinity, me);
	me.movement = moveLakituInit2;
	moveLakituInit2(me);
	Global.map.has_lakitu = me;
}

function moveLakituInit2(me) {
	if (me.right < Global.mario.left) {
		moveLakitu(me);
		me.movement = moveLakitu;
		Global.map.lakitu = me;
		return true;
	}
	shiftHoriz(me, -Global.unitsize);
}

// Then, once it's close enough, is always relative to mario.
// This fluctuates between +/-32 (* Global.unitsize)
function moveLakitu(me) {
	// If mario is moving quickly to the right, move in front of him and stay there
	if (Global.mario.xvel > Global.unitsized8 && Global.mario.left > Global.gamescreen.width * Global.unitsized2) {
		if (me.left < Global.mario.right + Global.unitsizet16) {
			// To the 'left' of mario
			slideToXLoc(me, Global.mario.right + Global.unitsizet32 + Global.mario.xvel, Global.mario.maxspeed * 1.4);
			me.counter = 0;
		}
	}
	// Otherwise, creepily orbit around him
	else {
		// me.xvel = 0;
		me.counter += .007;
		slideToXLoc(me, Global.mario.left + Global.mario.xvel + Math.sin(Math.PI * me.counter) * 117, Global.mario.maxspeed * .7);
	}
	// console.log("moveLakitu after: " + (me.right - me.left) + "\n");
}

function throwSpiny(me) {
	if (!characterIsAlive(me)) return false;
	switchClass(me, "out", "hiding");
	Global.EventHandler.addEvent(function(me) {
		if (me.dead) return false;
		var spawn = new Thing(SpinyEgg);
		addThing(spawn, me.left, me.top);
		spawn.yvel = Global.unitsize * -2.1;
		switchClass(me, "hiding", "out");
	}, 21, me);
}

function killLakitu(me) {
	delete me.noscroll;
	killFlip(me);
}

function Spiny(me) {
	me.width = me.height = 8;
	me.group = "enemy";
	me.speed = Global.unitsize * .21;
	me.deadly = me.moveleft = true;
	me.smart = false;
	me.death = killFlip;
	me.collide = collideEnemy;
	me.movement = moveSimple;
	setCharacter(me, "spiny");
	Global.EventHandler.addSpriteCycle(me, ["one", "two"]);
}

function SpinyEgg(me) {
	me.height = 8; me.width = 7;
	me.group = "enemy";
	me.deadly = true;
	me.movement = moveSpinyEgg;
	me.spawntype = Spiny;
	me.spawner = me.death = createSpiny;
	me.collide = collideEnemy;
	setCharacter(me, "spinyegg");
	Global.EventHandler.addSpriteCycle(me, ["one", "two"]);
}

function moveSpinyEgg(me) {
	if (me.resting) createSpiny(me);
}

function createSpiny(me) {
	var spawn = new Thing(Spiny);
	addThing(spawn, me.left, me.top);
	spawn.moveleft = objectToLeft(Global.mario, spawn);
	killNormal(me);
}

function Beetle(me) {
	me.width = me.height = 8;
	me.group = "enemy";
	me.speed = me.xvel = Global.unitsize * .21;
	me.moveleft = me.nofire = true;
	me.smart = false;
	me.collide = collideEnemy;
	me.movement = moveSmart;
	me.death = killBeetle;
	setCharacter(me, "beetle");
	// me.toly = Global.unitsizet8;
	Global.EventHandler.addSpriteCycleSynched(me, ["one", "two"]);
}

// Big: true if it should skip shell (fire, shell, etc)
function killBeetle(me, big) {
	if (!me.alive) return;
	var spawn;
	if (big && big != 2) spawn = new Thing(Koopa, me.smart);
	else spawn = new Thing(BeetleShell, me.smart);
	// Puts it on stack, so it executes immediately after upkeep
	Global.EventHandler.addEvent(
		function(spawn, me) {
			addThing(spawn, me.left, me.bottom - spawn.height * Global.unitsize);
			spawn.moveleft = me.moveleft;
		},
		0,
		spawn, me
	);
	killNormal(me);
	if (big == 2) killFlip(spawn);
	else return spawn;
}

function BeetleShell(me) {
	me.width = me.height = 8;
	me.nofire = true;
	me.group = "item";
	me.speed = Global.unitsizet2;
	me.moveleft =
	me.xvel =
	me.move =
	me.hitcount =
	me.peeking =
	me.counting =
	me.landing =
	me.enemyhitcount = 0;
	me.movement = moveShell;
	me.collide = hitShell;
	me.death = killFlip;
	me.spawntype = Beetle;
	setCharacter(me, "shell beetle");
}

function Coin(me, solid) {
	me.group = "coin";
	me.width = 5;
	me.height = 7;
	me.nofall =
	me.coin =
	me.nofire =
	me.nocollidechar =
	me.nokillend =
	me.onlyupsolids =
	me.skipoverlaps = true;
	me.tolx = 0;
	me.toly = Global.unitsized2;
	me.collide = hitCoin;
	me.animate = coinEmerge;
	me.death = killNormal;
	setCharacter(me, "coin one");
	Global.EventHandler.addSpriteCycleSynched(me, ["one", "two", "three", "two", "one"]);
	// Enabling solid allows this to deliberately be placed behind characters, for visual reasons (like in 1-3)
	if (solid) me.movement = coinBecomesSolid;
}

function coinBecomesSolid(me) {
	switchContainers(me, Global.characters, Global.solids);
	me.movement = false;
}

function hitCoin(me, coin) {
	if (!me.mario) return;
	play("Coin");
	score(me, 200, false);
	gainCoin();
	killNormal(coin);
}

function gainCoin() {
	if (++Global.data.coins.amount >= 100) {
		Global.data.coins.amount = 0;
		gainLife();
	}
	updateDataElement(Global.data.coins);
}

function coinEmerge(me, solid) {
	play("Coin");
	removeClass(me, "still");
	switchContainers(me, Global.characters, Global.scenery);
	score(me, 200, false);
	gainCoin();
	me.nocollide = me.alive = me.nofall = me.emerging = true;
	determineThingQuadrants(me);
	
	if (me.blockparent) me.movement = coinEmergeMoveParent;
	else me.movement = coinEmergeMove;
	me.yvel = -Global.unitsize;
	Global.EventHandler.addEvent(function(me) { me.yvel *= -1; }, 25, me);
	Global.EventHandler.addEvent(function(me) {
		killNormal(me);
		deleteThing(me, Global.scenery, Global.scenery.indexOf(me));
	}, 49, me);
	Global.EventHandler.addEventInterval(coinEmergeMovement, 1, Infinity, me, solid);
	Global.EventHandler.clearClassCycle(me, 0);
	addClass(me, "anim");
	Global.EventHandler.addSpriteCycle(me, ["anim1", "anim2", "anim3", "anim4", "anim3", "anim2"], 0, 5);
}

function coinEmergeMovement(me, solid) {
	if (!me.alive) return true;
	shiftVert(me, me.yvel);
	// if (solid && solid.alive && me.bottom > solid.bottom || me.top > solid.top) {
		// killNormal(me);
		// return true;
	// }
}

function coinEmergeMove(me) {
	shiftVert(me, me.yvel, true);
}

function coinEmergeMoveParent(me) {
	if (me.bottom >= me.blockparent.bottom) killNormal(me);
	else shiftVert(me, me.yvel, true);
}

/*
 * Mario
 */
 function Mario(me) {
	setMarioSizeSmall(me);
	me.walkspeed = Global.unitsized2;
	me.canjump =
	me.nofiredeath =
	me.nofire =
	me.mario =
	me.nokillend = 1;
	me.numballs =
	me.moveleft =
	me.skidding =
	me.star =
	me.dying =
	me.nofall =
	me.maxvel =
	me.paddling =
	me.jumpers =
	me.landing = 0;
	me.running = ''; // Evalues to false for cycle checker
	me.power = Global.data.mariopower; // 1 for normal, 2 for big, 3 for fiery
	me.maxspeed =
	me.maxspeedsave = Global.unitsize * 1.35; // Really only used for timed animations
	me.scrollspeed = Global.unitsize * 1.75;
	me.keys = new Keys();
	me.fire = marioFires;
	me.movement = moveMario;
	me.death = killMario;
	setCharacter(me, "mario normal small still");
	me.tolx = Global.unitsizet2;
	me.toly = 0;
	me.gravity = Global.map.gravity;
	if (Global.map.underwater) {
		me.swimming = true;
		Global.EventHandler.addSpriteCycle(me, ["swim1", "swim2"], "swimming", 5);
	}  
}

function placeMario(xloc, yloc) {
	clearOldMario();
	Global.mario = new Thing(Mario);
	var adder = addThing(Global.mario, xloc || Global.unitsizet16, yloc || (Global.map.floor - Global.mario.height) * Global.unitsize);
	if (Global.data.mariopower >= 2) {
		marioGetsBig(Global.mario, true);
		if (Global.data.mariopower == 3) marioGetsFire(Global.mario, true);
	}
	return adder;
}
function clearOldMario() {
	if (!Global.mario) return;
	// if (mario.element) removeElement(mario);
	Global.mario.alive = false;
	Global.mario.dead = true;
}

function Keys() {
	// Run: 0 for no, 1 for right, -1 for left
	// Crouch: 0 for no, 1 for yes
	// Jump: 0 for no, jumplev = 1 through jumpmax for yes
	this.run = this.crouch = this.jump = this.jumplev = this.sprint = 0;
}

// Stores .*vel under .*velold for shroom-style events
function thingStoreVelocity(me, keepmove) {
	me.xvelOld = me.xvel || 0;
	me.yvelOld = me.yvel || 0;
	me.nofallOld = me.nofall || false;
	me.nocollideOld = me.nocollide || false;
	me.movementOld = me.movement || me.movementOld;
	
	me.nofall = me.nocollide = true;
	me.xvel = me.yvel = false;
	if (!keepmove) me.movement = false;
}
// Retrieves .*vel from .*velold
function thingRetrieveVelocity(me, novel) {
	if (!novel) {
		me.xvel = me.xvelOld || 0;
		me.yvel = me.yvelOld || 0;
	}
	me.movement = me.movementOld || me.movement;
	me.nofall = me.nofallOld || false;
	me.nocollide = me.nocollideOld || false;
}

function removeCrouch() {
	Global.mario.crouching = false;
	Global.mario.toly = Global.mario.tolyold || 0;
	if (Global.mario.power != 1) {
		removeClass(Global.mario, "crouching");
		Global.mario.height = 16;
		updateBottom(Global.mario, 0);
		updateSize(Global.mario);
	}
}

function marioShroom(me) {
	if (me.shrooming) return;
	play("Powerup");
	score(me, 1000, true);
	if (me.power == 3) return;
	me.shrooming = true;
	(++me.power == 2 ? marioGetsBig : marioGetsFire)(me);
	storeMarioStats();
}
// These three modifiers don't change power levels.
function marioGetsBig(me, noanim) {
	setMarioSizeLarge(me);
	me.keys.down = 0;
	removeClasses(Global.mario, "crouching small");
	updateBottom(me, 0);
	updateSize(me);
	if (!noanim) {
		// pause();
		// Mario cycles through 'shrooming1', 'shrooming2', etc.
		addClass(Global.mario, "shrooming");
		var stages = [1,2,1,2,3,2,3];
		for(var i = stages.length - 1; i >= 0; --i)
			stages[i] = "shrooming" + stages[i];
		
		// Clear Mario's movements
		thingStoreVelocity(Global.mario);
		
		// The last event in stages clears it, resets Mario's movements, and stops
		stages.push(function(me, settings) {
			me.shrooming = settings.length = 0;
			addClass(me, "large");
			removeClasses(me, "shrooming shrooming3");
			thingRetrieveVelocity(Global.mario);
			return true;
		});
		
		Global.EventHandler.addSpriteCycle(me, stages, "shrooming", 6);
	}
	else addClass(me, "large");
}
function marioGetsSmall(me) {
	var bottom = Global.mario.bottom;
	// pause();
	me.keys.down = 0;
	thingStoreVelocity(me);
	addClass(me, "small");
	flicker(me);
	// Step one
	removeClasses(Global.mario, "running skidding jumping fiery");
	addClass(Global.mario, "paddling");
	// Step two (t+21)
	Global.EventHandler.addEvent(function(mario) {
		removeClass(mario, "large");
		setMarioSizeSmall(mario);
		setBottom(mario, bottom - Global.unitsize);
	}, 21, Global.mario);
	// Step three (t+42)
	Global.EventHandler.addEvent(function(mario) {
		thingRetrieveVelocity(mario, false);
		mario.nocollidechar = true;
		removeClass(mario, "paddling");
		if (mario.running || mario.xvel) addClass(mario, "running");
		Global.EventHandler.addEvent(setThingSprite, 1, mario);
	}, 42, Global.mario);
	// Step four (t+70);
	Global.EventHandler.addEvent(function(mario) {
		mario.nocollidechar = false;
	}, 70, Global.mario);
}
function marioGetsFire(me) {
	removeClass(me, "intofiery");
	addClass(me, "fiery");
	Global.mario.shrooming = false;
}
function setMarioSizeSmall(me) {
	setSize(me, 8, 8, true);
	updateSize(me);
}
function setMarioSizeLarge(me) {
	setSize(me, 8, 16, true);
	updateSize(me);
}

// To do: add in unitsize measurement?
function moveMario(me) {
	// Not jumping
	if (!me.keys.up) me.keys.jump = 0;
	
	// Jumping
	else if (me.keys.jump > 0 && (me.yvel <= 0 || Global.map.underwater) ) {
		if (Global.map.underwater) marioPaddles(me);
		if (me.resting) {
			if (me.resting.xvel) me.xvel += me.resting.xvel;
			me.resting = false;
		}
		// Jumping, not resting
		else {
			if (!me.jumping && !Global.map.underwater) {
				switchClass(me, "running skidding", "jumping");
			}
			me.jumping = true;
		}
		if (!Global.map.underwater) {
			var dy = Global.unitsize / (Global.pow(++me.keys.jumplev, Global.map.jumpmod - .0014 * me.xvel));
			me.yvel = Global.max(me.yvel - dy, Global.map.maxyvelinv);
		}
	}
	
	// Crouching
	if (me.keys.crouch && !me.crouching && me.resting) {
		if (me.power != 1) {
			me.crouching = true;
			addClass(me, "crouching");
			me.height = 11;
			me.tolyold = me.toly;
			me.toly = Global.unitsizet4;
			updateBottom(me, 0);
			updateSize(me);
		}
		// Pipe movement
		if (me.resting.actionTop)
			me.resting.actionTop(me, me.resting, me.resting.transport);
	}
	
	// Running
	var decel = 0 ; // (how much to decrease)
	// If a button is pressed, hold/increase speed
	if (me.keys.run != 0 && !me.crouching) {
		var dir = me.keys.run,
				// No sprinting underwater
				sprinting = (me.keys.sprint && !Global.map.underwater) || 0,
				adder = dir * (.098 * (sprinting + 1));
		// Reduce the speed, both by subtracting and dividing a little
		me.xvel += adder || 0;
		me.xvel *= .98;
		decel = .0007;
		// If you're accelerating in the opposite direction from your current velocity, that's a skid
		if (/*sprinting && */Global.signBool(me.keys.run) == me.moveleft) {
			if (!me.skidding) {
				addClass(me, "skidding");
				me.skidding = true;
			}
		}
		// Otherwise make sure you're not skidding
		else if (me.skidding) {
			removeClass(me, "skidding");
			me.skidding = false;
		}
	}
	// Otherwise slow down a bit/*, with a little more if crouching*/
	else {
		me.xvel *= (.98/* - Boolean(me.crouching) * .07*/);
		decel = .035;
	}

	if (me.xvel > decel) me.xvel-=decel;
	else if (me.xvel < -decel) me.xvel+=decel;
	else if (me.xvel!=0) {
	me.xvel = 0;
	if (!Global.nokeys && me.keys.run==0) {
			if (me.keys.left_down)me.keys.run=-1;
			else if (me.keys.right_down)me.keys.run=1;
		}  
	}
	
	// Movement mods
	// Slowing down
	if (Math.abs(me.xvel) < .14) {
		if (me.running) {
			me.running = false;
			if (Global.mario.power == 1) setMarioSizeSmall(me);
			removeClasses(me, "running skidding one two three");
			addClass(me, "still");
			Global.EventHandler.clearClassCycle(me, "running");
		}
	}
	// Not moving slowly
	else if (!me.running) {
		me.running = true;
		switchClass(me, "still", "running");
		marioStartRunningCycle(me);
		if (me.power == 1) setMarioSizeSmall(me);
	}
	if (me.xvel > 0) {
		me.xvel = Global.min(me.xvel, me.maxspeed);
		if (me.moveleft && (me.resting || Global.map.underwater)) {
			unflipHoriz(me);
			me.moveleft = false;
		}
	}
	else if (me.xvel < 0) {
		me.xvel = Global.max(me.xvel, me.maxspeed * -1);
		if (!me.moveleft && (me.resting || Global.map.underwater)) {
			flipHoriz(me);
			me.moveleft = true;
		}
	}
	
	// Resting stops a bunch of other stuff
	if (me.resting) {
		// Hopping
		if (me.hopping) {
			removeClass(me, "hopping");
			if (me.xvel) addClass(me, "running");
			me.hopping = false;
		}
		// Jumping
		me.keys.jumplev = me.yvel = me.jumpcount = 0;
		if (me.jumping) {
			me.jumping = false;
			removeClass(me, "jumping");
			if (me.power == 1) setMarioSizeSmall(me);
			addClass(me, Global.abs(me.xvel) < .14 ? "still" : "running");
		}
		// Paddling
		if (me.paddling) {
			me.paddling = me.swimming = false;
			removeClasses(me, "paddling swim1 swim2");
			Global.EventHandler.clearClassCycle(me, "paddling");
			addClass(me, "running");
		}
	}
	if (isNaN(me.xvel)) debugger;
}

// Gives Mario visual running
function marioStartRunningCycle(me) {
	// setMarioRunningCycler sets the time between cycles
	me.running = Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "two"], "running", setMarioRunningCycler);
}

// Used by Mario's running cycle to determine how fast he should switch between sprites
function setMarioRunningCycler(event) {
	event.timeout = 5 + Global.ceil(Global.mario.maxspeedsave - Global.abs(Global.mario.xvel));
}

function marioPaddles(me) {
	if (!me.paddling) {
		removeClasses(me, /*"running */"skidding paddle1 paddle2 paddle3 paddle4 paddle5");
		addClass(me, "paddling");
		Global.EventHandler.clearClassCycle(me, "paddling_cycle");
		Global.EventHandler.addSpriteCycle(me, ["paddle1", "paddle2", "paddle3", "paddle3", "paddle2", "paddle1", function() { return me.paddling = false; }], "paddling_cycle", 5);
	}
	me.paddling = me.swimming = true;
	me.yvel = Global.unitsize * -.84;
}

function marioBubbles() {
	var bubble = new Thing(Bubble);
	addThing(bubble, Global.mario.right, Global.mario.top);
	// Global.EventHandler.addEvent(killNormal, 140, bubble);
}

function moveMarioVine(me) {
	var attached = me.attached;
	if (me.bottom < attached.top) return unattachMario(me);
	if (me.keys.run == me.attachoff) {
		while(objectsTouch(me, attached))
			shiftHoriz(me, me.keys.run, true);
		return unattachMario(me);
	}
	
	// If Mario is moving up, simply move up
	if (me.keys.up) {
		me.animatednow = true;
		shiftVert(me, Global.unitsized4 * -1, true);
	}
	// If mario is moving down, move down and check for unattachment
	else if (me.keys.crouch) {
		me.animatednow = true;
		shiftVert(me, Global.unitsized2, true);
		if (me.bottom > attached.bottom - Global.unitsizet4) return unattachMario(me);
	}
	else me.animatednow = false;
	
	if (me.animatednow && !me.animated) {
		addClass(me, "animated");
	} else if (!me.animatednow && me.animated) {
		removeClass(me, "animated");
	}
	
	me.animated = me.animatednow;
	
	if (me.bottom < -16) { // ceilmax (104) - ceillev (88)
		locMovePreparations(me);
		if (!attached.locnum && Global.map.random) goToTransport(["Random", "Sky", "Vine"]);
		else shiftToLocation(attached.locnum);
	}
}

function unattachMario(me) {
	me.movement = moveMario;//me.movementsave;
	removeClasses(me, "climbing", "animated");
	Global.EventHandler.clearClassCycle(me, "climbing");
	me.yvel = me.skipoverlaps = me.attachoff = me.nofall = me.climbing = me.attached = me.attached.attached = false;
	me.xvel = me.keys.run;
}

function marioHopsOff(me, solid, addrun) {
	removeClasses(me, "climbing running");
	addClass(me, "jumping");
	
	console
	me.piping = me.nocollide = me.nofall = me.climbing = false;
	me.gravity = Global.gravity / 4;
	me.xvel = 3.5;
	me.yvel = -3.5;
	Global.EventHandler.addEvent(function(me) {
		unflipHoriz(me);
		me.gravity = Global.gravity;
		me.movement = moveMario;
		me.attached = false;
		if (addrun) {
			addClass(me, "running")
			marioStartRunningCycle(me);
		}
	}, 21, me);
	
}

function marioFires() {
	if (Global.mario.numballs >= 2) return;
	++Global.mario.numballs;
	addClass(Global.mario, "firing");
	var ball = new Thing(FireBall, Global.mario.moveleft, true);
	ball.yvel = Global.unitsize;
	addThing(ball, Global.mario.right + Global.unitsized4, Global.mario.top + Global.unitsizet8);
	if (Global.mario.moveleft) setRight(ball, Global.mario.left - Global.unitsized4, true);
	ball.animate(ball);
	ball.ondelete = fireDeleted;
	Global.EventHandler.addEvent(function(mario) { removeClass(mario, "firing"); }, 7, Global.mario);
}

function emergeFire(me) {
	play("Fireball");
}

function marioStar(me) {
	if (me.star) return;
	++me.star;
	play("Powerup");
	playTheme("Star", true);
	Global.EventHandler.addEvent(marioRemoveStar, 560, me);
	switchClass(me, "normal", "star");
	Global.EventHandler.addSpriteCycle(me, ["star1", "star2", "star3", "star4"], "star", 5);
}
function marioRemoveStar(me) {
	if (!me.star) return;
	--me.star;
	removeClasses(me, "star star1 star2 star3 star4");
	Global.EventHandler.clearClassCycle(me, "star");
	addClass(me, "normal");
	playTheme();
}

// Big means it must happen: 2 means no animation
function killMario(me, big) {
	if (!me.alive || me.flickering || me.dying) return;
	// If this is an auto kill, it's for rizzles
	if (big == 2) {
		Global.notime = true;
		me.dead = me.dying = true;
	}
	// Otherwise it's just a regular (enemy, time, etc.) kill
	else {
		// If Mario can survive this, just power down
		if (!big && me.power > 1) {
			play("Power Down");
			me.power = 1;
			storeMarioStats();
			return marioGetsSmall(me);
		}
		// Otherwise, if this isn't a big one, animate a death
		else if (big != 2) {
			// Make this look dead
			Global.EventHandler.clearAllCycles(me);
			setSize(me, 7.5, 7, true);
			updateSize(me);
			setClass(me, "character mario dead");
			// Pause some things
			Global.nokeys = Global.notime = me.dying = true;
			thingStoreVelocity(me);
			// Make this the top of characters
			containerForefront(me, Global.characters);
			// After a tiny bit, animate
			Global.EventHandler.addEvent(function(me) {
				thingRetrieveVelocity(me, true);
				me.nocollide = true;
				me.movement = me.resting = false;
				me.gravity = Global.gravity / 2.1;
				me.yvel = Global.unitsize * -1.4;
			}, 7, me);
		}
	}

	// Clear and reset
	pauseAllSounds();
	if (!Global.editing) play("Mario Dies");
	me.nocollide = me.nomove = Global.nokeys = 1;
	--Global.data.lives.amount;
	if (!Global.map.random) Global.data.score.amount = Global.data.scoreold;
	
	// If it's in editor, (almost) immediately set map
	if (Global.editing) {
		setTimeout(function() {
			editorSubmitGameFuncPlay();
			editor.playing = editor.playediting = true;
		}, 35 * Global.timer);
	} else if (!Global.map.random || Global.data.lives.amount <= 0) {
		// If the map is normal, or failing that a game over is reached, timeout a reset
		Global.reset = setTimeout(Global.data.lives.amount ? setMap : gameOver, Global.timer * 280);
	}
	// Otherwise it's random; spawn him again
	else {
		Global.nokeys = Global.notime = false;
		updateDataElement(Global.data.score);
		updateDataElement(Global.data.lives);
		// placeMario(unitsizet16, unitsizet8 * -1 + (map.underwater * unitsize * 24));
		Global.EventHandler.addEvent(function() {
			marioDropsIn();
			playTheme();
		// }, 7 * (map.respawndist || 17));
		}, 117);
	}
}
// Used by random maps to respawn
function marioDropsIn() {
	// Clear and place Mario
	clearOldMario();
	placeMario(Global.unitsizet16, Global.unitsizet8 * -1 + (Global.map.underwater * Global.unitsize * 24));
	flicker(Global.mario);
	
	// Give a Resting Stone for him to land, unless it's underwater...
	if (!Global.map.underwater) {
		Global.mario.nocollide = true;
		
		Global.EventHandler.addEvent(function() {
			Global.mario.nocollide = false;
			addThing(new Thing(RestingStone), Global.mario.left, Global.mario.bottom + Global.mario.yvel);
		}, Global.map.respawndist || 17);
	} else {
		// ...in which case just fix his gravity
		Global.mario.gravity = Global.gravity / 2.8;
	}
}

function gameOver() {
	// Having a gamecount of -1 truly means it's all over
	Global.gameon = false;
	pause();
	pauseTheme();
	play("Game Over");
	
	window.find("content").addClass("show-game-over");
	
	Global.gamecount = Infinity;
	clearMarioStats();
	
	setTimeout(gameRestart, 7000);
}

function gameRestart() {
	Global.seedlast = .007;

	Global.gameon = true;
	Global.map.random ? setMapRandom() : setMap(1,1);
	Global.EventHandler.addEvent(function() {
		window.find("content").removeClass("show-game-over");
	});
	setLives(3);
}




/*
 * Solids
 */

function Floor(me, length, height) {
	// log(arguments);
	me.width = (length || 1) * 8;
	me.height = (height * 8) || Global.unitsizet32;
	me.spritewidth = 8;
	me.spriteheight = 8;
	me.repeat = true;
	setSolid(me, "floor");
}

// To do: stop using clouds, and use Stone instead
function Clouds(me, length) {
	me.width = length * 8;
	me.height = 8;
	setSolid(me, "clouds");
}

function Brick(me, content) {
	me.width =
	me.height = 8;
	me.used = false;
	me.bottomBump = brickBump;
	if (!content) me.contents = false;
	else {
		if (content instanceof Array) {
			me.contents = content;
			while(me.contents.length < 3) {
				me.contents.push(false);
			}
		} else {
			me.contents = [content, false, false];
		}
	}
	me.death = killNormal;
	setSolid(me, "brick unused");
	me.tolx = 1;
}

function brickBump(me, character) {
	if (me.up || character.type != "mario") return;
	play("Bump");
	if (me.used) return;
	me.up = character;
	if (character.power > 1 && !me.contents) {
		// wait until after collision testing to delete (for coins)
		return Global.EventHandler.addEvent(brickBreak, 2, me, character);
	}
	
	// Move the brick
	blockBumpMovement(me);
	
	// If the brick has contents,
	if (me.contents) {
		// Turn normal Mushrooms into FireFlowers if Mario is large
		if (Global.mario.power > 1 && me.contents[0] == Mushroom && !me.contents[1]) me.contents[0] = FireFlower;
		Global.EventHandler.addEvent(
			function(me) {
				var contents = me.contents,
					out = new Thing(contents[0], contents[1], contents[2]);
				addThing(out, me.left, me.top);
				setMidXObj(out, me, true);
				out.blockparent = me;
				out.animate(out, me);
				// Do special preps for coins
				if (me.contents[0] == Coin) {
					if (me.lastcoin) makeUsedBlock(me);
					Global.EventHandler.addEvent( function(me) { me.lastcoin = true; }, 245, me );
				} else {
					makeUsedBlock(me);
				}
			}, 7, me);
	}
}

function makeUsedBlock(me) {
	me.used = true;
	switchClass(me, "unused", "used");
}

function brickBreak(me, character) {
	play("Break Block");
	score(me, 50);
	me.up = character;
	Global.EventHandler.addEvent(placeShards, 1, me);
	killNormal(me);
}

function placeShards(me) {
	for(var i = 0, shard; i < 4; ++i) {
		shard = new Thing(BrickShard);
		addThing(shard,
				me.left + (i < 2) * me.width * Global.unitsize - Global.unitsizet2,
				me.top + (i % 2) * me.height * Global.unitsize - Global.unitsizet2);
		shard.xvel = Global.unitsized2 - Global.unitsize * (i > 1);
		shard.yvel = Global.unitsize * -1.4 + i % 2;
		Global.EventHandler.addEvent(killNormal, 350, shard);
	}
}

// Listed in characters because of gravity. Has nocollide, so it's ok
function BrickShard(me) {
	me.width = me.height = 4;
	me.nocollide = true;
	me.death = killNormal;
	setCharacter(me, "brickshard");
	Global.EventHandler.addSpriteCycle(me, [unflipHoriz, flipHoriz]);
}

function attachEmerge(me, solid) {
	me.animate = setInterval(function() {
		setBottom(me, solid.top, true);
		if (!solid.up) {
			clearInterval(me.animate);
			me.animate = false;
		}
	}, Global.timer);
}

function Block(me, content, hidden) {
	me.width = me.height = 8;
	me.used = false;
	me.bottomBump = blockBump;
	if (!content) me.contents = [Coin]; else {
		if (content instanceof Array) {
			me.contents = content;
			while(me.contents.length < 3) me.contents.push(false);
		} else me.contents = [content, false, false];
	}
	me.death = killNormal;
	setSolid(me, "Block unused");
	if (!hidden) me.hidden = false;
	else {
		me.hidden = me.hidden = me.skipoverlaps = true;
	}
	me.tolx = 1;
	Global.EventHandler.addSpriteCycleSynched(me, ["one", "two", "three", "two", "one"]);
}

function blockBump(me, character) {
	if (character.type != "mario") return;
	if (me.used) {
		play("Bump");
		return;
	}
	me.used = 1;
	me.hidden = me.hidden = me.skipoverlaps = false;
	me.up = character;
	blockBumpMovement(me);
	removeClass(me, "hidden");
	switchClass(me, "unused", "used");
	if (Global.mario.power > 1 && me.contents[0] == Mushroom && !me.contents[1]) me.contents[0] = FireFlower;
	Global.EventHandler.addEvent(blockContentsEmerge, 7, me);
}

// out is a coin by default, but can also be other things - [1] and [2] are arguments
function blockContentsEmerge(me) {
	var out = new Thing(me.contents[0], me.contents[1], me.contents[2]);
	addThing(out, me.left, me.top);
	setMidXObj(out, me, true);
	out.blockparent = me;
	out.animate(out, me);
}

function Pipe(me, height, transport) {
	me.width = me.spritewidth = 16;
	me.height = (height || 1) * 8;
	if (transport !== false) {
		me.actionTop = intoPipeVert;
		me.transport = transport;
	}
	setSolid(me, "pipe");
}
function PipeSide(me, transport, small) {
	me.width = me.spritewidth = small ? 8 : 19.5;
	me.height = me.spriteheight = 16;
	if (transport) {
		me.actionLeft = intoPipeHoriz;
		me.transport = transport;
	}
	setSolid(me, "pipe side " + (small ? "small" : ""));
}
function PipeVertical(me, height) {
	me.spritewidth = me.width = 16;
	me.spriteheight = me.repeat = 1;
	me.height = height;
	setSolid(me, "pipe vertical");
}

// Locnum is -1 if this is a cutscene vine
// The actual vine is just a dummy
function Vine(me, locnum) {
	me.width = me.spriteheight = 7;
	me.height = 0;
	me.locnum = locnum;
	me.nocollide = me.nofall = me.repeat = true;
	me.animate = vineEmerge;
	me.movement = vineMovement;
	setCharacter(me, "vine");
}

function vineEmerge(me, solid) {
	play("Vine Emerging");
	setHeight(me, 0);
	me.movement = vineMovement;
	Global.EventHandler.addEvent(vineEnable, 14, me);
	Global.EventHandler.addEventInterval(vineStay, 1, 14, me, solid);
}

function vineStay(me, solid) {
	setBottom(me, solid.top);
}

function vineEnable(me) {
	me.nocollide = false;
	me.collide = touchVine;
}

function vineMovement(me) {
	increaseHeightTop(me, Global.unitsized4);
	if (me.attached) shiftVert(me.attached, -Global.unitsized4, true);
}

function touchVine(me, vine) {
	if (!me.mario || me.attached || me.climbing || me.bottom > vine.bottom + Global.unitsizet2) return;
	vine.attached = me;
	
	me.attached = vine;
	me.nofall = me.skipoverlaps = true;
	me.xvel = me.yvel = me.resting = me.jumping = me.jumpcount = me.running = 0;
	me.attachleft = !objectToLeft(me, vine);
	me.attachoff = me.attachleft * 2 - 1;
	me.movementsave = me.movement;
	me.movement = moveMarioVine;
	me.keys = new Keys();
	
	// Reset classes to be in vine mode
	Global.EventHandler.clearClassCycle(me, "running");
	removeClass(me, "running skidding");
	unflipHoriz(me);
	if (me.attachleft) flipHoriz(me);
	addClass(me, "climbing");
	// setSize(me, 7, 8, true);
	me.climbing = Global.EventHandler.addSpriteCycle(me, ["one", "two"], "climbing");
	
	// Make sure you're looking at the vine, and from the right distance
	lookTowardThing(me, vine);
	if (!me.attachleft) setRight(me, vine.left + Global.unitsizet4);
	else setLeft(me, vine.right - Global.unitsizet4);
	
}

function Springboard(me) {
	me.width = 8;
	me.height = me.heightnorm = 14.5;
	me.tension = me.tensionsave = 0;
	me.dir = 1; // 1 for down, -1 for up (ydir)
	me.collide = collideSpring;
	setSolid(me, "springboard");
}

function collideSpring(me, spring) {
	if (me.yvel >= 0 && me.mario && !spring.tension && characterOnSolid(me, spring))
		return springMarioInit(spring, me);
	return characterTouchedSolid(me, spring);
}

function springMarioInit(spring, mario) {
	spring.tension = spring.tensionsave = Global.max(mario.yvel * .77, Global.unitsize);
	mario.movement = moveMarioSpringDown;
	mario.spring = spring;
	mario.xvel /= 2.8;
}

function moveMarioSpringDown(me) {
	// If you've moved off the spring, get outta here
	if (!objectsTouch(me, me.spring)) {
		me.movement = moveMario;
		me.spring.movement = moveSpringUp;
		me.spring = false;
		return;
	}
	// If the spring is contracted, go back up
	if (me.spring.height < Global.unitsize * 2.5 || me.spring.tension < Global.unitsized32) {
		me.movement = moveMarioSpringUp;
		me.spring.movement = moveSpringUp;
		return;
	}
	// Make sure it's hard to slide off
	if (me.left < me.spring.left + Global.unitsizet2 || me.right > me.spring.right - Global.unitsizet2)
		me.xvel /= 1.4;
	
	reduceSpringHeight(me.spring, me.spring.tension);
	setBottom(me, me.spring.top, true);
	me.spring.tension /= 2;
	
	updateSize(me.spring);
}

function moveMarioSpringUp(me) {
	if (!me.spring || !objectsTouch(me, me.spring)) {
		me.spring = false;
		me.movement = moveMario;
		return;
	}
}

function moveSpringUp(spring) {
	reduceSpringHeight(spring, -spring.tension);
	spring.tension *= 2;
	if (spring == Global.mario.spring) 
		setBottom(Global.mario, spring.top, true);
	
	if (spring.height > spring.heightnorm) {
		if (spring == Global.mario.spring) {
			Global.mario.yvel = Global.max(-Global.unitsizet2, spring.tensionsave * -.98);
			Global.mario.resting = Global.mario.spring = false;
		}
		reduceSpringHeight(spring, (spring.height - spring.heightnorm) * Global.unitsize);
		spring.tension = spring.tensionsave = spring.movement = false;
	}
}

function reduceSpringHeight(spring, dy) {
	reduceHeight(spring, dy, true);
}

function Stone(me, width, height) {
	me.width = (width * 8) || 8;
	me.height = (height * 8) || 8;
	me.repeat = true;
	setSolid(me, "Stone");
}

// For historical reasons
function GenericStone(me, width, height) {
	return Stone(me, width, height);
}

function RestingStone(me) {
	me.width = me.height = 8;
	me.used = false;
	me.movement = RestingStoneUnused;
	setSolid(me, "Stone hidden");
	me.title = "Stone";
}

function RestingStoneUnused(me) {
	// Wait until Mario isn't resting
	if (!Global.mario.resting) return;
	// If Mario is resting on something else, this is unecessary
	if (Global.mario.resting != me) return killNormal(me);
	// Make the stone wait until it's no longer being rested upon
	me.movement = RestingStoneUsed;
	removeClass(me, "hidden");
	setThingSprite(Global.mario);
}

function RestingStoneUsed(me) { 
	if (!Global.mario.resting) return killNormal(me);
}

function CastleBlock(me, arg1, arg2) {
	me.width = me.height = 8;
	var length, dt, hidden = false;
	// Check for fireballs
	if (arg1 instanceof Array) {
		length = arg1[0];
		dt = arg1[1];
		hidden = arg2;
	}
	else {
		length = arg1;
		dt = arg2;
	}
	// If it's not hidden, set the background
	if (!hidden) {
		setSolid(me, "castleblock");
	}
	// Otherwise it's invisible
	else setSolid(me, "castleblockinvis");
	
	// Since there are fireballs, set that stuff
	if (length) {
		me.balls = new Array(length);
		me.dt = .07 * (dt ? 1 : -1);
		me.timeout = Global.round(7 / (Global.abs(dt) || 1));
		me.movement = castleBlockSpawn;
		me.timer =
		me.counter = 0;
		me.angle = .25;
	}
}

function castleBlockSpawn(me) {
	for(var i=0, spawn; i<me.balls.length; ++i) {
		spawn = new Thing(CastleFireBall, i * 4);
		var mid = me.width * Global.unitsized4, midx = me.left + mid, midy = me.top + mid;
		me.balls[i] = addThing(spawn, midx + i * Global.unitsize * 3, midy + i * Global.unitsize * 3);
	}
	me.movement = false;
	var interval = Global.abs(me.dt) || 1;
	Global.EventHandler.addEventInterval(castleBlockEvent, me.timeout, Infinity, me);
}

function castleBlockEvent(me) {
	me.midx = me.left;// + me.width * unitsize / 2;
	me.midy = me.top;// + me.height * unitsize / 2;
	me.counter = 0;
	me.angle += me.dt
	// Skip i=0 because it doesn't move
	for(var i = 1; i < me.balls.length; ++i) {
		setMidX(me.balls[i], me.midx + (i) * Global.unitsizet4 * Math.cos(me.angle * Math.PI), true);
		setMidY(me.balls[i], me.midy + (i) * Global.unitsizet4 * Math.sin(me.angle * Math.PI), true);
	}
}

// Set to solids because they spawn with their CastleBlocks
function CastleFireBall(me, distance) {
	me.width = me.height = 4;
	me.deadly = me.nofire = me.nocollidechar = me.nocollidesolid = me.nofall = me.nostar = me.outerok = me.skipoverlaps = true;
	me.movement = false;
	me.collide = collideEnemy;
	setCharacter(me, "fireball castle");
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "four"], 4);
}

function CastleBridge(me, length) {
	me.height = 8;
	me.width = length * 8 || 4;
	me.spritewidth = 4;
	me.repeat = true;
	setSolid(me, "CastleBridge");
}

function CastleChain(me) {
	me.height = 8;
	me.width = me.spritewidth = 7.5;
	me.nocollide = true;
	setSolid(me, "castlechain");
	// make standardized detector
}

function CastleAxe(me) {
	me.width = me.height = 8;
	me.spritewidth = me.spriteheight = 8;
	me.nocollide = true;
	setSolid(me, "castleaxe");
	Global.EventHandler.addSpriteCycle(me, ["one", "two", "three", "two"]);
}

// Step 1 of getting to that jerkface Toad
function CastleAxeFalls(me, collider) {
	var axe = collider.axe;
	// Don't do this if Mario would fall without the bridge
	if (!me.mario || 
		me.right < axe.left + Global.unitsize ||
		me.bottom > axe.bottom - Global.unitsize) return;
	// Immediately kill the axe and collider
	killNormal(axe);
	killNormal(collider);
	// Pause Mario & wipe the other characters
	Global.notime = Global.nokeys = true;
	thingStoreVelocity(me);
	killOtherCharacters();
	Global.EventHandler.addEvent(killNormal, 7, axe.chain);
	Global.EventHandler.addEvent(CastleAxeKillsBridge, 14, axe.bridge, axe);
	pauseTheme();
	playTheme("World Clear", false, false);
}

// Step 2 of getting to that jerkface Toad
function CastleAxeKillsBridge(bridge, axe) {
	// Decrease the size of the bridge
	bridge.width -= 2;
	bridge.right -= Global.unitsizet2;
	// If it's still here, go again
	if (bridge.width > 0) Global.EventHandler.addEvent(CastleAxeKillsBridge, 1, bridge, axe);
	// Otherwise call the next step
	else {
		bridge.width = 0;
		Global.EventHandler.addEvent(CastleAxeKillsBowser, 1, axe.bowser);
	}
	setWidth(bridge, bridge.width);
}

// Step 3 of getting to that jerkface Toad
function CastleAxeKillsBowser(bowser) {
	bowser.nofall = false;
	Global.EventHandler.addEvent(CastleAxeContinues, 35, Global.mario);
}

// Step 4 of getting to that jerkface Toad
function CastleAxeContinues(mario) {
	Global.map.canscroll = true;
	startWalking(mario);
}

function Toad(me) {
	me.width = 16;
	me.height = me.spriteheight = 12;
	me.group = "toad";
	setSolid(me, "toad npc");
}

function Peach(me) {
	me.width = 16;
	me.height = me.spriteheight = 12;
	me.group = "peach";
	setSolid(me, "peach npc");
}

// CollideCastleNPC is actually called by the FuncCollider
function collideCastleNPC(me, collider) {
	killNormal(collider);
	me.keys.run = 0;
	Global.EventHandler.addEvent(function(text) {
		var i;
		for(i = 0; i < text.length; ++i) {
			Global.EventHandler.addEvent(Global.proliferate, i * 70, text[i].element, {style: {visibility: "visible"}});
		}
		Global.EventHandler.addEvent(endLevel, (i + 3) * 70);
	}, 21, collider.text);
} 

function TreeTop(me, width) {
	// Tree trunks are scenery
	me.width = width * 8;
	me.height = 8;
	me.repeat = true;
	setSolid(me, "treetop");
}

function ShroomTop(me, width) {
	// Shroom trunks are scenery
	me.width = width * 8;
	me.height = 8;
	me.repeat = true;
	setSolid(me, "shroomtop");
}

// For the floaty ones, if the yvel is really big, +1000 points
function Platform(me, width, settings) {
	me.width = (width || 4) * 4;
	me.height = 4;
	me.spritewidth = 4;
	me.moving = 0;
	me.repeat = me.killonend = true;
	if (typeof(settings) == "function") settings  = [settings];
	if (settings instanceof Array) {
		me.movement = settings[0];
		me.begin = settings[1] * Global.unitsize;
		me.end = settings[2] * Global.unitsize;
		me.maxvel = (settings[3] || 1.5) * Global.unitsized4;
		if (me.movement == moveFloating || me.movement == movePlatformSpawn)
			me.yvel = me.maxvel;
		else me.xvel = me.maxvel;
		me.changing = 0; // 0 for normal, |1| for forward/back, |2| for waiting
	}
	if (me.movement == collideTransport) {
		me.movement = false;
		me.collide = collideTransport;
	}
	setSolid(me, "platform");
}

function PlatformGenerator(me, width, dir) {
	me.width = width * 4;
	me.interval = 35;
	me.height = me.interval * 6;
	me.dir = dir;
	me.nocollide = me.hidden = true;
	me.movement = PlatformGeneratorInit;
	setSolid(me, "platformgenerator");
}

function PlatformGeneratorInit(me) {
	for(var i = 0, inc = me.interval, height = me.height; i < height; i += inc) {
		me.platlast = new Thing(Platform, me.width / 4, [movePlatformSpawn, 0, 0, 1.5]);
		me.platlast.yvel *= me.dir;
		if (me.dir == 1) addThing(me.platlast, me.left, me.top + i * Global.unitsize);
		else addThing(me.platlast, me.left, me.bottom - i * Global.unitsize);
		me.platlast.parent = me;
		i += me.interval;
	}
	me.movement = false;
}

function movePlatformSpawn(me) {
	// This is like movePlatformNorm, but also checks for whether it's out of bounds
	// Assumes it's been made with a PlatformGenerator as the parent
	// To do: make the PlatformGenerator check one at a time, not each of them.
	if (me.bottom < me.parent.top) {
		setBottom(me, me.parent.bottom);
		detachMario(me);
	}
	else if (me.top > me.parent.bottom) {
		setTop(me, me.parent.top);
		detachMario(me);
	}
	else movePlatformNorm(me);
}

function movePlatformNorm(me) {
	shiftHoriz(me, me.xvel);
	shiftVert(me, me.yvel);
	if (me == Global.mario.resting && me.alive) {
		setBottom(Global.mario, me.top);
		shiftHoriz(Global.mario, me.xvel);
		if (Global.mario.right > innerWidth) setRight(Global.mario, innerWidth);
	}
}

function detachMario(me) {
	if (Global.mario.resting != me) return;
	Global.mario.resting = false;
}

// Placed via pushPreScale
// pushPreScale(xloc, yloc, width, [platwidth, offy1, offy2]);
// settings = [platwidth, offy1, offy2] (offy is distance from top to platform)
function Scale(me, width, settings) {
	me.height = 5;
	me.width = width * 4;
	me.spritewidth = me.spriteheight = 5;
	me.repeat = me.nocollide = true;
	
	setSolid(me, "scale");
}

function Flag(me) {
	me.width = me.height = 8;
	me.nocollide = true;
	setSolid(me, "flag");
}

function FlagPole(me) {
	me.width = 1;
	me.height = 72;
	me.nocollide = me.repeat = true;
	setSolid(me, "flagpole");
}

function FlagTop(me) {
	me.spritewidth = me.spriteheight = me.width = me.height = 4;
	me.nocollide = true;
	setSolid(me, "flagtop");
}

// The detectors are invisible, and just for ending the level.
function FlagDetector(me) {
	me.width = 2;
	me.height = 100;
	me.collide = FlagCollision;
	setSolid(me, "flagdetector");
	me.hidden = true;
}

function CastleDoorDetector(me) {
	me.width = me.height = 4;
	me.collide = endLevelPoints;
	setSolid(me, "castledoor");
	me.hidden = true;
}

function FlagCollision(me, detector) {
	if (!me || !me.mario) return killNormal(me);
	Global.detector = detector;
	pauseAllSounds();
	play("Flagpole");
	
	// Reset and clear most stuff, including killing all other characters
	killOtherCharacters();
	Global.nokeys = Global.notime = Global.mario.nofall = 1;
	
	// Mostly clear Mario, and set him to the pole's left
	Global.mario.xvel =
	Global.mario.yvel =
	Global.mario.keys.up =
	Global.mario.keys.jump =
	Global.map.canscroll =
	Global.map.ending =
	Global.mario.movement = 0;
	Global.mario.nocollidechar = true;
	setRight(me, detector.pole.left, true);
	removeClasses(me, "running jumping skidding");
	addClass(me, "climbing animated");
	updateSize(me);
	Global.EventHandler.addSpriteCycle(me, ["one", "two"], "climbing");
	marioRemoveStar(Global.mario); // just in case
	
	// Start the movement
	var mebot = false,
		flagbot = false,
		scoreheight = (detector.stone.top - me.bottom) / Global.unitsize,
		down = setInterval(function() {
			// Move mario until he hits the bottom, at which point mebot = true
			if (!mebot) {
				if (me.bottom >= detector.stone.top) {
					scoreMarioFlag(scoreheight, detector.stone);
					mebot = true;
					setBottom(me, detector.stone.top, true);
					removeClass(Global.mario, "animated");
					Global.EventHandler.clearClassCycle(Global.mario, "climbing");
				} else shiftVert(me, Global.unitsize, true);
			}
			// Same for the flag
			if (!flagbot) {
				if (detector.flag.bottom >= detector.stone.top) {
					flagbot = true;
					setBottom(detector.flag, detector.stone.top, true);
				} else shiftVert(detector.flag, Global.unitsize, true);
			}
			// Once both are at the bottom:
			if (mebot && flagbot) {
				setBottom(me, detector.stone.top, true);
				clearInterval(down);
				setTimeout(function() { FlagOff(me, detector.pole); }, Global.timer * 21);
			}
			refillCanvas();
		}, Global.timer);
}

// See http://themushroomkingdom.net/smb_breakdown.shtml near bottom
// Stages: 8, 28, 40, 62
function scoreMarioFlag(diff, stone) {
	var amount;
	// log(diff);
	// Cases of...
	if (diff < 28) {
		// 0 to 8
		if (diff < 8) { amount = 100; }
		// 8 to 28
		else { amount = 400; }
	}
	else {
		// 28 to 40
		if (diff < 40) { amount = 800; }
		// 40 to 62
		else if (diff < 62) { amount = 2000; }
		// 62 to infinity and beyond
		else { amount = 5000; }
	}
	score(Global.mario, amount, true);
}

function FlagOff(me, pole) {
	Global.mario.keys.run =
	Global.notime =
	Global.nokeys = 1;
	Global.mario.maxspeed = Global.mario.walkspeed;
	flipHoriz(me);
	Global.EventHandler.clearClassCycle(me, "climbing");
	setLeft(me, pole.right, true);
	setTimeout(function() {
		play("Stage Clear");
		marioHopsOff(me, pole, true);
	}, Global.timer * 14);
}

// Me === Mario
function endLevelPoints(me, detector) {
	if (!me || !me.mario) return;
	
	// Stop the game, and get rid of mario and the detectors
	Global.notime =
	Global.nokeys = true;
	killNormal(detector);
	killNormal(me);
	
	// Determine the number of fireballs (1, 3, and 6 become not 0)
	var numfire = Global.data.time.amount.toString().slice(-1);
	if (!(numfire == 1 || numfire == 3 || numfire == 6)) numfire = 0;

	// Count down the points (x50)
	var points = setInterval(function() {
		// 50 for each
		--Global.data.time.amount;
		Global.data.score.amount += 50;
		updateDataElement(Global.data.score);
		updateDataElement(Global.data.time);
		// Each point(x50) plays the coin noise
		play("Coin");
		// Once it's done, move on to the fireworks.
		if (Global.data.time.amount <= 0)  {
			// pause();
			clearInterval(points);
			setTimeout(() => endLevelFireworks(me, numfire, detector), Global.timer * 49);
		}
	}, Global.timerd2);
}

function endLevelFireworks(me, numfire, detector) {
	var nextnum,
		nextfunc,
		i = 0;
	if (numfire) {
		// var castlemid = detector.castle.left + detector.castle.width * Global.unitsized2;
		var castlemid = detector.left + 32 * Global.unitsized2;
		while(i < numfire) {
			//pre-increment since explodeFirework expects numbers starting at 1
			explodeFirework(++i, castlemid);
		}
		nextnum = Global.timer * (i + 2) * 42;
	} else {
		nextnum = 0;
	}
	
	// The actual endLevel happens after all the fireworks are done
	nextfunc = function() {
		setTimeout(() => endLevel(), nextnum);
	};
	
	// If the Stage Clear sound is still playing, wait for it to finish
	if (Global.sounds["Stage Clear"] && !Global.sounds["Stage Clear"].paused) {
		Global.sounds["Stage Clear"].addEventListener("ended", function() {
			Global.EventHandler.addEvent(nextfunc, 35);
		});
	} else {
		// Otherwise just start it immediately
		nextfunc();
	}
}

function explodeFirework(num, castlemid) {
	setTimeout(function() {
		var fire = new Thing(Firework, num);
		addThing(fire, castlemid + fire.locs[0] - Global.unitsize * 6, Global.unitsizet16 + fire.locs[1]);
		fire.animate();
	}, Global.timer * num * 42);
}

function Firework(me, num) {
	me.width = me.height = 8;
	me.nocollide = me.nofire = me.nofall = true;
	// Number is >0 if this is ending of level
	if (num)
		switch(num) {
			// These probably aren't the exact same as original... :(
			case 1: me.locs = [Global.unitsizet16, Global.unitsizet16]; break;
			case 2: me.locs = [-Global.unitsizet16, Global.unitsizet16]; break;
			case 3: me.locs = [Global.unitsizet16 * 2, Global.unitsizet16 * 2]; break;
			case 4: me.locs = [Global.unitsizet16 * -2, Global.unitsizet16 * 2]; break;
			case 5: me.locs = [0,Global.unitsizet16 * 1.5]; break;
			default: me.locs = [0,0]; break;
		}
	// Otherwise, it's just a normal explosion
	me.animate = function() {
		var name = me.className + " n";
		if (me.locs) play("Firework");
		Global.EventHandler.addEvent(function(me) { setClass(me, name + 1); }, 0, me);
		Global.EventHandler.addEvent(function(me) { setClass(me, name + 2); }, 7, me);
		Global.EventHandler.addEvent(function(me) { setClass(me, name + 3); }, 14, me);
		Global.EventHandler.addEvent(function(me) { killNormal(me); }, 21, me);
	}
	setCharacter(me, "firework");
}

function Coral(me, height) {
	me.width = 8;
	me.height = height * 8;
	me.repeat = true;
	setSolid(me, "coral");
}

function BridgeBase(me, width) {
	me.height = 4;
	me.spritewidth = 4;
	me.width = width * 8;
	me.repeat = true;
	setSolid(me, "bridge-base");
}

function WarpWorld(me) {
	me.width = 106; // 13 * 8 + 2
	me.height = 88;
	me.movement = setWarpWorldInit;
	me.collide = enableWarpWorldText;
	me.pirhanas = [];
	me.pipes = [];
	me.texts = [];
	me.hidden = true;
	setSolid(me, "warpworld");
}

function setWarpWorldInit(me) {
	// Just reduces the size 
	shiftHoriz(me, me.width * Global.unitsized2);
	me.width /= 2;
	updateSize(me); 
	me.movement = false;
}

function enableWarpWorldText(me, warp) {
	var pirhanas = warp.pirhanas,
			texts = warp.texts, i;
	for(i in pirhanas) {
		pirhanas[i].death();
	}
	for(i in texts)
		texts[i].element.style.visibility = "";
	killNormal(warp);
}

/* Scenery */

// Scenery sizes are stored in window.scenery
// After creation, they're processed
function resetScenery() {
	Global.Scenery = {
		// Individual sizes for scenery
		sprites: {
			"BrickHalf": [8, 4],
			"BrickPlain": [8, 8],
			"Bush1": [16, 8],
			"Bush2": [24, 8],
			"Bush3": [32, 8],
			"Castle": [75, 88],
			"CastleDoor": [8, 20],
			"CastleRailing": [8, 4],
			"CastleRailingFilled": [8, 4],
			"CastleTop": [12, 12],
			"CastleWall": [8, 48],
			"Cloud1": [16, 12],
			"Cloud2": [24, 12],
			"Cloud3": [32, 12],
			"HillSmall": [24, 9.5],
			"HillLarge": [40, 17.5],
			"Fence": [8, 8],
			"Pirhana": [8, 12],
			"pirhana": [8, 12],
			"PlantSmall": [7, 15],
			"PlantLarge": [8, 23],
			"Railing": [4, 4],
			"ShroomTrunk": [8, 8],
			"String": [1, 1],
			"TreeTrunk": [8, 8],
			"Water": { 
				0: 4,
				1: 5,
				spriteCycle: ["one", "two", "three", "four"]
			},
			"WaterFill": [4, 5]
		},
		// Patterns of scenery that can be placed in one call
		// Each ends with "Blank" to signify the ending width
		patterns: {
			backreg: [
				["HillLarge", 0, 0],
				["Cloud1", 68, 68],
				["Bush3", 92, 0],
				["HillSmall", 128, 0],
				["Cloud1", 156, 76],
				["Bush1", 188, 0],
				["Cloud3", 220, 68],
				["Cloud2", 292, 76],
				["Bush2", 332, 0],
				["Blank", 384]
			],
			backcloud: [
				["Cloud2", 28, 64],
				["Cloud1", 76, 32],
				["Cloud2", 148, 72],
				["Cloud1", 228, 0],
				["Cloud1", 284, 32],
				["Cloud1", 308, 40],
				["Cloud1", 372, 0],
				["Blank", 384]
			],
			backcloudmin: [ // used for random map generation
				["Cloud1", 68, 68],
				["Cloud1", 156, 76],
				["Cloud3", 220, 68],
				["Cloud2", 292, 76],
				["Blank", 384]
			],
			backfence: [
				["PlantSmall", 88, 0],
				["PlantLarge", 104, 0],
				["Fence", 112, 0, 4],
				["Cloud1", 148, 68],
				["PlantLarge", 168, 0],
				["PlantSmall", 184, 0],
				["PlantSmall", 192, 0],
				["Cloud1", 220, 76],
				["Cloud2", 244, 68],
				["Fence", 304, 0, 2],
				["PlantSmall", 320, 0],
				["Fence", 328, 0],
				["PlantLarge", 344, 0],
				["Cloud1", 364, 76],
				["Cloud2", 388, 68],
				["Blank", 384]
			],
			backfencemin: [
				["PlantLarge", 104, 0],
				["Fence", 112, 0, 4],
				["Cloud1", 148, 68],
				["PlantLarge", 168, 0],
				["PlantSmall", 184, 0],
				["PlantSmall", 192, 0],
				["Cloud1", 220, 76],
				["Cloud2", 244, 68],
				["Fence", 304, 0, 2],
				["PlantSmall", 320, 0],
				["Fence", 328, 0],
				["Cloud1", 364, 76],
				["Cloud2", 388, 68],
				["Blank", 384]
			],
			backfencemin2: [
				["Cloud2", 4, 68],
				["PlantSmall", 88, 0],
				["PlantLarge", 104, 0],
				["Fence", 112, 0, 1],
				["Fence", 128, 0, 2],
				["Cloud1", 148, 68],
				// ["PlantLarge", 168, 0],
				["PlantSmall", 184, 0],
				["PlantSmall", 192, 0],
				["Cloud1", 220, 76],
				["Cloud2", 244, 68],
				["Fence", 304, 0, 2],
				["PlantSmall", 320, 0],
				["Fence", 328, 0],
				["PlantLarge", 344, 0],
				["Cloud1", 364, 76],
				["Cloud2", 388, 68],
				["Blank", 384]
			],
			backfencemin3: [
				["Cloud2", 4, 68],
				["PlantSmall", 88, 0],
				["PlantLarge", 104, 0],
				["Fence", 112, 0, 4],
				["Cloud1", 148, 68],
				["PlantSmall", 184, 0],
				["PlantSmall", 192, 0],
				["Cloud1", 220, 76],
				["Cloud2", 244, 68],
				["Cloud1", 364, 76],
				["Cloud2", 388, 68],
				["Blank", 384]
			]
		}
	};
	
	processSceneryPatterns(Global.Scenery.patterns);
}

// Sets the width of them and removes the blank element
function processSceneryPatterns(patterns) {
	var current, i;
	for(i in patterns) {
		current = patterns[i];
		if (!current.length) continue;
		// The last array in current should be ["blank", width]
		current.width = current[current.length - 1][1];
		current.pop();
	}
}


// Used in worlds like 5-2 where patterns are slightly inaccurate
function SceneryBlocker(me, width, height) {
	me.width = width || 8;
	me.height = height || 8;
	me.nocollide = me.hidden = true;
	setSolid(me, "sceneryblocker");
}

// A sprite, based on scenery.sprites[name]
// It's repeated (reps = [x-rep, y-rep]) times ([1,1] by default)
function Sprite(me, name, reps) {
	if (!reps) reps = [1,1];
	// Grab the template from window.Scenery (or complain if it's not there)
	var template = me.template = Global.Scenery.sprites[name];
	if (!template) {
		console.log("No sprite template found for", name);
		return;
	}
	// Sizing is gotten from the listing under setScenery 
	me.width = (me.spritewidth = template[0]) * (reps[0] || 1);
	me.height = (me.spriteheight = template[1]) * (reps[1] || 1);
	me.unitwidth = me.spritewidth * Global.unitsize;
	me.unitheight = me.spriteheight * Global.unitsize;
	me.nocollide = me.maxquads = 1;
	me.repeat = true;
	setScenery(me, "scenery " + name);
	me.title = name;
	
	// If the listing has a SpriteCycle, do that
	if (template.spriteCycleTimer) {
		Global.EventHandler.addSpriteCycle(me, spriteCycleTimer, spriteCycleTimer || undefined)
	}
}

// To do: is this ever used? (no longer used in sky)
function LocationShifter(me, loc, size) {
	me.loc = loc;
	me.width = size[0];
	me.height = size[1];
	me.collide = collideLocationShifter;
	me.hidden = true;
	setSolid(me, "blue");
	return;
}
function collideLocationShifter(me, shifter) {
	if (!me.mario) return;
	shifter.nocollide = mario.piping = true;
	Global.EventHandler.addEvent( 
		function(me) {
			shiftToLocation(shifter.loc);
			if (Global.map.random) entryRandom(me);
		}, 1, me );
}

function ScrollBlocker(me, big) {
	me.width = 40;
	me.height = 140;  //gamescreen.height;
	me.nocollide = me.hidden = true;
	me.big = big;
	me.movement = function() {
		if (me.left - Global.mario.xvel <= Global.gamescreen.right - Global.gamescreen.left) {
			Global.map.canscroll = me.movement = false;
			Global.map.noscroll = me.big; // really just for random
		}
	}
	setSolid(me, "scrollblocker");
}

function ScrollEnabler(me) {
	me.width = 40;
	me.height = 140;//gamescreen.height;
	me.hidden = true;
	me.collide = function() {
		if (me.left - Global.mario.xvel <= Global.gamescreen.right - Global.gamescreen.left) {
			Global.map.canscroll = me.nocollide = true;
		}
	}
	setSolid(me, "scrollenabler");
}

function zoneToggler(me, func) {
	me.width = 40;
	me.height = 140;//gamescreen.height;
	me.func = func;
	me.hidden = true;
	me.collide = function(me, zone) {
		zone.func();
		zone.nocollide = true;
	}
	setSolid(me, "zonetoggler " + func.name);
}

function GenerationStarter(me, func, arg) {
	me.width = 8;
	me.height = Global.gamescreen.height + 20;
	me.func = func;
	me.arg = arg;
	me.collide = function(character, me) {
		if (character.type != "mario") return false;
		spawnMap();
		killNormal(me);
	};
	me.movement = function(me) {
		me.movement = false;
		addClass(me, "used");
		me.func((Global.gamescreen.left + me.right) / Global.unitsize, me.arg);
	};
	setSolid(me, "generationstarter");
	me.hidden = true;
}

function castleDecider(me, xloc, secnum) {
	me.height = Global.ceilmax;
	me.width = 10;
	me.nocollide = true;
	me.xloc = xloc;
	me.section = Global.map.area.sections[secnum];
	me.next = Global.map.area.sections[secnum + 1];
	me.movement = function(me) {
		if (me.left > Global.gamescreen.right - Global.gamescreen.left || !me.section.activated) return;
		var section = me.section;
		section.numpass = section.colliders.length =  0;
		if (section.passed) {
			++Global.map.area.sections.current;
			me.next(me.xloc);
		}
		else section(me.xloc);
		section.activated = section.passed = false;
		spawnMap();
		killNormal(me);
	}
	setSolid(me, "decider blue " + secnum);
	me.hidden = true;
}

// Used for general function activators, like zones
function FuncCollider(me, func, position) {
	// Fancy positions are [width, height]
	if (position) {
		me.width = position[0];
		me.height = position[1];
	}
	// Normally position is nothing
	else {
		me.width = 8;
		me.height = Global.ceilmax + 40;
	}
	me.collide = func;
	me.hidden = true;
	setSolid(me, "funccollider blue " + func.name);
}
function FuncSpawner(me, func, argument) {
	me.width = 8; me.height = 8;
	me.movement = function() { func(me, argument); };
	me.argument = argument;
	me.nocollide = me.hidden = true;
	setSolid(me, "funccollider blue " + func.name);
}

// To do: replace this whenever possible
function Collider(me, size, funcs) {
	me.width = size[0];
	me.height = size[1];
	if (funcs instanceof Array) {
		me.func = funcs[0] || function() {};
		me.movement = funcs[1] || function() {}
	}
	else {
		me.func = funcs || function() {};
		me.movement = false;
	}
	me.collide = function(character, me) {
		if (!character.mario) return false;
		me.func(character, me);
	}
	setSolid(me, "collider blue " + me.func.name);
	me.hidden = true;
}

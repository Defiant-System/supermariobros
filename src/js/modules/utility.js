/* Utility.js */
// Contains all needed helper functions not in toned.js

/* General stuff */
 
// Recursively goes down sub-objects of obj
// Path is ["path", "to", "target"], where num is how far along the path it is
function followPath(obj, path, num) {
	if (path[num] != null && obj[path[num]] != null)
		return followPath(obj[path[num]], path, ++num);
	return obj;
}

// Expensive - use only on clearing
function clearAllTimeouts() {
	var id = setTimeout(function() {});
	while(id--) clearTimeout(id);
}

// Width and height are given as number of pixels (to scale; unitsize) 
function getCanvas(width, height, stylemult) {
	var canv = Global.createElement("canvas", {
		width: width,
		height: height
	});
	
	// If necessary, make this thing's visual style
	if (stylemult) {
		// stylemult is 1 by default, but may be something else (typically unitsize)
		stylemult = stylemult || Global.unitsize;
		Global.proliferate(canv.style, {
			width: (width * stylemult) + "px",
			height: (height * stylemult) + "px"
		});
	}
	
	// For speed
	canv.getContext("2d").webkitImageSmoothingEnabled = false
	
	return canv;
}

function step(num) {
	unpause();
	upkeep();
	pause();
	if (num > 0) step(num - 1);
}

function fastforward(num) {
	pause();
	function resume() {
		for(i = speed = (num || 1) - 1; i > 0; --i)
			step();
		unpause();
	}
	
	requestAnimationFrame(resume);
}

function specifyTimer(timerin) {
	// Only use if you're not worried about losing the benefits of requestAnimationFrame
	// Also, this kills performance. Works best with smaller windows!
	timer = timerin;
	requestAnimationFrame = function(func) {
		setTimeout(func, timer);
	};
}

function changeUnitsize(num) {
	if (!num) return;
	resetUnitsize(num);
	
	function setter(arr) {
		for(i in arr) {
			updateSize(arr[i]);
			updatePosition(arr[i]);
		}
	}
	
	setter(Global.solids);
	setter(Global.characters);
}

// num = 1 by default
// 1 = floor(0->2) = 50% chance
// 2 = floor(0->3) = 67% chance
// 3 = floor(0->4) = 75% chance
function randTrue(num) {
	return floor(getSeed() * ((num || 1) + 1));
	// return floor(random() * ((num || 1) + 1));
}
function randSign(num) {
	return randTrue(num) * 2 - 1;
}
function randBoolJS(num) {
	return floor(random() * 2);
}

/*
 * Basic object positioning helper functions
 */
function updatePosition(me) {
	// if (!me.nomove) shiftHoriz(me, me.xvel * realtime);
	// if (!me.nofall) shiftVert(me, me.yvel * realtime);
	if (!me.nomove) shiftHoriz(me, me.xvel);
	if (!me.nofall) shiftVert(me, me.yvel);
}

function updateSize(me) {
	me.unitwidth = me.width * Global.unitsize;
	me.unitheight = me.height * Global.unitsize;
	me.spritewidthpixels = me.spritewidth * Global.unitsize;
	me.spriteheightpixels = me.spriteheight * Global.unitsize;
	var canvas;
	if (canvas = me.canvas) {
		canvas.width = me.spritewidthpixels;
		canvas.height = me.spriteheightpixels;
		// me.context = canvas.getContext("2d");
		refillThingCanvas(me);
	}
}

function reduceHeight(me, dy, see) {
	me.top += dy;
	me.height -= dy / Global.unitsize;
	
	if (see) {
		updateSize(me);
	}
}

function shiftBoth(me, dx, dy) {
	if (!me.noshiftx) shiftHoriz(me, dx);
	if (!me.noshifty) shiftVert(me, dy);
}

function shiftHoriz(me, dx) {
	me.left += dx;
	me.right += dx;
}

function shiftVert(me, dy) {
	me.top += dy;
	me.bottom += dy;
}

function setLeft(me, left) {
	me.left = left;
	me.right = me.left + me.width * Global.unitsize;
}

function setRight(me, right) {
	me.right = right;
	me.left = me.right - me.width * Global.unitsize;
}

function setTop(me, top) {
	me.top = top;
	me.bottom = me.top + me.height * Global.unitsize;
}

function setBottom(me, bottom) {
	me.bottom = bottom;
	me.top = me.bottom - me.height * Global.unitsize;
}

function setWidth(me, width, spriter, updater) {
	me.width = width;
	me.unitwidth = width * Global.unitsize;
	if (spriter) {
		me.spritewidth = width;
		me.spritewidthpixels = width * Global.unitsize;
	}
	if (updater) {
		updateSize(me);
		setThingSprite(me);
	}
}

function setHeight(me, height, spriter, updater) {
	me.height = height;
	me.unitheight = height * Global.unitsize;
	if (spriter) {
		me.spriteheight = height;
		me.spriteheightpixels = height * Global.unitsize;
	}
	if (updater) {
		updateSize(me);
		setThingSprite(me);
	}
}

function setSize(me, width, height, spriter, updater) {
	if (width) setWidth(me, width, spriter);
	if (height) setHeight(me, height, spriter);
	if (updater) {
		updateSize(me);
		setThingSprite(me);
	}
}

function setMidX(me, left, see) {
	setLeft(me, left + me.width * Global.unitsized2, see);
}

function getMidX(me) {
	return me.left + me.width * Global.unitsized2;
}

function setMidY(me, top, see) {
	setTop(me, top + me.height * Global.unitsized2, see);
}

function setMidXObj(me, object, see) {
	setLeft(me, (object.left + object.width * Global.unitsized2) - (me.width * Global.unitsized2), see);
}

function slideToXLoc(me, xloc, maxspeed, see) {
	maxspeed = maxspeed || Infinity;
	var midx = getMidX(me);
	if (midx < xloc) {
		// Me is the left
		shiftHoriz(me, Global.min(maxspeed, (xloc - midx)), see);
	} else {
		// Me is the right
		shiftHoriz(me, Global.max(-maxspeed, (xloc - midx)), see);
	}
}

function updateLeft(me, dx) {
	me.left += dx;
	me.right = me.left + me.width * Global.unitsize;
}

function updateRight(me, dx) {
	me.right += dx;
	me.left = me.right - me.width * Global.unitsize;
}

function updateTop(me, dy) {
	me.top += dy;
	me.bottom = me.top + me.height * Global.unitsize;
}

function updateBottom(me, dy) {
	me.bottom += dy;
	me.top = me.bottom - me.height * Global.unitsize;
}
// Increases the height, keeping the bottom the same
// dy comes in as factored for unitsize... e.g. increaseHeightTop(me, unitsized4)

function increaseHeightTop(me, dy, spriter) {
	me.top -= dy;
	me.height += dy / Global.unitsize;
	me.unitheight = me.height * Global.unitsize;
}

/*
 * Collisions
 */

function determineThingCollisions(me) {
	if (me.nocollide) return;
	else if (!me.resting || me.resting.yvel == 0) me.resting = false;
	
	// Cur is each quadrant this object is in, and other is each other object in them.
	var cur, others, other, contents,
			i, j, leni, lenj;
	
	// Unless directed not to, make sure this doesn't overlap anything
	// Overlaps are actually added a few lines down, under collisions for solids
	if (!me.skipoverlaps) checkOverlap(me);
	
	// For each quadrant the thing is in:
	for(i = 0, leni = me.numquads; i < leni; ++i) {
		cur = me.quads[i];
		others = cur.things;
		// For each other thing in that quadrant:
		for(j = 0, lenj = cur.numthings; j < lenj; ++j) {
			other = others[j];
			
			if (me == other) break; // breaking prevents double collisions
			if (!other.alive || other.scenery || other.nocollide) continue; // not removed in upkeep
			
			// The .hidden check is required. Try the beginning of 2-1 without it.
			// visual_scenery is also necessary because of Pirhanas (nothing else uses that)
			if (objectsTouch(me, other) && (me.mario || (!other.hidden || !(other.visual_scenery && other.visual_scenery.hidden)) || solidOnCharacter(other, me))) {
				// Collisions for characters are simple
				if (other.character)
					// if (charactersTouch(me, other))
						objectsCollided(me, other);
				
				// Collisions for solids, slightly less so (overlaps)
				else if (!me.nocollidesolid) {
					objectsCollided(me, other);
					if (!me.skipoverlaps && !other.skipoverlaps && characterOverlapsSolid(me, other))
						me.overlaps.push(other);
				}
			}
		}
	}
	
	if (me.undermid) me.undermid.bottomBump(me.undermid, me);
	else if (me.under instanceof Thing) me.under.bottomBump(me.under, me);
	
}

// give solid a tag for overlap
// remove tag when overlaps = []
function checkOverlap(me) {
	if (me.overlapdir) {
		if ((me.overlapdir < 0 && me.right <= me.ocheck.left + Global.unitsizet2)
				|| me.left >= me.ocheck.right - Global.unitsizet2) {
			me.overlapdir = 0;
			me.overlaps = [];
		}
		else shiftHoriz(me, me.overlapdir, true);
	}
	else if (me.overlaps.length > 0) {
		// mid = me.omid is the midpoint of what is being overlapped
		var overlaps = me.overlaps,
				right = {right: -Infinity},
				left = {left: Infinity}, 
				mid = 0, over,
				i;
		me.overlapfix = true;
		
		for(i in overlaps) {
			over = overlaps[i];
			mid += getMidX(over);
			if (over.right > right.right) right = over;
			if (over.left < left.left) left = over;
		}
		mid /= overlaps.length;
		if (getMidX(me) >= mid - Global.unitsized16) {
			// To the right of the middle: travel until past right
			me.overlapdir = Global.unitsize;
			me.ocheck = right;
		} else {
			// To the left of the middle: travel until past left
			me.overlapdir = -Global.unitsize;
			me.ocheck = left;
		}
	}
}

function characterOverlapsSolid(me, solid) {
	return me.top <= solid.top && me.bottom > solid.bottom;
}

// Purposefully only looks at toly; horizontal uses 1 unitsize
function objectsTouch(one, two) {
	if (one.right - Global.unitsize > two.left && one.left + Global.unitsize < two.right)
		if (one.bottom >= two.top && one.top <= two.bottom)
			return true;
	return false;
}

// Used to double-check objectsTouch
function charactersTouch(one, two) {
	if (one.bottom <= two.top + Global.unitsizet2 || one.top + Global.unitsizet2 >= two.bottom) return false;
	return true;
}

// No tolerance! Just unitsize.
function objectInQuadrant(one, quad) {
	if (one.right + Global.unitsize >= quad.left && one.left - Global.unitsize <= quad.right)
		if (one.bottom + Global.unitsize >= quad.top && one.top - Global.unitsize <= quad.bottom)
			return true;
	return false;
}

function objectsCollided(one, two) {
	// Assume that if there's a solid, it's two. (solids don't collide with each other)
	if (one.solid) {
		if (!two.solid) return objectsCollided(two, one);
	}
	
	// Up solids are special
	if (two.up && one != two.up) return characterTouchesUp(one, two);
	
	// Otherwise, regular collisions
	if (two.solid || one.mario)
		two.collide(one, two);
	else one.collide(two, one);
}

// Sees whether one's midpoint is to the left of two's
function objectToLeft(one, two) {
	return (one.left + one.right) / 2 < (two.left + two.right) / 2;
}

/*
	TO DO: Revamp these
*/
function objectOnTop(one, two) {
	if (one.type == "solid" && two.yvel > 0) return false;
	if (one.yvel < two.yvel && two.type != "solid") return false;
	if (one.mario && one.bottom < two.bottom && two.group == "enemy") return true;
	return(  (one.left + Global.unitsize < two.right && one.right - Global.unitsize > two.left) && 
	(one.bottom - two.yvel <= two.top + two.toly || one.bottom <= two.top + two.toly + Global.abs(one.yvel - two.yvel)));
}

// Like objectOnTop, but more specifically used for characterOnSolid and characterOnResting
function objectOnSolid(one, two) {
	return(
		( one.left + Global.unitsize < two.right &&
			one.right - Global.unitsize > two.left )
		&& 
		( one.bottom - one.yvel <= two.top + two.toly || 
			one.bottom <= two.top + two.toly + Global.abs(one.yvel - two.yvel) )
	);
}

function solidOnCharacter(solid, me) {
	if (me.yvel >= 0) return false;
	me.midx = getMidX(me);
	return me.midx > solid.left && me.midx < solid.right && 
	(solid.bottom - solid.yvel <= me.top + me.toly - me.yvel);
}

// This would make the smart koopas stay on the edges more intelligently
// Can't use objectOnTop for this, else Mario will walk on walls.
function characterOnSolid(me, solid) {
	return (me.resting == solid || (objectOnSolid(me, solid) && me.yvel >= 0 &&
		me.left + me.xvel + Global.unitsize != solid.right && me.right - me.xvel - Global.unitsize != solid.left));
		// me.left - me.xvel + unitsize != solid.right && me.right + me.xvel - unitsize != solid.left));
		// me.left - me.xvel + unitsize != solid.right && me.right - me.xvel - unitsize != solid.left));
}

function characterOnResting(me, solid) {
	return objectOnSolid(me, solid) &&
		// me.left - me.xvel + unitsize != solid.right && me.right - me.xvel - unitsize != solid.left;
		me.left + me.xvel + Global.unitsize != solid.right && me.right - me.xvel - Global.unitsize != solid.left;
}

function characterTouchedSolid(me, solid) {
	if (solid.up == me) return;
	
	// Me on top of the solid
	if (characterOnSolid(me, solid)) {
		if (solid.hidden) return;
		me.resting = solid;
		// Meh.
		if (me.mario && Global.map.underwater) removeClass(me, "paddling");
	}
	
	// Solid on top of me
	else if (solidOnCharacter(solid, me)) {
		var mid = me.left + me.width * Global.unitsize / 2;
		if (mid > solid.left && mid < solid.right) me.undermid = solid;
		else if (solid.hidden) return;
		if (!me.under) me.under = [solid];
		else me.under.push(solid);
		// To do: make this not so obviously hardcoded
		if (me.mario) {
			setTop(me, solid.bottom - me.toly + solid.yvel, true);
		}
		me.yvel = solid.yvel;
		if (me.mario) me.keys.jump = 0;
	}
	
	if (solid.hidden) return;
	
	// Character bumping into the side
	//// .midx is given by solidOnCharacter
	if (!characterNotBumping(me, solid) && !objectOnTop(me, solid) && !objectOnTop(solid, me) && !me.under && me != solid.up) {
		if (me.right <= solid.right) { // To left of solid
			me.xvel = Global.min(me.xvel, 0);
			shiftHoriz(me, Global.max(solid.left + Global.unitsize - me.right, -Global.unitsized2), true);
		} else if (me.left >= solid.left) { // To right of solid
			me.xvel = Global.max(me.xvel, 0);
			shiftHoriz(me, Global.min(solid.right - Global.unitsize - me.left, Global.unitsized2), true);
		}
		
		// Non-Marios are instructed to flip
		if (!me.mario) {
			me.moveleft = !me.moveleft;
			if (me.group == "item") me.collide(solid, me);
		}
		// Mario uses solid.actionLeft (e.g. Pipe -> intoPipeHoriz)
		else if (solid.actionLeft)
			solid.actionLeft(me, solid, solid.transport);
	}
}

// Really just for koopas
function characterNotBumping(me, solid) {
	if (me.top + me.toly + Global.abs(me.yvel) > solid.bottom) return true;
	return false;
}

function characterTouchesUp(me, solid) {
	switch(me.group) {
		case "item": 
			me.moveleft = getMidX(me) <= getMidX(solid) + Global.unitsized2;
			characterHops(me);
		break;
		case "coin":
			me.animate(me);
		break;
		default:
			me.death(me, 2);
			scoreEnemyBelow(me);
		break;
	}
}

function characterHops(me) {
	me.yvel = -1.4 * Global.unitsize;
	me.resting = false;
}

function characterIsAlive(me) {
	return !(!me || me.dead || !me.alive);
}

/*
 * Scoring on enemies
 */
function scoreMarioShell(mario, shell) {
	// Star Mario gets 200
	if (mario.star) return score(shell, 200, true);
	// Shells in the air cause 8000 points, oh lawdy
	if (!shell.resting) return score(shell, 8000, true);
	// Peeking shells are also more
	if (shell.peeking) return score(shell, 1000, true);
	// Regular points are just 100
	return score(shell, 100, true);
}

function scoreEnemyStomp(enemy) {
	var amount = 100;
	switch(enemy.type.split(" ")[0]) {
		case "koopa": amount = enemy.fly ? 400 : 100; break;
		case "bulletbill": amount = 200; break;
		case "cheepcheep": amount = 200; break;
		case "hammerbro": amount = 1000; break;
		case "lakitu": amount = 800; break;
		default: amount = 100; break;
	}
	// scoreEnemyFin(enemy, amount);
}

function scoreEnemyFire(enemy) {
	var amount = 200;
	switch(enemy.type.split(" ")[0]) {
		case "goomba": amount = 100; break;
		case "hammerbro": amount = 1000; break;
		case "bowser": amount = 5000; break;
		default: amount = 200; break;
	}
	scoreEnemyFin(enemy, amount);
}

function scoreEnemyStar(enemy) {
	var amount = 200;
	switch(enemy.type.split(" ")[0]) {
		case "goomba": amount = 100; break;
		case "hammerbro": amount = 1000; break;
		default: amount = 200; break;
	}
	scoreEnemyFin(enemy, amount);
	play("Kick");
}

function scoreEnemyBelow(enemy) {
	var amount = 100;
	switch(enemy.type.split(" ")[0]) {
		case "hammerbro": amount = 1000; break;
		default: amount = 100; break;
	}
	scoreEnemyFin(enemy, amount);
}

function scoreEnemyFin(enemy, amount) {
	score(enemy, amount, true);
}

/*
 * General actions
 */

function moveSimple(me) {
	if (me.direction != me.moveleft) {
		if (me.moveleft) {
			me.xvel = -me.speed;
			if (!me.noflip) unflipHoriz(me);
		} else {
			if (!me.noflip) flipHoriz(me);
			me.xvel = me.speed; 
		}
		me.direction = me.moveleft;
	}
}

function moveSmart(me) {
	moveSimple(me);
	
	if (me.yvel == 0 && (!me.resting || (offResting(me)))) {
		if (me.moveleft) shiftHoriz(me, Global.unitsize, true);
		else shiftHoriz(me, -Global.unitsize, true);
		me.moveleft = !me.moveleft;
	}
}

function offResting(me) {
	if (me.moveleft) return me.right - Global.unitsize < me.resting.left;
	else return me.left + Global.unitsize > me.resting.right;
}

function moveJumping(me) {
	moveSimple(me);
	if (me.resting) {
		me.yvel = -Global.abs(me.jumpheight);
		me.resting = false;
	}
}

// Floating: the vertical version
// Example usage on World 1-3
// [moveFloating, 30, 72] slides up and down between 30 and 72
function moveFloating(me) {
	setPlatformEndpoints(me);
	me.begin = Global.map.floor * Global.unitsize - me.begin;
	me.end = Global.map.floor * Global.unitsize - me.end;
	(me.movement = moveFloatingReal)(me);
}

function moveFloatingReal(me) {
	if (me.top < me.end)
		me.yvel = Global.min(me.yvel + Global.unitsized32, me.maxvel);
	else if (me.bottom > me.begin)
		me.yvel = Global.max(me.yvel - Global.unitsized32, -me.maxvel);
	movePlatformNorm(me);
}

// Sliding: the horizontal version
// Example usage on World 3-3
// [moveSliding, 228, 260] slides back and forth between 228 and 260
function moveSliding(me) {
	setPlatformEndpoints(me);
	(me.movement = moveSlidingReal)(me);
}

function moveSlidingReal(me) {
	if (gamescreen.left + me.left < me.begin)
		me.xvel = Global.min(me.xvel + Global.unitsized32, me.maxvel);
	else if (gamescreen.left + me.right > me.end)
		me.xvel = Global.max(me.xvel - Global.unitsized32, -me.maxvel);
	movePlatformNorm(me);
}

// Makes sure begin < end by swapping if not so
function setPlatformEndpoints(me) {
	if (me.begin > me.end) {
		var temp = me.begin;
		me.begin = me.end;
		me.end = temp;
	}
}

function collideTransport(me, solid) {
	characterTouchedSolid(me, solid);
	if (solid != me.resting) return;
	
	solid.movement = movePlatformNorm;
	solid.collide = characterTouchedSolid;
	solid.xvel = Global.unitsized2;
}

// To do: make me.collide and stages w/functions
// To do: split this into .partner and whatnot
function moveFalling(me) {
	if (me != mario.resting) return me.yvel = 0;
	
	// Since Mario is on me, fall
	shiftVert(me, me.yvel += Global.unitsized8);
	setBottom(mario, me.top);
	
	// After a velocity threshold, always fall
	if (me.yvel >= Global.unitsize * 2.8) {
		me.freefall = true;
		me.movement = moveFreeFalling;
	}
}
function moveFallingScale(me) {
	// If Mario is resting on me, fall
	if (mario.resting == me) {
		shiftScaleStringVert(me, me.string, me.yvel += Global.unitsized16);
		shiftScaleStringVert(me.partner, me.partner.string, -me.yvel);
		me.tension += me.yvel;
		me.partner.tension -= me.yvel;
	}
	// Otherwise, if me or partner has a positive yvel, slow it down
	else if (me.yvel > 0) {
		shiftScaleStringVert(me, me.string, me.yvel -= Global.unitsized32);
		shiftScaleStringVert(me.partner, me.partner.string, -me.yvel);
		me.tension -= me.yvel;
		me.partner.tension += me.yvel;
	}
	// If the platform falls off
	if (me.partner.tension <= 0) {
		me.collide = me.partner.collide = characterTouchedSolid;
		// Keep falling at an increasing pace
		me.movement = me.partner.movement = moveFreeFalling;
	}
}

function moveFreeFalling(me) {
	shiftVert(me, me.yvel += Global.unitsized16);
	if (me.yvel > Global.unitsizet2)
		me.movement = function(me) { shiftVert(me, me.yvel); }
}

function shiftScaleStringVert(me, string, yvel) {
	shiftVert(me, yvel);
	string.bottom = me.top;
	string.height = (string.bottom - string.top) / Global.unitsize;
	updateSize(string);
}

function setClass(me, strin) { me.className = strin; setThingSprite(me); }
function setClassInitial(me, strin) { me.className = strin; }
function addClass(me, strin) { me.className += " " + strin; setThingSprite(me); }
function removeClass(me, strout) { me.className = me.className.replace(new RegExp(" " + strout,"gm"),''); setThingSprite(me); }
function switchClass(me, strout, strin) { removeClass(me, strout); addClass(me, strin); }
function removeClasses(me) {
	var strings, arr, i, j;
	for(i = 1; i < arguments.length; ++i) {
		arr = arguments[i];
		if (!(arr instanceof Array)) arr = arr.split(" ");
		for(j = arr.length - 1; j >= 0; --j)
			removeClass(me, arr[j]);
	}
}

function addClasses(me, strings) {
	var arr = strings instanceof Array ? strings : strings.split(" ");
	for(var i = arr.length - 1; i >= 0; --i)
		addClass(me, arr[i]);
}

// Used in Editor
function addElementClass(element, strin) { element.className += " " + strin; }
function removeElementClass(element, strin) { element.className = element.className.replace(new RegExp(" " + strin,"gm"),''); }

function flipHoriz(me) { addClass(me, "flipped"); }
function flipVert(me) { addClass(me, "flip-vert"); }
function unflipHoriz(me) { removeClass(me, "flipped"); }
function unflipVert(me) { removeClass(me, "flip-vert"); }

/*
 * Deaths & removing
 */

// Javascript memory management, you are bad and should feel bad.
function deleteThing(me, array, arrayloc) {
	array.splice(arrayloc, 1);
	if (me.ondelete) me.ondelete();
}

function switchContainers(me, outer, inner) {
	outer.splice(outer.indexOf(me), 1);
	inner.push(me);
}

function containerForefront(me, container) {
	container.splice(container.indexOf(me), 1);
	container.unshift(me);
}

function killNormal(me) {
	if (!me) return;
	me.hidden = me.dead = true;
	me.alive = me.resting = me.movement = false;
	Global.EventHandler.clearAllCycles(me);
}

function killFlip(me, extra) {
	flipVert(me);
	me.bottomBump = function() {};
	me.nocollide = me.dead = true;
	me.resting = me.movement = me.speed = me.xvel = me.nofall = false;
	me.yvel = -Global.unitsize;
	Global.EventHandler.addEvent(function(me) { killNormal(me); }, 70 + (extra || 0));
}

// To do: phase this out in favor of an addEvent-based one
function generalMovement(me, dx, dy, cleartime) {
	var move = setInterval(function() {
		shiftVert(me, dy);
		shiftHoriz(me, dx);
	}, Global.timer);
	setTimeout(function() { clearInterval(move); }, cleartime);
}

function blockBumpMovement(me) {
	var dir = -3, dd = .5;
	// To do: addEventInterval?
	var move = setInterval(function() {
		shiftVert(me, dir);
		dir += dd;
		if (dir == 3.5) {
			clearInterval(move);
			me.up = false;
		}
		determineThingCollisions(me); // for coins
	}, Global.timer);
}

function emergeUp(me, solid) {
	play("Powerup Appears");
	flipHoriz(me);
	me.nomove = me.nocollide = me.alive = me.nofall = me.emerging = true;
	determineThingQuadrants(me);
	switchContainers(me, Global.characters, Global.scenery);
	// Start moving up
	var move = setInterval(function() {
				shiftVert(me, -Global.unitsized8);
				// Stop once the bottom is high enough
				if (me.bottom <= solid.top) {
					clearInterval(move);
					switchContainers(me, Global.scenery, Global.characters);
					me.nocollide = me.nomove = me.moveleft = me.nofall = me.emerging = false;
					// If it has a function to call after being completely out (vines), do it
					if (me.emergeOut) me.emergeOut(me, solid);
					// If there's movement, don't do it at first
					if (me.movement) {
						me.movementsave = me.movement;
						me.movement = moveSimple;
						// Wait until it's off the solid
						me.moving = Global.EventHandler.addEventInterval(function(me, solid) {
							if (me.resting != solid) {
								Global.EventHandler.addEvent(function(me) { me.movement = me.movementsave; }, 1, me);
								return true;
							}
						}, 1, Infinity, me, solid);
					}
				}
			}, Global.timer);
}

function flicker(me, cleartime, interval) {
	var cleartime = Global.round(cleartime) || 49,
		interval = Global.round(interval) || 3;
	me.flickering = true;
	Global.EventHandler.addEventInterval(function(me) { me.hidden = !me.hidden; }, interval, cleartime, me);
	Global.EventHandler.addEvent(function(me) { me.flickering = me.hidden = false; }, cleartime * interval + 1, me);
}

// Kills all characters other than mario
// Used in endCastleOutside/Inside
// Also kills all moving solids
function killOtherCharacters() {
	var thing, i;
	if (Global.characters) {
		for(i = Global.characters.length - 1; i >= 0; --i) {
			thing = Global.characters[i];
			if (!thing.nokillend) deleteThing(thing, Global.characters, i);
			else if (thing.killonend) thing.killonend(thing);
		}
	}
	if (Global.solids) {
		for(i = Global.solids.length - 1; i >= 0; --i)
			if (Global.solids[i].killonend)
				deleteThing(Global.solids[i], Global.solids, i);
	}
}

function lookTowardMario(me, big) {
	// Mario is to the left
	if (mario.right <= me.left) {
		if (!me.lookleft || big) {
			me.lookleft = true;
			me.moveleft = false;
			unflipHoriz(me);
		}
	}
	// Mario is to the right
	else if (mario.left >= me.right) {
		if (me.lookleft || big) {
			me.lookleft = false;
			me.moveleft = true;
			flipHoriz(me);
		}
	}
}
function lookTowardThing(me, thing) {
	// It's to the left
	if (thing.right <= me.left) {
		me.lookleft = true;
		me.moveleft = false;
		unflipHoriz(me);
	}
	// It's to the right
	else if (thing.left >= me.right) {
		me.lookleft = false;
		me.moveleft = true;
		flipHoriz(me);
	}
}
/* Upkeep.js */
// Contains functions associated with the upkeep

function upkeep() {
	if (Global.paused) return;
	Global.nextupk = requestAnimationFrame(upkeep);
	// Global.nextupk = setTimeout(upkeep, Global.timer);
	
	// Adjust for differences in performance
	adjustFPS();
	
	// Quadrants upkeep
	determineAllQuadrants();
	
	// Solids upkeep
	maintainSolids();
	
	// Character upkeep
	maintainCharacters();
	
	// Mario specific
	maintainMario();
	
	// Texts upkeep, if there are any
	if (Global.texts.length) maintainTexts();
	
	// Events upkeep
	Global.EventHandler.handleEvents();
	// handleEvents();
	
	refillCanvas();
}

function adjustFPS() {
	Global.time_now = Global.now();
	var time_diff = Global.time_now - Global.time_prev,
		fps_actual = Global.roundDigit(1000 / time_diff, .001);
	
	Global.fps = Global.roundDigit((.7 * Global.fps) + (.3 * fps_actual), .01);
	Global.realtime = Global.fps_target / Global.fps;
	Global.time_prev = Global.time_now;
}

function pause(big) {
	if (Global.paused && !Global.nextupk) return;
	cancelAnimationFrame(Global.nextupk);
	pauseAllSounds();
	Global.paused = true;
	if (big) play("Pause");
}

function unpause() {
	if (!Global.paused) return;
	Global.nextupk = requestAnimationFrame(upkeep);
	Global.paused = false;
	resumeAllSounds();
}


// Solids by themselves don't really do much
function maintainSolids(update) {
	for(var i = 0, solid; i < Global.solids.length; ++i) {
		solid = Global.solids[i];
		if (solid.alive) {
			if (solid.movement) solid.movement(solid);
		}
		if (!solid.alive || solid.right < Global.quads.delx)
			deleteThing(solid, Global.solids, i);
	}
}

function maintainCharacters(update) {
	var delx = Global.gamescreen.right + Global.quads.rightdiff,
		character, i;
	for(i = 0; i < Global.characters.length; ++i) {
		character = Global.characters[i];
		// Gravity
		if (!character.resting) {
			if (!character.nofall) character.yvel += character.gravity || Global.map.gravity;
			character.yvel = Global.min(character.yvel, Global.map.maxyvel);
		} else character.yvel = 0;
		
		// Position updating and collision detection
		updatePosition(character);
		determineThingQuadrants(character);
		character.under = character.undermid = false;
		determineThingCollisions(character);
		
		// Resting tests
		if (character.resting) {
			if (!characterOnResting(character, character.resting)) {
				character.resting = false; // Necessary for moving platforms :(
			} else {
				/*character.jumping = */character.yvel = false;
				setBottom(character, character.resting.top);
			}
		}
		
		// Movement or deletion
		// To do: rethink this...
		//// Good for performance if gamescreen.bottom - gamescreen.top is saved in screen and updated on shift
		// To do: is map.shifting needed?
		if (character.alive) {
			if (character.type != "mario" && !Global.map.shifting && 
				(character.numquads == 0 || character.left > delx) && !character.outerok) {
					// (character.top > gamescreen.bottom - gamescreen.top || character.left < + quads.width * -1)) {
				deleteThing(character, Global.characters, i);
			} else {
				if (!character.nomove && character.movement) {
					character.movement(character);
				}
				// if (update) updateDisplay(character);
			}
		} else if (!Global.map.shifting) {
			deleteThing(character, Global.characters, i);
		}
	}
}

function maintainMario(update) {
	if (!Global.mario.alive) return;
	
	// Mario is falling
	if (Global.mario.yvel > 0) {
		if (!Global.map.underwater) Global.mario.keys.jump = 0;
		// Jumping?
		if (!Global.mario.jumping) {
			// Paddling? (from falling off a solid)
			if (Global.map.underwater) {
				if (!Global.mario.paddling) {
					switchClass(Global.mario, "paddling", "paddling");
					Global.mario.padding = true;
				}
			}
			else {
				addClass(Global.mario, "jumping");
				Global.mario.jumping = true;
			}
		}
		// Mario has fallen too far
		if (!Global.mario.piping && !Global.mario.dying && Global.mario.top > Global.gamescreen.deathheight) {
			// If the map has an exit loc (cloud world), transport there
			if (Global.map.exitloc) {
				// Random maps will pretend he died
				if (Global.map.random) {
					goToTransport(["Random", "Overworld", "Down"]);
					marioDropsIn();
					return;
				}
				// Otherwise just shift to the location
				return shiftToLocation(Global.map.exitloc);
			}
			// Otherwise, since Mario is below the gamescreen, kill him dead
			clearMarioStats();
			killMario(Global.mario, 2);
		}
	}
	
	// Mario is moving to the right
	if (Global.mario.xvel > 0) {
		if (Global.mario.right > Global.gamescreen.middlex) {
			// If Mario is to the right of the gamescreen's middle, move the gamescreen
			if (Global.mario.right > Global.gamescreen.right - Global.gamescreen.left)
				Global.mario.xvel = Global.min(0, Global.mario.xvel);
		}
	}
	// Mario is moving to the left
	else if (Global.mario.left < 0) {
		// Stop Mario from going to the left.
		Global.mario.xvel = Global.max(0, Global.mario.xvel);
	}
	
	// Mario is hitting something (stop jumping)
	if (Global.mario.under) Global.mario.jumpcount = 0;
	
	// Scrolloffset is how far over the middle mario's right is
	// It's multiplied by 0 or 1 for map.canscroll
	Global.scrolloffset = (Global.map.canscroll/* || (map.random && !map.noscroll)*/) * (Global.mario.right - Global.gamescreen.middlex);
	if (Global.scrolloffset > 0 && !Global.map.shifting) {
		scrollWindow(Global.lastscroll = Global.round(Global.min(Global.mario.scrollspeed, Global.scrolloffset)));
	}
	else Global.lastscroll = 0;
}

// Deletion checking is done by an interval set in shiftToLocation
// This simply does velocity
function maintainTexts() {
	var element, me, i;
	for(i = Global.texts.length - 1; i >= 0; --i) {
		me = Global.texts[i];
		element = me.element || me;
		if (me.xvel) Global.elementShiftLeft(element, me.xvel);
		if (me.yvel) Global.elementShiftTop(element, me.yvel);
	}
}
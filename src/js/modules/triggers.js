/* Triggers.js */

// Keeps track of triggers, which mainly consist of key presses,
// and messages, which would be from an index.html UI
function resetTriggers() {
	// Make the controls object
	Global.controls = new Controls({
		left:   [37, 65,    ], // a,     left
		right:  [39, 68,    ], // d,     right
		up:     [38, 87, 32 ], // w,     up
		down:   [40, 83,    ], // s,     down
		sprint: [16, 17,    ], // shift, ctrl
	//	pause:  [80,        ], // p
	//	mute:   [77],          // m
	});
	
	// Set the key events on the body
	Global.proliferate(document.body, {
			onkeydown: ControlsPipe("keydown", true),
			onkeyup: ControlsPipe("keyup", false),
		});
}

// Hash table for onkeydown and onkeyup
function Controls(pipes) {
	// Pipes is a listing of which actions are piped to by which character codes
	this.pipes = pipes;

	// Actions are piped to the corresponding keydown or keyup via the corresponding ControlsPipe
	var keydown = this.keydown = {
		// Left
		left: function(keys) {
			keys.run = -1;
			keys.left_down = true;
		},
		// Right
		right: function(keys) {
			keys.run = 1;
			keys.right_down = true; // independent of changes to mario.keys.run
		},
		// Up / Jump
		up: function(keys) {
			keys.up = true;
			if (Global.mario.canjump &&/* !Global.mario.crouching &&*/ (Global.mario.resting || Global.map.underwater)) {
				keys.jump = 1;
				Global.mario.canjump = keys.jumplev = 0;
				// To do: can mario make a jumping sound during the spring, and during the pipe cutscenes?
				if (Global.mario.power > 1) {
					play("Jump Super");
				} else {
					play("Jump Small");
				}
				if (Global.map.underwater) setTimeout(function() {
					Global.mario.jumping =
					keys.jump = false;
				}, Global.timer * 14);
			}
		},
		// Down / Crouch
		down: function(keys) {
			keys.crouch = true;
		},
		// Sprint / Fire
		sprint: function(keys) {
			if (Global.mario.power == 3 && keys.sprint == 0 && !keys.crouch) {
				Global.mario.fire();
			}
			keys.sprint = 1;
		}
	};

	var keyup = this.keyup = {
		// Left
		left: function(keys) {
			keys.run = 0;
			keys.left_down = false;
		},
		// Right
		right: function(keys) {
			keys.run = 0;
			keys.right_down = false;
		},
		// Up
		up: function(keys) {
			if (!Global.map.underwater) keys.jump = keys.up = 0;
			Global.mario.canjump = true;
		},
		// Down
		down: function(keys) {
			keys.crouch = 0;
			removeCrouch();
		},
		// Spring
		sprint: function(keys) {
			keys.sprint = 0;
		}
	}

	var tag, codes, code, i;
	// Map each character code in pipes to the corresponding key event
	// For each tag ("up", "down"...)
	for (tag in pipes) {
		// For each array of character codes, like 38 (up) or 40 (down)
		codes = pipes[tag];
		for (i in codes) {
			code = codes[i];
			// That code redirects to the equivalent tag (38 -> "up")
			keydown[code] = keydown[tag];
			keyup[code] = keyup[tag];
		}
	}
}

// Generates a pipe to the given name
// For example, ControlsPipe("keydown") pipes to Controls.keydown
function ControlsPipe(name, strict) {
	var responses = Global.controls[name];
	return function(event) {
		if ((strict && ((Global.mario && Global.mario.dead) || Global.paused)) || Global.nokeys) return;

		// Allow this to be used as keyup(37) or keyup({which: 37})
		if (typeof(event) != "number" || event.which || event.control) {
			event = event.which || event.control;
		}
		// If there is a known response to this character code, do it
		if (responses[event]) {
			responses[event](Global.mario.keys);
		} else {
			// Otherwise only complain if verbosity[name] is true
			console.log(name, "Could not", name,  event);
		}
	};
}

function keydown(event) {
	if ((Global.mario && Global.mario.dead) || Global.paused || Global.nokeys) return;
	var responses = Global.controls["keydown"];
	// Allow this to be used as keyup(37) or keyup({which: 37})
	if (typeof(event) === "object" || event.which) {
		event = event.which;
	}
	if (responses[event]) {
		responses[event](Global.mario.keys);
	}
}

function keyup(event) {
	if (Global.nokeys) return;
	var responses = Global.controls["keyup"];
	// Allow this to be used as keyup(37) or keyup({which: 37})
	if (typeof(event) === "object" || event.which) {
		event = event.which;
	}
	if (responses[event]) {
		responses[event](Global.mario.keys);
	}
}



/* Triggers (from a UI)
*/

// The UI has requested a map change
function triggerSetMap(data) {
	clearMarioStats();
	setMap.apply(this, data.map || []);
	setLives(3);
}

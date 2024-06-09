
@import "modules/data.js";
@import "modules/EventHandlr.js";
@import "modules/generator.js";
@import "modules/library.js";
@import "modules/maps.js";
@import "modules/mario.js";
@import "modules/quadrants.js";
@import "modules/sounds.js";
@import "modules/sprites.js";
@import "modules/things.js";
@import "modules/toned.js";
@import "modules/upkeep.js";
@import "modules/utility.js";

@import "modules/test.js";


const Global = {
	addClass,
	removeClass,
	worlds: @import "modules/worlds.js",
	settings: {
		muted: false,
		fx: true,
		music: true,
	}
};

const supermariobros = {
	init() {
		// fast references
		this.content = window.find("content");
	},
	dispatch(event) {
		let Self = supermariobros,
			Keys,
			keyCode,
			type;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				// get settings, if any
				Global.settings = window.settings.getItem("settings") || Global.settings;
				// start game
				StartGame();

				// DEV-ONLY-START
				Test.init();
				// DEV-ONLY-END
				break;
			case "window.focus":
				unpause(true);
				break;
			case "window.blur":
				if (Global.mario) pause(true);
				break;
			case "window.close":
				// save settings
				window.settings.setItem("settings", Global.settings);
				break;
			case "window.keydown":
				if (Global.paused) return;
				Keys = Global.mario.keys;

				switch (event.keyCode) {
					case 37: // left
					case 65: // a
						Keys.run = -1;
						Keys.left_down = true;
						break;
					case 39: // right
					case 68: // d
						Keys.run = 1;
						Keys.right_down = true;
						break;
					case 38: // up
					case 87: // w
					case 32: // space
						Keys.up = true;
						if (Global.mario.canjump && (Global.mario.resting || Global.map.underwater)) {
							Keys.jump = 1;
							Global.mario.canjump =
							Keys.jumplev = 0;
							// To do: can mario make a jumping sound during the spring, and during the pipe cutscenes?
							
							play(Global.mario.power > 1 ? "Jump Super" : "Jump Small");

							if (Global.map.underwater) setTimeout(function() {
								Global.mario.jumping =
								Keys.jump = false;
							}, Global.timer * 14);
						}
						break;
					case 40: // down
					case 83: // s
						Keys.crouch = true;
						break;
					case 16: // shift
					case 17: // ctrl
						if (Global.mario.power == 3 && Keys.sprint == 0 && !Keys.crouch) {
							Global.mario.fire();
						}
						Keys.sprint = 1;
						break;
				}
				break;
			case "window.keyup":
				if (Global.paused) return;
				Keys = Global.mario.keys;

				switch (event.keyCode) {
					case 37: // left
					case 65: // a
						Keys.run = 0;
						Keys.left_down = false;
						break;
					case 39: // right
					case 68: // d
						Keys.run = 0;
						Keys.right_down = false;
						break;
					case 38: // up
					case 87: // w
					case 32: // space
						if (!Global.map.underwater) {
							Keys.jump =
							Keys.up = 0;
						}
						Global.mario.canjump = true;
						break;
					case 40: // down
					case 83: // s
						Keys.crouch = 0;
						removeCrouch();
						break;
					case 16: // shift
					case 17: // ctrl
						Keys.sprint = 0;
						break;
				}
				break;
			// gamepad support
			case "gamepad.down":
				switch (event.button) {
					case "b9": Self.dispatch({ type: "toggle-pause" }); break;
					case "b12": Self.dispatch({ type: "window.keystroke", keyCode: 38 }); break; // up
					case "b15": Self.dispatch({ type: "window.keystroke", keyCode: 39 }); break; // left
					case "b13": Self.dispatch({ type: "window.keystroke", keyCode: 40 }); break; // down
					case "b14": Self.dispatch({ type: "window.keystroke", keyCode: 37 }); break; // right
					case "b0": Self.dispatch({ type: "window.keystroke", keyCode: 16 }); break; // right
					default:
						// console.log(event);
				}
				break;
			case "gamepad.up":
				switch (event.button) {
					case "b12": Self.dispatch({ type: "window.keyup", keyCode: 38 }); break; // up
					case "b15": Self.dispatch({ type: "window.keyup", keyCode: 39 }); break; // left
					case "b13": Self.dispatch({ type: "window.keyup", keyCode: 40 }); break; // down
					case "b14": Self.dispatch({ type: "window.keyup", keyCode: 37 }); break; // right
					case "b0": Self.dispatch({ type: "window.keyup", keyCode: 16 }); break; // right
				}
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
			case "toggle-pause":
				Global.paused ? unpause(true) : pause(true);
				break;
			case "toggle-audio":
				toggleMute();
				break;
			case "toggle-music":
			case "toggle-sound-fx":
				console.log(event);
				break;
			case "set-level":
				clearMarioStats();
				setMap.apply({}, event.arg.split("-"));
				setLives(3);
				break;
		}
	}
};

window.exports = supermariobros;

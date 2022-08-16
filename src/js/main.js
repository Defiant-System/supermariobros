
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
		let Keys;
		switch (event.type) {
			// system events
			case "window.init":
				// get settings, if any
				Global.settings = window.settings.getItem("settings") || Global.settings;
				// start game
				StartGame();
				break;
			case "window.close":
				// save settings
				window.settings.setItem("settings", Global.settings);
				break;
			case "window.keystroke":
				if (Global.paused) return;
				Keys = Global.mario.keys;

				switch (event.keyCode) {
					case 77: // m - mute
						break;
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

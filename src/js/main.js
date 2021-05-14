
@import "modules/data.js";
@import "modules/EventHandlr.js";
@import "modules/generator.js";
@import "modules/library.js";
@import "modules/maps.js";
@import "modules/mario.js";
@import "modules/quadrants.js";
@import "modules/sounds-new.js";
@import "modules/sprites.js";
@import "modules/things.js";
@import "modules/toned.js";
@import "modules/triggers.js";
@import "modules/upkeep.js";
@import "modules/utility.js";


const Global = {
	addClass,
	removeClass,
	worlds: @import "modules/worlds.js"
};

const supermariobros = {
	init() {
		// fast references
		this.content = window.find("content");

		FullScreenMario();
		
		// window.audio.play("Overworld");
		// setTimeout(() => {
		// 	window.audio.play("Hurry Overworld");
		// }, 8000);
	},
	dispatch(event) {
		switch (event.type) {
			case "window.open":
				break;
			case "window.keystroke":

				switch (event.keyCode) {
					case 80: // p - pause
						Global.paused ? unpause(true) : pause(true);
						break;
					case 77: // m - mute
						toggleMute();
						break;
					case 37: // left
					case 65: // a
						break;
					case 39: // right
					case 68: // d
						break;
					case 38: // up
					case 87: // w
					case 32: // space
						break;
					case 40: // down
					case 83: // s
						break;
					case 16: // shift
					case 17: // ctrl
						break;
				}

				console.log( event.keyCode );
				break;
			case "window.keyup":
				
				break;
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = supermariobros;

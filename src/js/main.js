
@import "modules/data.js";
@import "modules/EventHandlr.js";
@import "modules/gamepad.js";
@import "modules/generator.js";
@import "modules/library.js";
@import "modules/load.js";
@import "modules/maps.js";
@import "modules/mario.js";
@import "modules/quadrants.js";
@import "modules/sounds.js";
@import "modules/sprites.js";
@import "modules/things.js";
@import "modules/toned.js";
@import "modules/triggers.js";
@import "modules/upkeep.js";
@import "modules/utility.js";


const Global = {
	worlds: @import "modules/worlds.js"
};

const supermariobros = {
	init() {
		// fast references
		this.content = window.find("content");

		FullScreenMario();
	},
	dispatch(event) {
		switch (event.type) {
			case "window.open":
				break;
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = supermariobros;

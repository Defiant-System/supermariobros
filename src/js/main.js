
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
			case "open-help":
				defiant.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = supermariobros;

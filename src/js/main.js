
@import "modules/mario.js";
@import "modules/toned.js";
@import "modules/library.js";
@import "modules/sprites.js";
@import "modules/utility.js";
@import "modules/EventHandlr.js";



const supermariobros = {
	init() {
		// fast references
		this.content = window.find("content");

		Mario();
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

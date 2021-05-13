/* Sounds.js */
// Stores sounds in a global sounds object, to be played back on command

// Starts pre-emptively loading sounds (see load.js::startLoadingSounds)
// All sounds are stored in library.sounds, while ones used in this run are also in window.sounds
function resetSounds() {
	Global.sounds = {};
	Global.theme = false;
	Global.muted = (localStorage && localStorage.muted == "true");
}


function play(name) {
	// play sound
	window.audio.play(name);
}


// The same as regular play, but with lower volume when further from Mario
function playLocal(name, xloc) {
	// Don't do anything if there's no actual Mario
	if (!Global.mario) return;

	let volume = 1;

	// If it's out of bounds (or muted), the volume is 0
	if (Global.muted || xloc < 0 || xloc > Global.gamescreen.unitwidth) {
		volume = 0;
	} else {
		// Otherwise it's a function of how far the thing is from Mario
		volume = Global.max(.14, Global.min(.84, 1.4 * (Global.gamescreen.unitwidth - Global.abs(xloc - Global.mario.left)) / Global.gamescreen.unitwidth));
	}
	// play sound
	window.audio.play(name, { volume });
}

// Plays a theme as sounds.theme via play()
// If no theme is provided, it plays the area's theme
function playTheme(name, resume, loop) {
	// First make sure there isn't already a theme playing
	// window.audio.pause();

	// If the name isn't given, get it from the current area
	if (!name) name = Global.area.theme;

	// play sound
	window.audio.play(name);

	// save reference to sound
	Global.sounds.theme = name;
}

// The equivalent of playTheme with Hurry added on
function playCurrentThemeHurry(name) {
	playTheme("Hurry " + (name || Global.area.theme));
}

// Called when a sound is done to get it out of sounds
function soundFinish(sound, name) {
	console.log("soundFinish");
}

function soundStop(sound) {
	// If this sound has a readyState, stop it
	console.log("soundStop");
}

function toggleMute() {
	console.log("toggleMute");
}

function pauseAllSounds() {
	window.audio.pause();
}

function resumeAllSounds() {
	window.audio.play();
}

function pauseTheme() {
	window.audio.pause(Global.sounds.theme);
}

function resumeTheme() {
	window.audio.resume(Global.sounds.theme);
}

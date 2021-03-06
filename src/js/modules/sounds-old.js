/* Sounds.js */
// Stores sounds in a global sounds object, to be played back on command

// Starts pre-emptively loading sounds (see load.js::startLoadingSounds)
// All sounds are stored in library.sounds, while ones used in this run are also in window.sounds
function resetSounds() {
	Global.sounds = {};
	Global.theme = false;
	Global.muted = Global.settings.muted;
}


// Override is whether the main music pauses
function play(name) {
	// First check if this is already in sounds
	var sound = Global.sounds[name];

	// If it's not already being played,
	if (!sound) {
		// Check for it in the library
		if (sound = Global.library.sounds[name]) {
			Global.sounds[name] = sound;
		} else {
			// Otherwise it's not known, complain
			// console.log("Unknown sound: '" + name + "'");
			window.audio.play(name);
			return sound;
		}
	}
	
	// Reset the sound, then play it
	if (sound.readyState) {
		// sound.pause();
		sound.currentTime = 0;
	}
	sound.volume = !Global.muted;
	sound.play();
	
	// If this is the first time the sound was added, let it know how to stop
	if (!(sound.used++)) {
		sound.addEventListener("ended", function() {
			soundFinish(sound, name);
		});
	}
	
	return sound;
}

// The same as regular play, but with lower volume when further from Mario
function playLocal(name, xloc, main) {
	var sound = play(name, main),
		volume_real;
	// Don't do anything without having played a sound, or if there's no actual Mario
	if (!sound || !Global.mario) return;
	
	// If it's out of bounds (or muted), the volume is 0
	if (Global.muted || xloc < 0 || xloc > Global.gamescreen.unitwidth) volume_real = 0;
	// Otherwise it's a function of how far the thing is from Mario
	else volume_real = Global.max(.14, Global.min(.84, 1.4 * (Global.gamescreen.unitwidth - Global.abs(xloc - Global.mario.left)) / Global.gamescreen.unitwidth));
	
	sound.volume = volume_real;
	sound.volume_real = volume_real;
}


// Plays a theme as sounds.theme via play()
// If no theme is provided, it plays the area's theme
function playTheme(name, resume, loop) {
	// set loop default to true
	loop = typeof loop !== 'undefined' ? loop : true;

	// First make sure there isn't already a theme playing
	if (sound = Global.sounds.theme) {
		soundStop(sound);
		delete Global.sounds.theme;
		delete Global.sounds[sound.name];
	}
	
	// If the name isn't given, get it from the current area
	if (!name) name = Global.area.theme;

	// This creates the sound.
	var sound = Global.sounds.theme = play(name);

	if (loop) {
		sound.loop = true;
	} else {
		sound.loop = false;
	} 
	
	// If it's only used once, add the event listener to resume theme
	if (sound.used == 1) sound.addEventListener("ended", playTheme);
	
	return sound;
}

// The equivalent of playTheme with Hurry added on
function playCurrentThemeHurry(name) {
	playTheme("Hurry " + (name || Global.area.theme));
}

// Called when a sound is done to get it out of sounds
function soundFinish(sound, name) {
	if (Global.sounds[name]) delete Global.sounds[name];
}

function soundStop(sound) {
	// If this sound has a readyState, stop it
	if (sound) {
		sound.pause();
		if (sound.readyState) sound.currentTime = 0;
	}
}

function toggleMute() {
	var level = !(localStorage.muted = Global.data.muted = Global.muted = !Global.muted);
	for(var i in Global.sounds) Global.sounds[i].volume = level;
}

function pauseAllSounds() {
	for(var i in Global.sounds) if (Global.sounds[i]) Global.sounds[i].pause();
}

function resumeAllSounds() {
	for(var i in Global.sounds) if (Global.sounds[i]) Global.sounds[i].play();
}

function pauseTheme() {
	if (Global.sounds.theme) Global.sounds.theme.pause();
}

function resumeTheme() {
	if (Global.sounds.theme) Global.sounds.theme.play();
}


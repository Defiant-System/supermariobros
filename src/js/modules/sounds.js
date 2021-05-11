/* Sounds.js */
// Stores sounds in a global sounds object, to be played back on command

// Starts pre-emptively loading sounds (see load.js::startLoadingSOunds)
// All sounds are stored in library.sounds, while ones used in this run are also in window.sounds
function resetSounds() {
	Global.sounds = {};
	Global.theme = false;
	Global.muted = (localStorage && localStorage.muted == "true");
}


// Override is whether the main music pauses
function play(name_raw) {
	// First check if this is already in sounds
	var sound = Global.sounds[name_raw];
	
	// If it's not already being played,
	if (!sound) {
		// Check for it in the library
		if (sound = Global.library.sounds[name_raw]) {
			Global.sounds[name_raw] = sound;
		}
		// Otherwise it's not known, complain
		else {
			console.log("Unknown sound: '" + name_raw + "'");
			return sound;
		}
	}
	
	// Reset the sound, then play it
	if (sound.readyState) {
		sound.pause();
		sound.currentTime = 0;
	}
	sound.volume = !Global.muted;
	sound.play();
	
	// If this is the first time the sound was added, let it know how to stop
	if (!(sound.used++)) sound.addEventListener("ended", function() { mlog("Sounds", sound); soundFinish(sound, name_raw); });
	
	return sound;
}

// The same as regular play, but with lower volume when further from Mario
function playLocal(name, xloc, main) {
	var sound = play(name, main),
		volume_real;
	// Don't do anything without having played a sound, or if there's no actual Mario
	if (!sound || !Global.mario) return;
	
	// If it's out of bounds (or muted), the volume is 0
	if (Global.muted || xloc < 0 || xloc > gamescreen.unitwidth) volume_real = 0;
	// Otherwise it's a function of how far the thing is from Mario
	else volume_real = max(.14, min(.84, 1.4 * (gamescreen.unitwidth - abs(xloc - mario.left)) / gamescreen.unitwidth));
	
	sound.volume = volume_real;
	sound.volume_real = volume_real;
}


// Plays a theme as sounds.theme via play()
// If no theme is provided, it plays the area's theme
function playTheme(name_raw, resume, loop) {
	// set loop default to true
	loop = typeof loop !== 'undefined' ? loop : true;

	// First make sure there isn't already a theme playing
	if (sound = Global.sounds.theme) {
		soundStop(sound);
		delete Global.sounds.theme;
		delete Global.sounds[sound.name_raw];
	}
	
	// If the name isn't given, get it from the current area
	if (!name_raw) name_raw = Global.area.theme;
	
	// This creates the sound.
	var sound = Global.sounds.theme = play(name_raw);

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
function playCurrentThemeHurry(name_raw) {
	playTheme("Hurry " + (name_raw || Global.area.theme));
}

// Called when a sound is done to get it out of sounds
function soundFinish(sound, name_raw) {
	if (Global.sounds[name_raw]) delete Global.sounds[name_raw];
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


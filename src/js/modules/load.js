/* Load.js */
// Sounds are loaded via AJAX



function setNextLevelArr(arr) {
	if (arr[1]++ == 4) {
		++arr[0];
		arr[1] = 1;
	}
	return arr;
}


/* Sounds */

function startLoadingSounds() {
	var libsounds = Global.library.sounds;
	// setTimeout(function() { loadSounds(libsounds, Global.library.sounds.names, "~/sounds/"); }, 7);
	setTimeout(function() { loadSounds(libsounds, Global.library.sounds.themes, "~/sounds/"); }, 14);
}

// Loads sounds (in order) from the reference into the container
function loadSounds(container, reference, prefix) {
	var sound,
		name_raw, 
		details = {
			preload: 'auto',
			prefix: '',
			used: 0
		},
		len, i;
	
	for(i=0, len=reference.length; i < len; ++i) {
		name_raw = reference[i];
		
		// Create the sound and store it in the container
		sound = Global.createElement("Audio", details);
		container[name_raw] = sound;
		// console.log("Sounds", sound)
		
		// Create the MP3 and OGG sources for the audio
		sound.appendChild(Global.createElement("Source", {
			type: "audio/mp3",
			src: prefix + name_raw + ".mp3"
		}));
		
		// This preloads the sound.
		sound.volume = 0;
		sound.play();
	}
}
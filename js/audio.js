var audio = (function() {
'use strict';

var audios = {};
var initialized = false;

function preload() {
	for (var i = 1;i < 10;i++) {
		audios[i] = new Audio('sounds/de_' + i + '.mp3');
	}
	audios.pause = new Audio('sounds/de_pause.mp3');
	audios.beep_1 = new Audio('sounds/beep_1.mp3');
	audios.beep_2 = new Audio('sounds/beep_2.mp3');
	audios.beep_3 = new Audio('sounds/beep_3.mp3');
}

function workaround_user_interaction() {
	// On Android Chrome, we are not allowed to play without user interaction
	// See https://bugs.chromium.org/p/chromium/issues/detail?id=178297

	if (initialized) {
		return;
	}
	for (var k in audios) {
		var a = audios[k];
		a.volume = 0.01;
		a.play();
		a.volume = 1;
	}
	initialized = true;
}

function play(key) {
	var a = audios[key];
	if (a.paused) {
		a.play();
	} else {
		a.currentTime = 0;
	}
}

return {
	preload: preload,
	play: play,
	workaround_user_interaction: workaround_user_interaction,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = audio;
}
/*/@DEV*/

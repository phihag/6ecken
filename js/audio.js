var audio = (function() {
'use strict';

var audios = {};

function preload() {
	for (var i = 1;i < 10;i++) {
		audios[i] = new Audio('sounds/de_' + i + '.mp3');
	}
	audios.pause = new Audio('sounds/de_pause.mp3');
	audios.beep_1 = new Audio('sounds/beep_1.mp3');
	audios.beep_2 = new Audio('sounds/beep_2.mp3');
	audios.beep_3 = new Audio('sounds/beep_3.mp3');
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
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = audio;
}
/*/@DEV*/

var audio = (function() {
'use strict';

var audios = {};

function preload() {
	for (var i = 1;i < 10;i++) {
		audios[i] = new Audio('sounds/de_' + i + '.mp3');
	}
	audios.pause = new Audio('sounds/de_pause.mp3');
}

function play(key) {
	audios[key].play();
}

return {
	preload: preload,
	play: play,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');

	module.exports = audio;
}
/*/@DEV*/

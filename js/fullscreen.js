'use strict';
var fullscreen = (function() {

function supported() {
	return !!(
		document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled
	);
}

function active() {
	return !!(
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement
	);
}

function start() {
	var doc = document.documentElement;
	if (doc.requestFullscreen) {
		doc.requestFullscreen();
	} else if (doc.webkitRequestFullscreen) {
		doc.webkitRequestFullscreen(doc.ALLOW_KEYBOARD_INPUT);
	} else if (doc.mozRequestFullScreen) {
		doc.mozRequestFullScreen();
	} else if (doc.msRequestFullscreen) {
		doc.msRequestFullscreen();
	}
}

function stop() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
}

function ui_init() {
	if (supported()) {
		uiu.qs('body').addEventListener('click', function() {
			start();
		});
	}
}

return {
	ui_init: ui_init,
	supported: supported,
	active: active,
	start: start,
	stop: stop,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var uiu = require('./uiu');

	module.exports = fullscreen;
}
/*/@DEV*/

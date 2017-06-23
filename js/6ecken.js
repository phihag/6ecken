'use strict';
(function() {

var version = 'dev';
var state = {
	base_speed: 3, // seconds per corner
	front_multiplier: 1.4,
	back_multiplier: 1.6,
	corner_count: 10,
	pause: 10,
	mode: 'random',
	test_base: 0.9,
};

audio.preload();
function ui_init() {
	settings.load(state);

	fullscreen.ui_init();
	numbers.ui_init(uiu.qs('.court'), state);

	utils.on_click_qs('#button_start', function() {
		audio.workaround_user_interaction();
		control.start(state);
	});
	utils.on_click_qs('#button_pause', function() {
		control.toggle_suspended();
	});

	var body = uiu.qs('body');
	uiu.el(body, 'div', {
		'class': 'version',
	}, version);
}

document.addEventListener('DOMContentLoaded', ui_init);

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var audio = require('./audio');
	var control = require('./control');
	var fullscreen = require('./fullscreen');
	var numbers = require('./utils');
	var settings = require('./settings');
	var uiu = require('./uiu');
	var utils = require('./utils');
}
/*/@DEV*/

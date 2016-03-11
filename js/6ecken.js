(function() {
'use strict';

var version = 'dev';
var state = {
	base_speed: 3, // seconds per corner
	front_multiplier: 1.5,
	back_multiplier: 1.7,
	corner_count: 12,
	pause: 10,
	mode: 'random',
	timing: 'test',
};

function ui_init() {
	settings.load(state);

	numbers.ui_init(utils.qs('.court'), state);

	utils.on_click_qs('#button_start', function() {
		control.start(state);
	});

	var body = utils.qs('body');
	utils.create_el(body, 'div', {
		'class': 'version',
	}, version);
}

document.addEventListener('DOMContentLoaded', ui_init);

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');
	var numbers = require('./utils');
}
/*/@DEV*/

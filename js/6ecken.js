(function() {
'use strict';

var version = 'dev';
var state = {};

function ui_init(state) {
	settings.load(state);

	numbers.ui_init(utils.qs('.court'), state);

	utils.on_click_qs('#button_start', function() {
		console.log('TODO start');
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

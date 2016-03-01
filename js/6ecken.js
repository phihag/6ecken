(function() {
'use strict';

var version = 'dev';

function ui_init() {
	var body = utils.qs('body');

	utils.on_click_qs('#button_start', function() {
		console.log('start');
	});

	utils.create_el(body, 'div', {
		'class': 'version',
	}, version);
}

document.addEventListener('DOMContentLoaded', ui_init);

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');
}
/*/@DEV*/

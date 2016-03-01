(function() {
'use strict';

var version = 'dev';

function ui_init() {
	utils.on_click_qs('#button_start', function() {
		console.log('start');
	});
}

document.addEventListener('DOMContentLoaded', ui_init);

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');
}
/*/@DEV*/

var settings = (function() {
'use strict';

var default_settings = {
	// TODO add something here
};

function load(s) {
	if (! window.localStorage) {
		return utils.extend({}, default_settings);
	}

	var json_str = window.localStorage.getItem('6ecken_settings');
	var res = utils.obj_update({}, default_settings);
	if (json_str) {
		var new_settings = JSON.parse(json_str);
		return utils.obj_update(res, new_settings);
	}
	apply(s, res);
}

function store(s) {
	if (! window.localStorage) {
		return;
	}

	window.localStorage.setItem('6ecken_settings', JSON.stringify(s.settings));
}

function apply(s, settings) {
	s.settings = settings;
	s.numbers = [1, null, 2, 5, null, 6, 3, null, 4];
}

return {
	load: load,
	store: store,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');

	module.exports = settings;
}
/*/@DEV*/

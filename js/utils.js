'use strict';
var utils = (function() {

function on_click(node, callback) {
	node.addEventListener('click', callback, false);
}

function on_click_qs(selector, callback) {
	on_click(uiu.qs(selector), callback);
}


function obj_update(obj, other) {
	for (var key in other) {
		obj[key] = other[key];
	}
}

function randomInt(n) {
	return Math.floor(Math.random() * n);
}

return {
	obj_update: obj_update,
	on_click: on_click,
	on_click_qs: on_click_qs,
	randomInt: randomInt,
};
})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = utils;

	var uiu = require('./uiu');
}
/*/@DEV*/

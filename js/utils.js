var utils = (function() {
'use strict';

function qs(selector) {
	/*@DEV*/
	var all_nodes = document.querySelectorAll(selector);
	if (all_nodes.length !== 1) {
		throw new Error(all_nodes.length + ' nodes matched by qs ' + selector);
	}
	/*/@DEV*/

	var node = document.querySelector(selector);
	if (! node) {
		report_problem.silent_error('Expected to find qs  ' + selector + ' , but no node matching.');
		return;
	}
	return node;
}

function on_click(node, callback) {
	node.addEventListener('click', callback, false);
}

function on_click_qs(selector, callback) {
	on_click(qs(selector), callback);
}


return {
	on_click: on_click,
	on_click_qs: on_click_qs,
	qs: qs,
};
})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = utils;
}
/*/@DEV*/

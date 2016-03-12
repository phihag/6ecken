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
		console.error('Expected to find qs  ' + selector + ' , but no node matching.'); // eslint-disable-line no-console
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

function create_el(parent, tagName, attrs, text) {
	var el = document.createElement(tagName);
	if (attrs) {
		for (var k in attrs) {
			el.setAttribute(k, attrs[k]);
		}
	}
	if ((text !== undefined) && (text !== null)) {
		el.appendChild(document.createTextNode(text));
	}
	parent.appendChild(el);
	return el;
}

function obj_update(obj, other) {
	for (var key in other) {
		obj[key] = other[key];
	}
}

function text(node, str) {
	empty(node);
	node.appendChild(node.ownerDocument.createTextNode(str));
}

function text_qs(selector, str) {
	text(qs(selector), str);
}

function escapeRegExp(str) {
	// From http://stackoverflow.com/a/6969486/35070
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function randomInt(n) {
	return Math.floor(Math.random() * n);
}

function hasClass(node, className) {
	// TODO use regexp
	return (node.className.indexOf(className) >= 0);
}

function addClass(node, className) {
	if (! hasClass(node, className)) {
		node.className += ' ' + className;
	}
}

function removeClass(node, className) {
	// TODO handle long classes, and proper regexp
	var rex = new RegExp(' ' + className, 'g');
	// TODO proper
	node.className = node.className.replace(rex, '');
}

function visible(node, val) {
	if (val) {
		removeClass(node, 'invisible');
	} else {
		addClass(node, 'invisible');
	}
}

function empty(node) {
	var last;
	while ((last = node.lastChild)) {
		node.removeChild(last);
	}
}

function visible_qs(selector, val) {
	visible(qs(selector), val);
}

function qsEach(selector, func) {
	var nodes = document.querySelectorAll(selector);
	for (var i = 0;i < nodes.length;i++) {
		func(nodes[i], i);
	}
}

return {
	create_el: create_el,
	obj_update: obj_update,
	on_click: on_click,
	on_click_qs: on_click_qs,
	qs: qs,
	text_qs: text_qs,
	visible_qs: visible_qs,
	randomInt: randomInt,
	addClass: addClass,
	removeClass: removeClass,
	qsEach: qsEach,
};
})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = utils;
}
/*/@DEV*/

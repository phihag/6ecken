var numbers = (function() {
'use strict';

var NUMBER_POSITIONS = [
	'position: absolute; top: 2%; left: 2%;',
	'position: absolute; top: 2%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; top: 2%; right: 2%;',
	'position: absolute; top: 50%; left: 2%;',
	'position: absolute; top: 50%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; top: 50%; right: 2%;',
	'position: absolute; bottom: 1%; left: 2%;',
	'position: absolute; bottom: 1%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; bottom: 1%; right: 2%;',
];

var number_els;

function create_numbers(container, s) {
	number_els = [];
	for (var i = 0;i < s.numbers.length;i++) {
		var num = s.numbers[i];
		if (typeof num !== 'number') {
			number_els.push(null);
			continue;
		}

		var nel = uiu.el(container, 'div', {
			'class': 'number',
			'style': NUMBER_POSITIONS[i],
		}, num);
		number_els.push(nel);
	}
}

function ui_init(container, s) {
	var numbers_container = uiu.el(container, 'div', {});
	create_numbers(numbers_container, s);
}

function unhighlight() {
	uiu.qsEach('.number_highlight', function(el) {
		uiu.removeClass(el, 'number_highlight');
	});
}

function highlight(idx) {
	unhighlight();
	var node = number_els[idx];
	uiu.addClass(node, 'number_highlight');
}

return {
	ui_init: ui_init,
	highlight: highlight,
	unhighlight: unhighlight,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var uiu = require('./uiu');

	module.exports = numbers;
}
/*/@DEV*/

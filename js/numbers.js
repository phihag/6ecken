var numbers = (function() {
'use strict';

var NUMBER_POSITIONS = [
	'position: absolute; top: 2%; left: 2%;',
	'position: absolute; top: 2%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; top: 2%; right: 2%;',
	'position: absolute; top: 50%; left: 2%;',
	'position: absolute; top: 50%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; top: 50%; right: 2%;',
	'position: absolute; bottom: 0%; left: 2%;',
	'position: absolute; bottom: 0%; left: 50%; transform: translate(-50%, 0);',
	'position: absolute; bottom: 0%; right: 2%;',
];

var number_els;

function create_numbers(container, s) {
	number_els = [];
	for (var i = 0;i < s.numbers.length;i++) {
		var num = s.numbers[i];
		if (typeof num !== 'number') {
			continue;
		}

		var nel = utils.create_el(container, 'div', {
			'class': 'number',
			'style': NUMBER_POSITIONS[i],
		}, num);
		number_els.push(nel);
	}
}

function ui_init(container, s) {
	var numbers_container = utils.create_el(container, 'div', {});
	create_numbers(numbers_container, s);
}

return {
	ui_init: ui_init,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {

	module.exports = numbers;
}
/*/@DEV*/

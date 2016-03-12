var control = (function() {
'use strict';

var timeout;

var state;
var level;
var remaining_pause;
var remaining_corners;
var corner;
var just_paused;

function start(s) {
	state = s;
	if (timeout) {
		clearTimeout(timeout);
	}
	level = 0;
	remaining_pause = 4;
	remaining_corners = 0;
	just_paused = false;
	update_level();
	step(s);
}

function update_level() {
	var step_num = (remaining_pause > 0) ? 0 : (state.corner_count - remaining_corners);
	utils.text_qs('.level_num', (level + 1) + '.' + step_num);
}

function pick_corner() {
	var corners = [];
	for (var i = 0;i < state.numbers.length;i++) {
		if (state.numbers[i]) {
			corners.push(i);
		}
	}
	var idx = utils.randomInt(corners.length);
	return corners[idx];
}

function calcTimeout(level, corner) {
	var res = state.base_speed;
	var LEVEL_COUNT = 15;
	res *= (LEVEL_COUNT - level) / LEVEL_COUNT;

	switch (corner) {
	case 0:
	case 1:
	case 2:
		res *= state.front_multiplier;
		break;
	case 7:
	case 8:
	case 9:
		res *= state.back_multiplier;
		break;
	}
	return res * 1000;
}

function step() {
	if (just_paused) {
		numbers.unhighlight();
		just_paused = false;
		level++;
		audio.play('pause');
	}
	if (remaining_pause > 0) {
		remaining_pause -= 1;
		// Update pause
		utils.text_qs('.pause_seconds', remaining_pause);
		if (remaining_pause <= 0) {
			remaining_corners = state.corner_count;
		}
	}
	utils.visible_qs('.pause', remaining_pause > 0);

	if (remaining_pause > 0) {
		timeout = setTimeout(step, 1000);
		return; // Still in pause mode
	}

	// pick next active corner
	update_level();
	var corner = pick_corner();

	// Mark next active corner
	numbers.highlight(corner);

	// say number
	audio.play(state.numbers[corner]);

	// set timeout for next step
	remaining_corners--;
	if (remaining_corners <= 0) {
		remaining_pause = state.pause + 1;
		just_paused = true;
	}
	timeout = setTimeout(step, calcTimeout(level, corner));
}

return {
	start: start,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');

	module.exports = control;
}
/*/@DEV*/

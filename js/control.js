var control = (function() {
'use strict';

var timeout;

var suspended;
var state;
var level;
var remaining_pause;
var remaining_corners;
var just_paused;
var corner;

function start(s) {
	uiu.qs('#button_pause').removeAttribute('disabled');

	state = s;
	if (timeout) {
		clearTimeout(timeout);
	}
	suspended = false;
	level = 0;
	remaining_pause = 4;
	remaining_corners = 0;
	just_paused = false;
	update_level();
	step(s);
}

function update_level() {
	var step_num = (remaining_pause > 0) ? 0 : (state.corner_count - remaining_corners);
	uiu.text_qs('.level_num', (level + 1) + '.' + step_num);
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
	res *= Math.pow(state.test_base, level);

	switch (corner) {
	case 0:
	case 1:
	case 2:
		res *= state.front_multiplier;
		break;
	case 6:
	case 7:
	case 8:
		res *= state.back_multiplier;
		break;
	}
	return res * 1000;
}

function schedule_step() {
	if (remaining_pause > 0) {
		timeout = setTimeout(step, 1000);
	} else {
		timeout = setTimeout(step, calcTimeout(level, corner));
	}
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
		uiu.text_qs('.pause_seconds', remaining_pause);
		if ((remaining_pause > 0) && (remaining_pause <= 3)) {
			audio.play('beep_' + remaining_pause);
		}

		if (remaining_pause <= 0) {
			remaining_corners = state.corner_count;
		}
	}
	uiu.visible_qs('.pause', remaining_pause > 0);

	if (remaining_pause > 0) {
		schedule_step();
		return; // Still in pause mode
	}

	// pick next active corner
	update_level();
	corner = pick_corner();

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
	schedule_step();
}

function toggle_suspended() {
	if (suspended) {
		uiu.text_qs('#button_pause', 'Pause');
		schedule_step();
	} else {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		uiu.text_qs('#button_pause', 'Weiter');
	}
	suspended = !suspended;
}

return {
	toggle_suspended: toggle_suspended,
	start: start,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var audio = require('./audio');
	var numbers = require('./numbers');
	var uiu = require('./uiu');
	var utils = require('./utils');

	module.exports = control;
}
/*/@DEV*/

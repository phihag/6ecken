#!/usr/bin/env node
(function() {
'use strict';

var async = require('async');
var path = require('path');
var child_process = require('child_process');

var MAXNUM = 10;
var SOUND_DIR = (__dirname, '..', 'sounds');


function exec_cb(cb) {
	return function(err, stderr) {
			if (err) {
				return cb(err);
			}
			if (stderr) {
				return cb(new Error(stderr));
			}
			cb(err);
	};
}

function gen(task, cb) {
	var out_base = task.out_base;
	var wav_fn = out_base + '.wav';
	var mp3_fn = out_base + '.mp3';

	if (task.type === 'beep') {
		var orig_fn = out_base + '.sox.wav';
		async.waterfall([function(cb) {
			child_process.execFile('sox', ['-n', orig_fn, 'synth', task.len, 'square', task.freq], exec_cb(cb));
		}, function(cb) {
			// TODO add this into the above command
			child_process.execFile('sox', ['-v', '0.03', orig_fn, wav_fn], exec_cb(cb));
		}, function(cb) {
			child_process.execFile('lame', [wav_fn, mp3_fn], exec_cb(cb));
		}], cb);
		return;
	}

	var svox_fn = out_base + '.svox.wav';

	async.waterfall([function(cb) {
		child_process.execFile('pico2wave', ['-l', task.voice, '-w', svox_fn, task.text], exec_cb(cb));
	}, function(cb) {
		child_process.execFile('sox', [svox_fn, wav_fn, 'silence', '1', '0.1', '0.5%', '1', '0.05', '0.5%'], exec_cb(cb));
	}, function(cb) {
		child_process.execFile('lame', [wav_fn, mp3_fn], exec_cb(cb));
	}], cb);
}

function main() {
	var tasks = [];
	for (var num = 1;num <= MAXNUM;num++) {
		tasks.push({
			text: '' + num,
			voice: 'de-DE',
			out_base: path.join(SOUND_DIR, 'de_' + num),
		});
	}
	tasks.push({
		text: 'Pause',
		voice: 'de-DE',
		out_base: path.join(SOUND_DIR, 'de_pause'),
	});
	tasks.push({
		type: 'beep',
		len: 0.08,
		freq: 1500,
		out_base: path.join(SOUND_DIR, 'beep_3'),
	});
	tasks.push({
		type: 'beep',
		len: 0.08,
		freq: 1500,
		out_base: path.join(SOUND_DIR, 'beep_2'),
	});
	tasks.push({
		type: 'beep',
		len: 0.08,
		freq: 1500,
		out_base: path.join(SOUND_DIR, 'beep_1'),
	});

	async.each(tasks, gen, function(err) {
		if (err) {
			throw err;
		}
	});
}

main();

})();
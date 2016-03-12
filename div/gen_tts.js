#!/usr/bin/env node
(function() {
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var MAXNUM = 10;
var SOUND_DIR = (__dirname, '..', 'sounds');


function exec_cb(cb) {
	return function(err, stderr, stdout) {
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
	var svox_fn = out_base + '.svox.wav';
	var wav_fn = out_base + '.wav';
	var mp3_fn = out_base + '.mp3';

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
		})
	}
	tasks.push({
		text: 'Pause',
		voice: 'de-DE',
		out_base: path.join(SOUND_DIR, 'de_pause'),
	});

	async.each(tasks, gen, function(err) {
		if (err) {
			throw err;
		}
	});
}

main();

})();
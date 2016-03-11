#!/usr/bin/env node
(function() {
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var MAXNUM = 10;
var SOUND_DIR = (__dirname, '..', 'sounds');


function range(start, n) {
	var res = [];
	for (var i = start;i < n;i++) {
		res.push(i);
	}
	return res;
}

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

function gen(num, voice, out_base, cb) {
	var svox_fn = out_base + '.svox.wav';
	var wav_fn = out_base + '.wav';
	var mp3_fn = out_base + '.mp3';

	async.waterfall([function(cb) {
		child_process.execFile('pico2wave', ['-l', voice, '-w', svox_fn, num], exec_cb(cb));
	}, function(cb) {
		child_process.execFile('sox', [svox_fn, wav_fn, 'silence', '1', '0.1', '0.5%', '1', '0.05', '0.5%'], exec_cb(cb));
	}, function(cb) {
		child_process.execFile('lame', [wav_fn, mp3_fn], exec_cb(cb));
	}], cb);
}

function main() {
	var nums = range(1, MAXNUM + 1);
	async.each(nums, function(num, cb) {
		gen(num, 'de-DE', path.join(SOUND_DIR, 'de_' + num), cb);
	}, function(err) {
		if (err) {
			throw err;
		}
	});
}

main();

})();
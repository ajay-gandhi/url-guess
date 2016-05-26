#!/usr/bin/env node
'use strict';

var http  = require('http'),
    pargs = require('minimist');

var argv = pargs(process.argv.slice(2), {
  boolean: ['v', 'h'],
  alias: {
    'base':   'b',
    'length': 'l',
    'len':    'l',
    'help':   'h'
  }
});

if (argv.h) {
  console.log('');
  console.log('  usage: url-guess [-hv] [-b <url-base>] [-l <ext-len>]');
  console.log('');
  console.log('    -v              verbose mode');
  console.log('    -b <url-base>   the base of the URL shortener, default: http://goo.gl/');
  console.log('    -l <ext-len>    the length of the id, default: http://goo.gl/abcdef -> 6');
  console.log('');
  process.exit(0);
}

var base = argv.b || 'http://goo.gl/';
if (base.charAt(base.length - 1) !== '/') base += '/';

var len = argv.l || 6;

var test_new = function () {
  var next_str = generate_string(len);

  http.get(base + next_str, function (res) {
    if (res.statusCode == 404) {
      // Try again
      if (argv.v) console.log(next_str, 'failed');
      test_new();

    } else {
      // Success!
      if (argv.v) console.log(next_str, 'valid:', base + next_str);
      else        console.log(base + next_str);
    }
  }).on('error', (e) => {
    console.log('Got error:', e);
  });
}

var generate_string = function (len) {
  var char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return (new Array(len)).fill(0).map(function () {
    return char_list.charAt(Math.floor(Math.random() * char_list.length));
  }).join('');
}

test_new();

